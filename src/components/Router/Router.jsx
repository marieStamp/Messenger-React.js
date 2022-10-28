import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { ChatsList } from "../ChatsList/ChatsList";
import { Home } from "../Home/Home";
import { ConnectedProfile } from "../Profile/Profile";
import "./router.scss";
import { ConnectedChats } from "../Chats/Chats";
import { Food } from "../Food/Food";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { onValue } from "firebase/database";
import { auth, messagesRef } from "../../services/firebase";
import { signIn, signOut } from "../../store/profile/actions";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import { PublicOutlet } from "../PublicRoute/PublicRoute";
import { SignUp } from "../SignUp/SignUp";

export const Router = () => {
  const dispatch = useDispatch();
  const [msgs, setMsgs] = useState({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(signIn());
      } else {
        dispatch(signOut());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    onValue(messagesRef, (snapshot) => {
      const newMsgs = {};

      snapshot.forEach((chatMsgsSnap) => {
        newMsgs[chatMsgsSnap.key] = Object.values(
          chatMsgsSnap.val().messagesList || {}
        );
      });

      setMsgs(newMsgs);
    });
  }, []);

  return (
    <BrowserRouter>
      <ul className="links">
        <li className="mainLinks">
          <Link className="eachLink" to="/">
            Home
          </Link>
        </li>
        <li className="mainLinks">
          <Link className="eachLink" to="/chats">
            Chats
          </Link>
        </li>
        <li className="mainLinks">
          <Link className="eachLink" to="/profile">
            Profile
          </Link>
        </li>
        <li className="mainLinks">
          <Link className="eachLink" to="/food">
            Breweries
          </Link>
        </li>
      </ul>

      <Routes>
        <Route path="/" element={<PublicOutlet />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/signup" element={<PublicOutlet />}>
          <Route path="" element={<SignUp />} />
        </Route>
        <Route path="chats">
          <Route
            index
            element={
              <PrivateRoute>
                <ChatsList />
              </PrivateRoute>
            }
          />
          <Route
            path=":chatId"
            element={
              <PrivateRoute>
                <ConnectedChats msgs={msgs} />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <ConnectedProfile />
            </PrivateRoute>
          }
        />
        <Route path="food" element={<Food />} />
        <Route path="*" element={<main>404 Not Found</main>} />
      </Routes>
    </BrowserRouter>
  );
};
