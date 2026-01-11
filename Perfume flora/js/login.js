import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase config (same as your firebase.js)
const firebaseConfig = {
  apiKey: "AIzaSyDO49-BT4JICycI198CUs3tUYFItHuJQEQ",
  authDomain: "floraperfume-50036.firebaseapp.com",
  projectId: "floraperfume-50036",
  storageBucket: "floraperfume-50036.firebasestorage.app",
  messagingSenderId: "1075571389618",
  appId: "1:1075571389618:web:fd744bd79d56491c9945ab"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

// Redirect to admin if already logged in
onAuthStateChanged(auth, user => {
  if (user) {
    window.location.href = "admin.html";
  }
});

// Handle login
loginForm.onsubmit = async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    // Redirect to admin panel
    window.location.href = "admin.html";
  } catch (error) {
    errorMsg.textContent = error.message;
  }
};
