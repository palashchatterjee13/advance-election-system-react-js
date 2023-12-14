import { Routes, Route, Navigate } from 'react-router-dom';
import NewElectionPage from './pages/newElection';
import LastOutcome from './pages/lastOutcome';
import Settings from './pages/settings';
import './css/App.css';
import Election from './pages/election';

function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path={'/'} element={<Navigate to='/newElection' />} />
        <Route path={'/newElection'} element={<NewElectionPage />} />
        <Route path={'/lastOutcome'} element={<LastOutcome />} />
        <Route path={'/settings'} element={<Settings />} />
        <Route path={'/election'} element={<Election />} />
      </Routes>
    </div>
  );
}

export default App;
