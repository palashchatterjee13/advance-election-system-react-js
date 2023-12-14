import NavBar from '../components/navbar';
import Badge from '../components/badge';
import React from 'react';
import { useState } from 'react';
import Background from '../components/bg';

let mg = { marginTop: '5px', float: 'left', marginLeft: '10%' };

export default function Settings() {

    if (!localStorage.getItem('candidates')) {
        localStorage.setItem('candidates', JSON.stringify([]));
        localStorage.setItem('outcome', JSON.stringify([]));
        localStorage.setItem('position', JSON.stringify(''));
        localStorage.setItem('pin', JSON.stringify('bit'));
        localStorage.setItem('colorBG', JSON.stringify('#0D6EFD'));
        localStorage.setItem('colorFG', JSON.stringify('#FFFFFF'));
        localStorage.setItem('BG', JSON.stringify('y'));
    }
    
    let [state, setState] = useState({
        colorFG: JSON.parse(localStorage.getItem('colorFG')),
        colorBG: JSON.parse(localStorage.getItem('colorBG')),
        pin: JSON.parse(localStorage.getItem('pin')),
    });

    function changePin(e) {
        let v = e.target.value;
        if (v.length > 3) {
            return;
        }
        state.pin = v;
        setState({ ...state });
        localStorage.setItem('pin', JSON.stringify(state.pin));
    }

    function changeBG(e) {
        let v = e.target.value;
        state.colorBG = v;
        setState({ ...state });
        localStorage.setItem('colorBG', JSON.stringify(state.colorBG));
    }

    function changeFG(e) {
        let v = e.target.value;
        state.colorFG = v;
        setState({ ...state });
        localStorage.setItem('colorFG', JSON.stringify(state.colorFG));
    }

    function reset() {
        localStorage.setItem('candidates', JSON.stringify([]));
        localStorage.setItem('outcome', JSON.stringify([]));
        localStorage.setItem('position', JSON.stringify(''));
        localStorage.setItem('pin', JSON.stringify('bit'));
        localStorage.setItem('colorBG', JSON.stringify('#0D6EFD'));
        localStorage.setItem('colorFG', JSON.stringify('#FFFFFF'));
        localStorage.setItem('BG', JSON.stringify('y'));
        setState({
            ...state, colorFG: JSON.parse(localStorage.getItem('colorFG')),
            colorBG: JSON.parse(localStorage.getItem('colorBG')),
            pin: JSON.parse(localStorage.getItem('pin')),
        })
    }

    function toogleAnimation() {
        if (JSON.parse(localStorage.getItem('BG')) === 'y') {
            localStorage.setItem('BG', JSON.stringify('n'));
        } else {
            localStorage.setItem('BG', JSON.stringify('y'));
        }
        setState({...state});
    }

    return (
        <div>
            <Background />
            <NavBar active={3} />
            <div className='row bottom-footer'>
                <Badge />
                <div className='col-lg-6 col-md-6 col-sm-12 order-1 order-sm-2 listPage'>
                    <br />
                    <h4>Settings</h4>
                    <br />
                    <div className='mb-3'>
                        <label className='form-label'>Change Security Pin</label><br />
                        <input type='password' value={state.pin} className='form-control ins' id='inputPassword' onChange={changePin} />
                        {/* <div id='emailHelp' className='form-text'>This pin will be used to authorize various actions.</div> */}
                    </div>
                    <br />
                    <div className='mb-3'>
                        <label className='form-label'>Vote Background Color</label><br />
                        <div className='centr'>
                            <input type='color' value={state.colorBG} className='form-control ins insx' id='colorBG' onChange={changeBG} />

                        </div>
                        {/* <div id='emailHelp' className='form-text'>This pin will be used to authorize various actions.</div> */}
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Vote Text Color</label><br />
                        <div className='centr'>
                            <input type='color' value={state.colorFG} className='form-control ins insx' id='colorFG' onChange={changeFG} />
                        </div>
                        {/* <div id='emailHelp' className='form-text'>This pin will be used to authorize various actions.</div> */}
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Reset everything to Default</label><br />
                        <div className='centr'>
                            <button className='btn btn-primary' style={mg} onClick={reset}>Reset Now</button>
                            <br />
                        </div>
                    </div>
                    <br />
                    <div className='mb-3'>
                        <label className='form-label'>Background animations</label><br />
                        <div className='centr'>
                            <div className='form-check form-switch'>
                                <input className='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckChecked' checked={(JSON.parse(localStorage.getItem('BG')) === 'y') ? true : false} onChange={toogleAnimation} /> &nbsp;
                                <label className='form-check-label' htmlFor='flexSwitchCheckChecked'> Background animations are {(JSON.parse(localStorage.getItem('BG')) === 'y') ? 'on' : 'off'}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}