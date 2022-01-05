import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase';
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail, 
    updatePassword, 
    updateEmail 
} from '@firebase/auth';
import { collection, addDoc, deleteDoc, doc, updateDoc, arrayUnion, arrayRemove, getDoc, setDoc } from '@firebase/firestore';
import { projectFireStore, projectStorage } from '../firebase';
import { Timestamp } from '@firebase/firestore';
import { ref, deleteObject } from '@firebase/storage';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const [changes, setChanges] = useState(0)

    async function signup(email, password){
        await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(projectFireStore, 'users', auth.currentUser.uid), {
            email: auth.currentUser.email,
            username: auth.currentUser.email.split('@')[0]
        })
    }

    function getUserData(id){
        return getDoc(doc(projectFireStore, 'users', id));
    }

    async function changeUsername(id, newUsername){
        return updateDoc(doc(projectFireStore, 'users', id),{
            username: newUsername
        })
    }

    async function login(email, password){
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout(){
        return auth.signOut();
    }

    function resetPassword(email){
        return sendPasswordResetEmail(auth, email)
    }

    function updateEmailFunc(email){
        return updateEmail(currentUser, email);
    }

    function updatePasswordFunc(password){
        return updatePassword(currentUser, password)
    }

    function postContent(posterId, content){
        const collectionRef = collection(projectFireStore, 'posts');
        return addDoc(collectionRef, {posterId: posterId, content: content, timeStamp: Timestamp.now(), likes: [], comments: []})
    }

    async function deletePost(id, fileName){
        try{
            if(fileName){
                const imageRef = ref(projectStorage, `posts/${fileName}`);
                await deleteObject(imageRef)
            }
            await deleteDoc(doc(projectFireStore,'posts',id));
        }
        catch(err){
            return 'could not delete post';
        }
    }

    function uploadComment(posterId, content, postId){
        const postRef = doc(projectFireStore, 'posts', postId);
        return updateDoc(postRef, {
            comments: arrayUnion({
                posterId, 
                content, 
                postId, 
                timeStamp: Timestamp.now()
            })
        })
    }

    function deleteComment(id){
        return deleteDoc(doc(projectFireStore,'comments',id));
    }

    async function likePost(id, postId){

        const collectionRef = doc(projectFireStore, 'posts', postId);
        const docSnap = await getDoc(collectionRef);

        if(docSnap.exists()){
            if(docSnap.data().likes.includes(id)){
                return updateDoc(collectionRef, {
                    likes: arrayRemove(id)
                })
            }
        }

        return updateDoc(collectionRef, {
            likes: arrayUnion(id)
        })
    }

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (currentUser)=>{
            if(currentUser){
                async function getUser(){
                const user = await getDoc(doc(projectFireStore, 'users', currentUser.uid));
                return setCurrentUser({id: user.id, ...user.data()});
                }
                getUser()
                setLoading(false);
            }
            else{
                setCurrentUser(null)
            }
        })
        return unsub;
    }, [changes])

    const value = {
        currentUser: loading ? null : currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmailFunc,
        updatePasswordFunc,
        postContent,
        deletePost,
        uploadComment,
        deleteComment,
        likePost,
        changeUsername,
        getUserData,
        setChanges
    }

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}
