import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";
  import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD4NhO2foNc0OYJB6Y4rbnKrVmT1bq5bKc",
  authDomain: "gb-reactjs-33905.firebaseapp.com",
  projectId: "gb-reactjs-33905",
  storageBucket: "gb-reactjs-33905.appspot.com",
  messagingSenderId: "903813555749",
  appId: "1:903813555749:web:cc34c787a3177aa0b041cc",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const signUp = async (email, pass) =>
  await createUserWithEmailAndPassword(auth, email, pass);
export const logIn = async (email, pass) =>
  await signInWithEmailAndPassword(auth, email, pass);
export const logOut = async () => await signOut(auth);
export const db = getDatabase(app);
export const userRef = ref(db, 'user');
export const chatsRef = ref(db, 'chats');
export const messagesRef = ref(db, 'messages');
export const getChatRefById = (id) => ref(db, `chats/${id}`);
export const getChatMsgsListRefById = (chatId) => ref(db, `messages/${chatId}/messagesList`);
export const getChatMsgsRefById = (chatId) => ref(db, `messages/${chatId}`);