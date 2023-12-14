import React from 'react';
import {Link} from 'react-router-dom';
import logo from './logo192.png';
export default function NavBar(props) {
    return <nav className='navbar navbar-expand-lg bg-light'>
        <div className='container-fluid'>
            <span className='navbar-brand'>
                <img src={logo} alt='Logo' width='30' height='24' className='d-inline-block align-text-top' />
                BIT-AES
            </span>
            <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse justify-content-end' id='navbarNavAltMarkup'>
                <div className='nav navbar-nav'>
                    <Link to='/newElection'>
                        <span className={(props.active === 1)? 'nav-link active' : 'nav-link'}>New Election</span>
                    </Link>
                    <Link to='/lastOutcome'>
                        <span className={(props.active === 2)? 'nav-link active' : 'nav-link'}>Last Outcome</span>
                    </Link>
                    <Link to='/settings'>
                        <span className={(props.active === 3)? 'nav-link active' : 'nav-link'}>Settings</span>
                    </Link>
                </div>
            </div>
        </div>
    </nav>
}