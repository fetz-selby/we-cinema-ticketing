import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/actions';
import {Document, Page} from 'react-pdf';
import downloadFile from 'react-file-download';



import '../../styles/receipt.css';

class Receipt extends Component{

    componentWillMount(){
        // this.props.loadMovies();
        if(this.props.pdf === null){
            window.location.href = '#/'
        }
    }

    showPDF = () =>{
        if(this.props.pdf){
            const pageNumber = 1;
            return <Document file={this.props.pdf}>
                <Page pageNumber={pageNumber} />
            </Document>
        }
    }

    onDownloadHandler = () =>{
        downloadFile(this.props.pdf, 'receipt.pdf');
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
