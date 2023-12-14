import NavBar from '../components/navbar';
import Background from '../components/bg';
import Badge from '../components/badge';
import React from 'react';

export default function LastOutcome() {

    if (!localStorage.getItem('candidates')) {
        localStorage.setItem('candidates', JSON.stringify([]));
        localStorage.setItem('outcome', JSON.stringify([]));
        localStorage.setItem('position', JSON.stringify(''));
        localStorage.setItem('pin', JSON.stringify('bit'));
        localStorage.setItem('colorBG', JSON.stringify('#0D6EFD'));
        localStorage.setItem('colorFG', JSON.stringify('#FFFFFF'));
        localStorage.setItem('BG', JSON.stringify('y'));
    }

    let c = 0;
    let outcome = JSON.parse(localStorage.getItem('outcome'));
    let votes = 0;
    let highest = 0;
    let name = '[candidate]';
    let tie = -1;
    outcome.map(candidate => {
        votes += candidate.votes;
        if (highest < candidate.votes) {
            highest = candidate.votes;
            name = candidate.name;
        }
        return 0;
    });
    outcome.map(candidate => {
        if (highest === candidate.votes) {
            tie++;
        }
        return 0;
    });
    let info = (
        <tbody>
            {
                outcome.map(candidate => {
                    c++;
                    return (
                        <tr key={c}>
                            <th scope='row'>{c}</th>
                            <td>{candidate.name}</td>
                            <td>{candidate.votes}</td>
                            <td>{parseFloat(candidate.votes / votes * 100).toFixed(2)}%</td>
                        </tr>
                    )
                })
            }
        </tbody>
    );

    return (
        <div>
            <Background />
            <NavBar active={2} />
            {
                (JSON.parse(localStorage.getItem('outcome')).length === 0) ? (
                    <div className='noOutcome'>
                        To see the previous outcome,<br />
                        conduct an election
                    </div>
                ) : (
                    <div>
                        <div className='row bottom-footer'>
                            <Badge />
                            <div className='col-lg-6 col-md-6 col-sm-12 order-1 order-sm-2 listPage'>
                                <br />
                                <h4>Outcome</h4>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>Index</th>
                                            <th scope='col'>Candidate</th>
                                            <th scope='col'>Votes</th>
                                            <th scope='col'>%</th>
                                        </tr>
                                    </thead>
                                    {info}
                                </table>
                                <br />
                                {(tie === 0) ?
                                    <div> 
                                        {name} with {highest} votes has won the election and secured the<br /> position of {JSON.parse(localStorage.getItem('position'))} 
                                    </div>
                                    :
                                    <div>
                                        Two or more candidates have equal number of votes
                                    </div>}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}