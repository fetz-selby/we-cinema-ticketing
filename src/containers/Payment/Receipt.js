import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Document, Page} from 'react-pdf';
import downloadFile from 'react-file-download';

import '../../styles/receipt.css';

class Receipt extends Component{

    componentWillMount(){
        if(this.props.pdf === null){
            window.location.href = '#/'
        }
    }

    showPDF = () =>{
        if(this.props.pdf){
            const pageNumber = 1;
            return <Document file={this.props.pdf} className='doc'>
                <Page pageNumber={pageNumber} />
            </Document>
        }
    }

    onDownloadHandler = () =>{
        downloadFile(this.props.pdf, 'quittung.pdf');
    }

    onHomeHandler = () =>{
        window.location.href = '#/';
    }

    render(){
        return(
        <div className='receipt-container'>
            {this.showPDF()}
            <div className='action-container'>
                <button className='home' onClick={this.onHomeHandler}>Home</button>
                <button className='download-btn' onClick={this.onDownloadHandler}>Download</button>
            </div>
        </div>
        );
    }

}

const mapStateToProps = state =>{
    return {
        pdf : state.payment.pdf
    }
}

const mapDispatchToProps = dispatch =>{
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Receipt);
