import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";
import Badge from "../components/badge";
import Background from "../components/bg";

export default function NewElectionPage() {

    if (!localStorage.getItem('candidates')) {
        localStorage.setItem('candidates', JSON.stringify([]));
        localStorage.setItem('outcome', JSON.stringify([]));
        localStorage.setItem('position', JSON.stringify(""));
        localStorage.setItem('pin', JSON.stringify("bit"));
        localStorage.setItem('colorBG', JSON.stringify("#0D6EFD"));
        localStorage.setItem('colorFG', JSON.stringify("#FFFFFF"));
        localStorage.setItem('BG', JSON.stringify("y"));
    }
    const navigate = useNavigate();
    let [state, setState] = useState({
        candidates: JSON.parse(localStorage.getItem('candidates')),
        position: JSON.parse(localStorage.getItem('position')),
    });
    let c = 0;

    function addCandidate() {
        state.candidates.push({
            name: "candidate"
        });
        setState({ ...state });
        localStorage.setItem('candidates', JSON.stringify(state.candidates));
    }

    function changeName(c, v) {
        c = parseInt(c);
        state.candidates[c].name = v;
        setState({ ...state });
        localStorage.setItem('candidates', JSON.stringify(state.candidates));
    }

    function moveUp(c) {
        c = parseInt(c);
        if (c === 0) return;
        let a = state.candidates[c - 1];
        let b = state.candidates[c];
        state.candidates[c] = a;
        state.candidates[c - 1] = b;
        setState({ ...state });
        localStorage.setItem('candidates', JSON.stringify(state.candidates));
    }

    function moveDown(c) {
        c = parseInt(c);
        if (c === state.candidates.length - 1) return;
        let a = state.candidates[c + 1];
        let b = state.candidates[c];
        state.candidates[c] = a;
        state.candidates[c + 1] = b;
        setState({ ...state });
        localStorage.setItem('candidates', JSON.stringify(state.candidates));
    }

    function deleteCandidate(c) {
        c = parseInt(c);
        state.candidates.splice(c, 1);
        setState({ ...state });
        console.log(state)
        localStorage.setItem('candidates', JSON.stringify(state.candidates));
    }

    function changePosition(v) {
        state.position = v;
        setState({ ...state });
        localStorage.setItem('position', JSON.stringify(state.position));
    }

    function start() {
        let outcome = [];
        if (state.candidates.length < 2) {
            alert('Two or more candidates are required to start an election');
            return;
        }
        if (JSON.parse(localStorage.getItem('position')).length === 0) {
            alert('Enter a valid position for which the election is being conducted');
            return;
        }
        state.candidates.map(candidate => {
            outcome.push({
                name: candidate.name,
                votes: 0
            });
            return 0;
        });
        localStorage.setItem('outcome', JSON.stringify(outcome));
        localStorage.setItem('time', JSON.stringify(new Date().getTime()));
        navigate('/election');
    }

    let CandidatesListElement = state.candidates.map(candidate => {
        c++;
        let f = c - 1;
        return (
            <li className="list-group-item" key={f}>
                <input type="text" value={candidate.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" c={(c - 1)} onChange={(e) => { changeName(f, e.target.value) }}></input>
                <span className='delete'><button type="button" className="btn icb btn-danger" onClick={() => { deleteCandidate(f) }}><i className="fa fa-times"></i></button></span>
                <span className='down'><button type="button" className="btn icb btn-primary" onClick={() => { moveDown(f) }}><i className="fa fa-arrow-down"></i></button></span>
                <span className='up'> <button type="button" className="btn icb btn-primary" onClick={() => { moveUp(f) }}><i className="fa fa-arrow-up"></i></button></span>
            </li>
        )
    });

    return (
        <div >
            <Background />
            <NavBar active={1} />
            <div className='row bottom-footer'>
                <Badge />
                <div className='col-lg-6 col-md-6 col-sm-12 order-1 order-sm-2 listPage'>
                    <br />
                    <h4>New Election</h4>
                    <br />
                    <div className="input-group">
                        <span className="input-group-text" id="basic-addon3">Position</span>
                        <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" placeholder="Ex: Class Representative" value={state.position} onChange={(e) => { changePosition(e.target.value) }} />
                    </div>
                    <div className='optionsMenu'>
                        <button className="btn btn-primary" type="button" onClick={addCandidate}>Add candidate</button>
                        <button className="btn btn-primary" type="button" onClick={start}>Start elections</button>
                    </div>
                    <br />
                    <span>List of candidates:</span>
                    {(state.candidates.length === 0) ? (<div className="nocan"> <br /> No candidates added, use the "Add candidate" button to add new candidates</div>) : (
                        <div className='candiateList'>
                            <ul className="list-group">
                                {CandidatesListElement}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}