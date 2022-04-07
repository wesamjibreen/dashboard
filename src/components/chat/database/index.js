import {initializeApp} from 'firebase/app'
import {getDatabase} from 'firebase/database'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import { getMessaging } from "firebase/messaging";

// const config =
// 	process.env.NODE_ENV === 'development'
// 		? JSON.parse(process.env.VUE_APP_FIREBASE_CONFIG)
// 		: JSON.parse(process.env.VUE_APP_FIREBASE_CONFIG_PUBLIC)
const development = () => {
    return window.firestoreConfig.devConfig
}

const production = () => {
    return window.firestoreConfig.lifeConfig
}
const firebaseSettings = eval(`${process.env.NODE_ENV}()`)
initializeApp(firebaseSettings.config)


export const firestoreDb = getFirestore()
export const realtimeDb = getDatabase()
export const storage = getStorage()
// export const messaging = getMessaging();
