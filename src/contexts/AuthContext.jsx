import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail } from '@firebase/auth';
import { collection, addDoc, getDocs, query, where } from '@firebase/firestore';
import { projectFireStore } from './../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true);

    async function signup(email, password){
        await createUserWithEmailAndPassword(auth, email, password);
        const collectionRef = collection(projectFireStore, 'users');
        addDoc(collectionRef, {username: email.split('@')[0], email: email});
        return
    }

    async function login(email, password){
        await signInWithEmailAndPassword(auth, email, password);
        // const userRef = collection(projectFireStore, 'users');
        // const q = query(userRef, where('email', '==', email));
        // const querySnapshot = getDocs(q);
        // querySnapshot.forEach((doc) => {
        //     // doc.data() is never undefined for query doc snapshots
        //     console.log(doc.id, " => ", doc.data());
        //   });
        return
    }

    function logout(){
        return auth.signOut();
    }

    function resetPassword(email){
        return sendPasswordResetEmail(auth, email)
    }

    function updateEmail(email){
        currentUser.updateEmail(email);
    }

    function updatePassword(password){
        currentUser.updatePassword(password);
    }

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user)=>{
            setCurrentUser(user);
            setLoading(false);
        })

        return unsub;
    }, [])

    const value = {
        currentUser: loading ? null : currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}
