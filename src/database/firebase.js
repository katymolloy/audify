import { initializeApp } from "firebase/app";
import { getAuth, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc, arrayUnion } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {

  apiKey: "AIzaSyAa6HWNWLbZIeLipv_jtBBZtGA5yeShO48",

  authDomain: "audify-database.firebaseapp.com",

  projectId: "audify-database",

  storageBucket: "audify-database.appspot.com",

  messagingSenderId: "611138328808",

  appId: "1:611138328808:web:537b41412f89db5173915d",

  measurementId: "G-168BQHK999"

};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const imageDb = getStorage(app);
export default app;

// functions below
/**
 * saves review to database in user field as well as review collection
 * @param {string} albumId 
 * @param {string} albumName 
 * @param {string} review 
 * @param {string} rating 
 */
export const writeReviewToDb = async (albumId, albumName, review, rating) => {
  let current = auth.currentUser;

  await setDoc(doc(db, 'reviews', albumId), {
    reviews: arrayUnion({
      album: albumName,
      albumId: albumId,
      review: review,
      rating: rating,
      author: current.uid
    })
  }, { merge: true })


  const docRef = doc(db, 'users', current.uid);
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    let reviews = docSnap.data().reviews;
    if (reviews.length > 0) {
      reviews.forEach((review) => {
        if (review.albumId !== albumId) {
          setDoc(docRef, {
            reviews: arrayUnion({ review: review, rating: rating, albumId: albumId })
          }, { merge: true })
          console.log('Review saved')

        } else {
          console.log('Album already reviewed')

        }
      })
    } else {
      setDoc(docRef, {
        reviews: arrayUnion({ review: review, rating: rating, albumId: albumId })
      }, { merge: true })

    }
  } else {
    console.log('Error finding user data')

  }
}




export const getUserData = async (current, setUserInfo) => {
  const docRef = doc(db, 'users', current.uid)
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    setUserInfo(docSnap.data())
    return;
  } else {
    console.log('No data for current user');
    return;
  }
}



////////////////////////////////////////// register / login functions below
/**
  * @description 
  * - Writes user data to the database.   *
  * - The provided user ID is used as the document ID in the 'users' collection.   *
  * - Additionally, the username is used as the document ID in the 'usernames' collection.
  * @async
  * @function writeToDb
  * @param {string} userId - The unique identifier of the user.
  * @returns {Promise<void>} A Promise that resolves once the user data is successfully written to the database.
  */
export const writeUserToDb = async (userId, username, email, displayName) => {
  try {
    await setDoc(doc(db, "users", userId), {
      username: username,
      email: email,
      display: displayName,
    });

    await setDoc(doc(db, "usernames", username), {
      username: username,
      email: email,
      uid: userId,
    });

  } catch (error) {
    console.log(`Error writing to database: ${error}`);
  }
};




/**
 * Registers a new user with the provided email and password.
 * If there are no error messages, the user is created with the provided credentials
 * and their UID is written to the database.
 * @async
 * @function registerUser
 * @returns {Promise} A Promise that resolves once the user is successfully registered and written to the database.
 */
export const registerUser = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        return userCredential.user;
      }
    );
  
};



export const logOutUser = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log("logged out");
    })
    .catch((error) => {
      console.log("Error signing out " + error);
    });
};
