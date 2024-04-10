import './styles/app.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/Landing';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import HomePage from './pages/Home';
import AccountPage from './pages/Account';
import AlbumPage from './pages/Album';
import AboutPage from './pages/About';
import NotFound from './pages/NotFound';
import SearchPage from './pages/Search';

import { useState } from 'react';

function App() {
  /**
   * State variables
   */
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  /**
   * Callback function to update the current user
   * @param {object} newUser - The new user object
   */
  const updateUser = (newUser) => {
    setCurrentUser(newUser);
  };

  /**
   * Callback function to update the user's display name and username
   * @param {string} username - The user's username
   * @param {string} displayName - The user's display name
   */
  const updateUserData = (username, displayName) => {
    setUsername(username);
    setDisplayName(displayName);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage updateUser={updateUser} updateUserData={updateUserData} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/home"
          element={<HomePage currentUser={userId} userDisplay={displayName} username={username} />}
        />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/album/:albumId" element={<AlbumPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

