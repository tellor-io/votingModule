import React from 'react';
import '../styles/LogoMaker.css';
import { ReactComponent as TellorWhite } from '../assets/TellorWhite.svg';

function LogoMaker(){
    return(
        <div>
            <a href="https://tellor.io/" className="LogoMaker__link">
                <div className='LogoMaker__container'>
                    <div>
                        <TellorWhite className="LogoMaker__Title"/>
                    </div>
                    <div className='LogoMaker__unstop'>
                        <span>unstopable<br/>oracle</span>
                    </div>
                </div>
            </a>
        </div>
    );
}

export default LogoMaker;