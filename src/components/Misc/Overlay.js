import React from 'react';
import '../../styles/overlay.css';

const Overlay = (props) =>{
    return (
    <div className={props.isLoading ? 'overlay':'hide'}>
        <div className='info'>Warten Sie mal ...</div>
    </div>
    );
}

export default Overlay;