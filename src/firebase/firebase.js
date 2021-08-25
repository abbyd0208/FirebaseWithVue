// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";


var firebaseConfig = {
    apiKey: "AIzaSyADO0qKC6UMp_IzC9U0lozR4SbvCeRHKVM",
    authDomain: "august-monolith-200906.firebaseapp.com",
    databaseURL: "https://august-monolith-200906.firebaseio.com",
    projectId: "august-monolith-200906",
    storageBucket: "august-monolith-200906.appspot.com",
    messagingSenderId: "106892757947",
    appId: "1:106892757947:web:247077f4eb268e01b9929e"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const fb = firebase.auth();
// export default db ,
export {
	db,fb
}
