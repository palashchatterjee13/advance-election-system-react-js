import React from 'react';

export default function Background () {
    return (
        <div>
            {(JSON.parse(localStorage.getItem('BG')) === 'y')? <div className='bgsc'></div> : <div></div>}
        </div>
    )
}