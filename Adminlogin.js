
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyA3l_u9bo3mcur-zPW0ldb3ISaMyS-vo3U",
    authDomain: "student-teachers-booking.firebaseapp.com",
    projectId: "student-teachers-booking",
    storageBucket: "student-teachers-booking.firebasestorage.app",
    messagingSenderId: "987803054744",
    appId: "1:987803054744:web:fd12e500d0d8aa5c1296ed",
    measurementId: "G-PTHZ04LCTK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const adminEmail = "admin123@gmail.com";
const adminPassword = "7020032496"
const loginForm = document.getElementById("admin-login-form");
const errorMessage = document.getElementById("error-message");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("admin-email").value;
    const password = document.getElementById("admin-password").value;

    if (email === adminEmail) {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                // Redirect to dashboard on successful login
                window.location.href = "admindashboard.html";
            })
            .catch((error) => {
                // Display error message for invalid credentials
                errorMessage.style.display = "block";
                errorMessage.textContent = "Invalid credentials. Please try again.";
            });
    } else {
        // Show error if the email is not the admin's email
        errorMessage.style.display = "block";
        errorMessage.textContent = "Invalid credentials. Please try again.";
    }
});

