import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsersScreen from './screens/UsersScreen.jsx';

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<UsersScreen />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;