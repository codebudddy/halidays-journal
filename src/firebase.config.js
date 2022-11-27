import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD1UgwugdiCO6orKXU4zXd3QPp1pmJYZ34',
  authDomain: 'halidays-journal.firebaseapp.com',
  projectId: 'halidays-journal',
  storageBucket: 'halidays-journal.appspot.com',
  messagingSenderId: '720234299702',
  appId: '1:720234299702:web:b5c90cf49e1ed4b3f17397',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();
const storage = getStorage(app);
const authentication = getAuth(app);

export { db, storage, authentication };
