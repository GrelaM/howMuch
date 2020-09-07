import React from 'react';
import './Header.css';

function Header (props) {
    return (
       <div className="header">
           <h1 className="header_title">{props.headerTitle}</h1>
       </div> 
    );
}

export default Header;