import './styles/app.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import LandingPage from './pages/Landing';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import HomePage from './pages/Home';
import AccountPage from './pages/Account';
import AlbumPage from './pages/Album';
import NotFound from './pages/NotFound';

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const currentUser = userCredential.user.uid;
        setUser(currentUser);
      })
      .catch((err) => {
        const errorCode = err.code;
        console.log(errorCode);
      })
  }

  useEffect(() => {
    const getUserData = async () => {
      const querySnap = await getDocs(collection, db, 'users', currentUser);
      querySnap.forEach((doc) => {
        console.log(doc.data())
      })
    }
    getUserData();
  }, [])

 


  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login'
          element={<LoginPage
            onLogin={login}
          />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/home' element={<HomePage currentUser={user} />} />
        <Route path='/account' element={<AccountPage />} />
        <Route path='/album:albumName' element={<AlbumPage />} />
        <Route path='*' element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;
