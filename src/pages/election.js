import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../components/bg';
import check from './check.png';

export default function Election() {
    
    const navigate = useNavigate();

    if (!localStorage.getItem('candidates')) {
        localStorage.setItem('candidates', JSON.stringify([]));
        localStorage.setItem('outcome', JSON.stringify([]));
        localStorage.setItem('position', JSON.stringify(""));
        localStorage.setItem('pin', JSON.stringify("bit"));
        localStorage.setItem('colorBG', JSON.stringify("#0D6EFD"));
        localStorage.setItem('colorFG', JSON.stringify("#FFFFFF"));
        localStorage.setItem('BG', JSON.stringify("y"));
    }

    useEffect(function(){
        if (JSON.parse(localStorage.getItem('outcome')).length === 0) {
            navigate('/newElection'); 
        }
    },[]);
    
    let c = -1;
    let [state, setState] = useState({
        outcome: JSON.parse(localStorage.getItem('outcome')),
        conf: false,
        votes: 0,
    });

    let buttonStyle = {
        color: JSON.parse(localStorage.getItem('colorFG')),
        background: JSON.parse(localStorage.getItem('colorBG')),
    }

    function registerVote(c) {
        c = parseInt(c);
        state.outcome[c].votes++;
        state.conf = true;
        state.votes = 0;
        state.outcome.map(candiate => {
            state.votes += candiate.votes;
            return 0;
        });
        localStorage.setItem('outcome', JSON.stringify(state.outcome));
        setState({ ...state });
    }

    function confirmVote() {
        state.conf = false;
        setState({ ...state });
    }

    function end() {
        let pass = window.prompt('Enter Security Pin (3-digit) to end the election process');
        if (pass === JSON.parse(localStorage.getItem('pin'))) {
            navigate('/lastOutcome');
        } else {
            window.alert('Wrong pin entered!');
        }
    }

    let candidateList = <div>
        {
            state.outcome.map(candidate => {
                c++;
                let f = c;
                return (
                    <div  key={f}>
                        <div className='voteButton' style={buttonStyle} onClick={() => { registerVote(f) }}>
                            {candidate.name}
                        </div>
                        <br />
                    </div>
                )
            })
        }
    </div>
    return (
        <div>
            <Background />
            <div className='electionPlane'>
                {(state.conf) ?
                    (
                        <div >
                            <br />
                            <br />
                            <div className='electionHeading'>Vote registered!</div>
                            <div className='imgcent'>
                                <img className='success' src={check} alt="Success" />
                            </div>
                            <div className='imgcent mx2'>
                                <button className='btn btn-primary' onClick={confirmVote}>OK</button>
                            </div>
                        </div>

                    ) :
                    (
                        <div>
                            <div className='electionHeading'>{JSON.parse(localStorage.getItem('position'))}</div>
                            <div>Click on a candidates name to<br /> vote for them</div>
                            <br />
                            {candidateList}
                            <div className='spacerx'></div>
                            <div className='electionOptions'>
                                Votes: {state.votes}<br /> <br />
                                <button className='btn btn-danger endele' onClick={end}>End elections</button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )
}