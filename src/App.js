import './styles/app.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/Landing';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import HomePage from './pages/Home';
import AccountPage from './pages/Account';
import AlbumPage from './pages/Album';
import AboutPage from './pages/About';
import ReviewPage from './pages/LeaveReview';
import NotFound from './pages/NotFound';



import { useState, useEffect } from 'react';

function App() {

  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  

  const updateUser = (newUser) =>{
    setCurrentUser(newUser)
  }

  const updateUserData = (username, display) => {
    setUsername(username);
    setDisplayName(display)
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login'
          element={<LoginPage updateUser={updateUser} updateUserData={updateUserData}/>} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/home' element={<HomePage currentUser={userId} userDisplay={displayName} username={username} />} />
        <Route path='/account' element={<AccountPage />} />
        <Route path='/album' element={<AlbumPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/review' element={<ReviewPage />} />
        <Route path='*' element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;

