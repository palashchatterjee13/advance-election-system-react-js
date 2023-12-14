import React from 'react';
import logo from './logo512.png';
export default function Badge(props) {
    return <div className='col-lg-6 col-md-6 col-sm-12 order-2 order-sm-1'>
        <div className='spacer'></div>
        <div className='logoWrapper'>
            <img src={logo} alt='Logo' className='appLogo' />
        </div>
        <h3 className='appInfo'>Adavnce Election System, Birla Institute of Technology, Mesra</h3>
        <br />
        <div className='credits'>Developed by <b>Palash Chatterjee</b> <br /> (B.C.A. Batch-2022) at BIT Mesra</div>
        <br />
        <br />
    </div>
}