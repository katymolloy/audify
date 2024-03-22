import './styles/app.scss';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from './pages/Landing';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import HomePage from './pages/Home';
import AccountPage from './pages/Account';
import AlbumPage from './pages/Album';
import NotFound from './pages/NotFound';
import { signInWithEmailAndPassword, } from "firebase/auth";
import { auth, db } from "./firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { useState } from 'react';

function App() {
  // const navigate = useNavigate();
 const [displayName, setDisplayName] = useState('')
 const [username, setUsername] = useState('');
 const [userId, setUserId] = useState('')

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('here', userCredential.user.uid)
        getUserData(userCredential.user.uid)


      })
      .catch((err) => {
        const errorCode = err.code;
        console.log(errorCode);
      })
  }






  const getUserData = async (user) => {
    console.log("Fetching user data for user:", user);
    const docRef = doc(db, "users", user);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      let userData = docSnap.data();
      // let username = userData.username;
      // let display = userData.display
      setUsername(docSnap.data().username);
      setDisplayName(docSnap.data().display)
      setUserId(docSnap.data().uid)

    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document for user:", user);
    }
  }


  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login'
          element={<LoginPage
            onLogin={login}
          />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/home' element={<HomePage currentUser={userId} userDisplay={displayName} username={username} />} />
        <Route path='/account' element={<AccountPage />} />
        <Route path='/album' element={<AlbumPage />} />
        <Route path='*' element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;
