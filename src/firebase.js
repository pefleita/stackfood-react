import { initializeApp, getApps, getApp } from 'firebase/app'
import {
    getMessaging,
    getToken,
    onMessage,
    isSupported,
} from 'firebase/messaging'
import { useStoreFcm } from './hooks/react-query/push-notification/usePushNotification'

const firebaseConfig = {
    apiKey: 'AIzaSyBm05MxRoPERWcVT1bzXmykPyDJ4syV0pY',
    authDomain: 'comidacubana-a06e4.firebaseapp.com',
    projectId: 'comidacubana',
    storageBucket: 'comidacubana.appspot.com',
    messagingSenderId: '897727265835',
    appId: '1:897727265835:web:0da2e4470868b25863fe6e',
    measurementId: 'G-T6K7FT5F93',
}
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const messaging = (async () => {
    try {
        const isSupportedBrowser = await isSupported()
        if (isSupportedBrowser) {
            return getMessaging(firebaseApp)
        }

        return null
    } catch (err) {
        return null
    }
})()

export const fetchToken = async (setTokenFound, setFcmToken) => {
    return getToken(await messaging, {
        vapidKey:
            'BH9nNJkMzv58P5j94UYBtS1mr0zBFTIkeN2B07u2hF9j9gayRVCiv5VFcxARa3CYLqa7qwSgdqop5u6-5ajKCTA',
    })
        .then((currentToken) => {
            if (currentToken) {
                setTokenFound(true)
                setFcmToken(currentToken)

                // Track the token -> client mapping, by sending to backend server
                // show on the UI that permission is secured
            } else {
                setTokenFound(false)
                setFcmToken()
                // shows on the UI that permission is required
            }
        })
        .catch((err) => {
            console.error(err)
            // catch error while creating client token
        })
}

export const onMessageListener = async () =>
    new Promise((resolve) =>
        (async () => {
            const messagingResolve = await messaging
            onMessage(messagingResolve, (payload) => {
                resolve(payload)
            })
        })()
    )