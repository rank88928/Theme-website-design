
// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
//firebase核心

import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
//用戶行為追蹤

import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
//資料庫

export {
    firebaseConfig, db, doc, getDoc
}

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyAaBJ4mgFMfiK-b4M84tbEIzK62vjHNOjY",
    authDomain: "test-1-e3a96.firebaseapp.com", //用戶登入驗證
    projectId: "test-1-e3a96",
    storageBucket: "test-1-e3a96.firebasestorage.app",
    messagingSenderId: "850396850366", //訊息推送識別
    appId: "1:850396850366:web:f9a4eaf5c2cea38a4196ef",
    measurementId: "G-KG1CQHLG8J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

