import { initializeApp } from "firebase/app";
import { getAuth, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc, arrayUnion, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
 * @param {string} albumImg 
 * @param {string} review 
 * @param {string} rating 
 */
export const writeReviewToDb = async (albumId, albumImg, albumName, review, rating, date, timestamp) => {
  let current = auth.currentUser;
  let currentUsername = '';

  const docRef1 = doc(db, 'users', current.uid);
  const docRef2 = doc(db, 'reviews', albumId);
  const docSnap = await getDoc(docRef1)

  if (docSnap.exists()) {
    currentUsername = docSnap.data().username
    let oldReviews = docSnap.data().reviews;

    const dataToWrite = {
      album: albumName,
      albumId: albumId,
      albumImg: albumImg,
      review: review,
      rating: rating,
      date: date,
      time: timestamp,
      author: currentUsername,
      authorId: current.uid
    }

    if (oldReviews.length > 0) {
      oldReviews.forEach((oldReview) => {
        if (oldReview.albumId !== albumId) {

          setDoc(docRef1, {
            reviews: arrayUnion(dataToWrite)
          }, { merge: true })

          setDoc(docRef2, {
            reviews: arrayUnion(dataToWrite)
          }, { merge: true })

        } else {
          console.log('Review already saved')
          return;
        }
      })

    } else {
      setDoc(docRef1, {
        reviews: arrayUnion(dataToWrite)
      }, { merge: true })

      setDoc(docRef2, {
        reviews: arrayUnion(dataToWrite)
      }, { merge: true })
      return;
    }
  } else {
    console.log('Error retrieving user reviews from database')
    return;
  }
}










export const getReviews = async (setReviews) => {
  const querySnapshot = await getDocs(collection(db, "reviews"));
  let returnReviews = [];
  querySnapshot.forEach((doc) => {
    let userReviews = doc.data().reviews
    for (let i = 0; i < userReviews.length; i++) {
      returnReviews.push(userReviews[i])
    }
  });

  setReviews(returnReviews)
}






export const getReviewsForAlbum = async (setReviews, albumId) => {
  const docRef = doc(db, 'reviews', albumId)
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    setReviews(docSnap.data().reviews)


  }

}

// export const getReviewById = async (setReviews, id) => {

//   const querySnapshot = await getDocs(doc (db, "reviews", id));
//   const docRef = doc(db, "reviews", id);
//   const docSnap = await getDoc(querySnapshot);

//   let returnReviews = [];
//   querySnapshot.forEach((doc) => {
//     let userReviews = doc.data().reviews
//     for (let i  = 0; i < userReviews.length; i++) {
//       returnReviews.push(userReviews[i]);
//     }
//   });

//   setReviews(returnReviews);
// }



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
      reviews: [],
    })

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
export const registerUser = async (email, password, display, username) => {
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user.uid;
    await writeUserToDb(user, username, email, display);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('User already exists');
    }
    if (error.code === 'auth/weak-password') {
      console.log('Password is too weak, please try again');
    }
    console.error(`Error registering user: ${error.message}`);
  }
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
