import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword, signOut,sendPasswordResetEmail
} from "firebase/auth";
import React, { useState, useEffect, useContext } from "react";
import InvokeAPI from "../Apicall";
import Auth from "../Auth/Firebase";

// @ts-ignore
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const signup = (user, pass) => {
    return createUserWithEmailAndPassword(Auth, user, pass);
    // .then((userCredential) => {
    //   setCurrentUser(userCredential.user);
    //   setLoading(false)
    // })
    // .catch((e) => {
    //   setError(e.message);
    // });
  };
  const signin = async (user, pass) => {
    return signInWithEmailAndPassword(Auth, user, pass);
    // .then((res) => {
    //   setCurrentUser(res.user);
    //   setLoading(false)
    // })
    // .catch((e) => {
    //   setError(e.message);
    // });
  };
  const forgetPassword =  async (email)=>{
    return  sendPasswordResetEmail(Auth,email);
     
  }
  const logout = async ( ) => {
    return signOut(Auth);
    // .then((res) => {
    //   setCurrentUser(res.user);
    //   setLoading(false)
    // })
    // .catch((e) => {
    //   setError(e.message);
    // });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        currentUser,
        signin,
        loading,logout,forgetPassword
      }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider };
