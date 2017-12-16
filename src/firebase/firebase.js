import * as firebase from 'firebase';
// Initialize Firebase
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);
const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };

// firebase
//     .database()
//     .ref()
//     .set({
//         name: 'Darko',
//         age: 27,
//         location: {
//             country: 'Libya',
//             city: 'Josianefort',
//             zipcode: '51236',
//             address: '117 Denesik Road',
//         },
//         isOnline: true,
//     })
//     .then(() => {
//         console.info('data is set');
//     })
//     .catch((err) => {
//         console.warn('Error happened!', err);
//     });

// firebase
//     .database()
//     .ref('expenses')
//     .push(expenses[0]);

// database
//     .ref('expenses')
//     .once('value')
//     .then((snapshot) => {
//         const expensesArr = [];
//         snapshot.forEach((childSnapshot) => {
//             console.log(childSnapshot.key);
//             expensesArr.push({
//                 ...childSnapshot.val(),
//                 id: childSnapshot.key,
//             });
//             console.log(expensesArr);
//         });
//     });
