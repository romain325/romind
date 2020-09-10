import '../assets/css/loader.scss';
import React from 'react';

function Loader(id) {
    var loaderId = id.id;

    if(id.id == undefined || id.id < 1 || id.id > 126){
        loaderId = Math.floor(Math.random() * (96 - 1)) + 1;
    }
    
    loaderId = "loader-" + loaderId ;

    return (<div style={{ 
        display: 'flex',
        width: '100%',
        justifyContent: 'center'
    }}><span className={loaderId} style={
        {
            margin: '50px'
        }
    }></span></div>);
}

export default Loader;