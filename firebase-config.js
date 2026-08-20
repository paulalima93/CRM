const firebaseConfig = {
  apiKey: "AIzaSyDDOLG77tSPdtXUXaaBxX-a86hKLFGEpW0",
  authDomain: "cadastro-61ec4.firebaseapp.com",
  projectId: "cadastro-61ec4",
  storageBucket: "cadastro-61ec4.firebasestorage.app",
  messagingSenderId: "454261415044",
  appId: "1:454261415044:web:50f9d6b17edab7c71d76d1"
};

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();
console.log(db)