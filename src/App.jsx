import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import Quizpage from './components/quizpage.jsx';
import LoginPage from './components/logix.jsx';  // assuming you have this component
import RegisterPage from './components/register.jsx';
import QuizSubmissionsComponent from "./components/QuizSubmissionsComponent.jsx";
import AddClaim from "./components/Claims/addClaim"; // Import the AddClaim component
import AdminClaim from "./components/Claims/adminClaim"; // Import the AddClaim component


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/quiz" element={<Quizpage />} />
                <Route path="/subs" element={<QuizSubmissionsComponent />} />
                <Route path="/addclaim" element={<AddClaim />} />
                <Route path="/adminclaims" element={<AdminClaim />} />


            </Routes>
        </Router>
    );
}

export default App;
