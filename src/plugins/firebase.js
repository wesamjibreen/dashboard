import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const development = () => {
    return window.firestoreConfig.devConfig
}

const production = () => {
    return window.firestoreConfig.lifeConfig
}

export const firebaseSettings = eval(`${process.env.NODE_ENV}()`)

initializeApp(firebaseSettings.config)

export const messaging = getMessaging();

let onMessageCallbacks = [];
onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    onMessageCallbacks.forEach(function (callback) {
        callback(payload)
    })
});

export const subscribeTokenToTopic = function (token, topic) {
    // console.log("TOPC subscribe", topic, token);
    fetch(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`, {
        method: "POST",
        headers: new Headers({
            Authorization: `key=${firebaseSettings.server_key}`,
        }),
    })
        .then((response) => {
            // console.log("TOPIC response", topic, response);
        })
        .catch((error) => {
            console.log("TOPIC error", error);
        });
};

export const getFCMToken = function (callback) {
    getToken(messaging, {
        vapidKey: firebaseSettings.usePublicVapidKey,
    }).then((currentToken) => {
        if (currentToken) {
            callback(currentToken)
        }
    });
};

export const onNotificationMessage = function (callback) {
    onMessageCallbacks.push(callback);
}

