import React from 'react';
import '../../styles/auditorium.css';

const AuditoriumTitle = (props) =>{
    return (
    <div className='auditorium-header-title'>
        {props.title}
    </div>
    );
}

export default AuditoriumTitle;