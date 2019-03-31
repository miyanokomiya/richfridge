import Vue from 'vue'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyDc0ituEif92P23GXKrYTdghvwctoOKbqc',
    authDomain: 'rich-fridge.firebaseapp.com',
    databaseURL: 'https://rich-fridge.firebaseio.com',
    projectId: 'rich-fridge',
    storageBucket: 'rich-fridge.appspot.com',
    messagingSenderId: '597317267106'
  })
}

const authState = {
  user: null,
  needAuth: true,
  loaded: false
}

Vue.use({
  install: (Vue, options) => {
    ;(Vue as any).util.defineReactive(Vue.prototype, '$auth', authState)
  }
})

firebase.auth().onAuthStateChanged(user => {
  authState.user = user
  authState.loaded = true
})

firebase
  .auth()
  .getRedirectResult()
  .then(result => {
    if (!result.user) return
    authState.user = result.user
    authState.loaded = true
  })

export function signInWithRedirect() {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithRedirect(provider)
}

export function signOut() {
  return firebase
    .auth()
    .signOut()
    .catch(console.log)
}

export default firebase
export const db = firebase.firestore()
