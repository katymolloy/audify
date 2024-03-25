import "./styles/app.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import LandingPage from "./pages/Landing";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import HomePage from "./pages/Home";
import AccountPage from "./pages/Account";
import AlbumPage from "./pages/Album";
import NotFound from "./pages/NotFound";
import Spotify from "./database/spotify";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./database/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

function App() {
  const [userInfo, setUserInfo] = useState([]);
  const [user, setUser] = useState();

  
  useEffect(() => {
    (async () => {
      const data = [];
      const querySnap = await getDocs(collection(db, "users")); // TODO: Improve to narrow search query to emails and passwords then remove .email property from line 27
      querySnap.forEach((doc) => {
        data.push({password: doc.data().password, email: doc.data().email});
      });
      setUserInfo(data);
    })();
  }, []);

  

  /**
   * Export usernames
   * @returns {Array<string>} an array of usernames
   */
  const exportUserInfo = () => {
    const usernameData = userInfo;
    return usernameData;
  }

  /**
   * Login user
   * @param {string} email
   * @param {string} password
   */
  const login = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const currentUser = userCredential.user.uid;

        setUser(currentUser);
        console.log("login user", user);
      })
      .catch((err) => {console.log("userNames", userInfo);
        const errorCode = err.code;
        console.log(errorCode);
      });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onUserInfo={exportUserInfo} onLogin={login} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage currentUser={user} />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/album:albumName" element={<AlbumPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

