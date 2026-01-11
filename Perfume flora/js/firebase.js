import { initializeApp } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getFirestore } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDO49-BT4JICycI198CUs3tUYFItHuJQEQ",
  authDomain: "floraperfume-50036.firebaseapp.com",
  projectId: "floraperfume-50036",
  storageBucket: "floraperfume-50036.firebasestorage.app",
  messagingSenderId: "1075571389618",
  appId: "1:1075571389618:web:fd744bd79d56491c9945ab"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
