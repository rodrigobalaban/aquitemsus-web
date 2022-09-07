importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDvkG8_1PeCgEl4Wpuy-aJVY-RjmixlK1c",
  authDomain: "aqui-tem-sus.firebaseapp.com",
  projectId: "aqui-tem-sus",
  storageBucket: "aqui-tem-sus.appspot.com",
  messagingSenderId: "854355456387",
  appId: "1:854355456387:web:339c6227db40baf0f586b6",
  measurementId: "G-E28NW4P75X"
});

const messaging = firebase.messaging();
