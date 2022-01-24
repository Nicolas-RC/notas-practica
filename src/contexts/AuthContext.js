import React, { useContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = React.createContext();

const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    // Crear un nuevo usuario
    const signUp = async ({email, password}) => {
        return createUserWithEmailAndPassword(auth, email, password)
        .then((credential) => {
            const user = credential.user;
            await setDoc(doc(db, 'usuarios', user.uid), {email, password, creationDate: new Date()});
        })
    };

    // Inicio de sesion
    const login = ({email, password}) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Cierre de sesión
    const logout = () => {
        signOut(auth);
    };

    // Traer al usuario en sesión
    useEffect(() => {
        const sesion = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        })
        return sesion;
    }, []);
    

    // Valores para el AuthContext
    const values = {
        currentUser,
        signUp,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={values}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export {
    AuthProvider,
    useAuth
};