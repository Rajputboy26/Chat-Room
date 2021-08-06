/* eslint-disable no-unused-vars */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const Config = {
  apiKey: 'AIzaSyDCFWI7TTVXJvPuAEje8NKuYEAwUyWMG6o',
  authDomain: 'chat-app-4a93c.firebaseapp.com',
  databaseURL:
    'https://chat-app-4a93c-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'chat-app-4a93c',
  storageBucket: 'chat-app-4a93c.appspot.com',
  messagingSenderId: '71135149197',
  appId: '1:71135149197:web:ee124960b568d777e9b6c4',
  measurementId: 'G-H8SWMPBYC3',
};

const app = firebase.initializeApp(Config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
