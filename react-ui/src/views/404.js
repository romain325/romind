import React from 'react';
import Typed from 'react-typed';
import '../assets/css/404.scss';

function Error404(){

    return (
        <div className="b404">
            <div className="content">
                <div className="browser-bar">
                    <a href="/"><span className="close button"></span></a>
                    <span className="min button"></span>
                    <span className="max button"></span>
                </div>
                <div className="text">
                    <Typed 
                        strings={[
                            'Are you lost? <br/> ^200' +
                            'Sorry to here about it ! <br/> ^400' +
                            'Let\'s get back somewhere well known real quick ! <br/> ^300' + 
                            'Wanna go to the <a href="/">HomePage</a> ??'
                        ]}
                        typeSpeed={30}
                        showCursor={true}
                    />
                </div>
            </div>
        </div>
    );
}

export default Error404;