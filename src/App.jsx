import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Quizpage from "./components/quizpage.jsx";
import LoginPage from "./components/logix.jsx"; // assuming you have this component
import RegisterPage from "./components/register.jsx";
import QuizSubmissionsComponent from "./components/QuizSubmissionsComponent.jsx";
import Profiles from "./components/dorrapart/profiles";
import Education from "./components/Education/MainEducation";
import AddClaim from "./components/Claims/addClaim"; // Import the AddClaim component
import AdminClaim from "./components/Claims/adminClaim"; // Import the AddClaim component
import ClaimDetails from "./components/Claims/claimDetails"; // Import the ClaimDetailsPage component
import UserClaim from "./components/Claims/userClaim";
import DashboardComponent from "./components/DashboardComponent";
import Cours from "./components/Cours/Cours";
import AddCour from "./components/Cours/AddCour";
import DetailCour from "./components/Cours/DetailCour";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/quiz" element={<Quizpage />} />
        <Route path="/subs" element={<QuizSubmissionsComponent />} />
        <Route path="/profile" element={<Profiles />} />
        <Route path="/education" element={<Education />} />
        <Route path="/dashboard" element={<DashboardComponent />} />
        <Route path="/Cours" element={<Cours />} />
        <Route path="/AddCour" element={<AddCour />} />
        <Route path="/DetailCour/:id" element={<DetailCour />} />

        <Route path="/addclaim" element={<AddClaim />} />
        <Route path="/adminclaims" element={<AdminClaim />} />
        <Route path="/claim/details/:claimId" element={<ClaimDetails />} />
        <Route path="/claims" element={<UserClaim />} />
      </Routes>
    </Router>
  );
}

export default App;
