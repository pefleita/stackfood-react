importScripts(
    'https://www.gstatic.com/firebasejs/9.13.0/firebase-app-compat.js'
)
importScripts(
    'https://www.gstatic.com/firebasejs/9.13.0/firebase-messaging-compat.js'
)
firebase?.initializeApp({
    apiKey: 'AIzaSyBm05MxRoPERWcVT1bzXmykPyDJ4syV0pY',
    authDomain: 'comidacubana-a06e4.firebaseapp.com',
    projectId: 'comidacubana',
    storageBucket: 'comidacubana.appspot.com',
    messagingSenderId: '897727265835',
    appId: '1:897727265835:web:0da2e4470868b25863fe6e',
    measurementId: 'G-T6K7FT5F93',
})

// Retrieve firebase messaging
const messaging = firebase?.messaging()

messaging.onBackgroundMessage(function (payload) {
    const notificationTitle = payload.notification.title
    const notificationOptions = {
        body: payload.notification.body,
    }

    self.registration.showNotification(notificationTitle, notificationOptions)
})
