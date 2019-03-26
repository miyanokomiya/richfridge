import firebase from 'firebase'
// import 'firebase/auth'
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

export default firebase
export const db = firebase.firestore()

// export default (context, inject) => {
//   firebase.auth().onAuthStateChanged(function(user) {
//     context.app.store.commit('setUser', user)
//   })
// }
