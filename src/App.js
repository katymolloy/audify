import './styles/app.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/Landing';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import HomePage from './pages/Home';
import AccountPage from './pages/Account';


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/account' element={<AccountPage />} />

      </Routes>
    </Router>
  );
}

export default App;
