import React from 'react';
import Typed from 'react-typed';
import '../assets/css/404.scss';

function Error404(){

    return (
        <div class="b404">
            <div class="content">
                <div class="browser-bar">
                    <a href="/"><span class="close button"></span></a>
                    <span class="min button"></span>
                    <span class="max button"></span>
                </div>
                <div class="text">
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