import {useState, useEffect} from 'react'
import { projectFireStore } from '../firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth } from '../firebase';

const useFirestoreBySearch = (col, user) =>{
    const [docs, setDocs] = useState([]);

    useEffect(()=>{
        let q;
        if(user === 'AuthUser' && auth.currentUser){
            q = query(collection(projectFireStore, col), where("username", "==", auth.currentUser.email.split('@')[0]));
        }
        else{
            q = query(collection(projectFireStore, col), where("username", "==", user));
        }
        const unsub = onSnapshot(q, (snap)=>{
                let documents = [];
                snap.forEach(doc => {
                    documents.push({...doc.data(), id: doc.id})
                });
                setDocs(documents);
            })
        return () => unsub();
    }, [col, user])

    return { docs };
}

export default useFirestoreBySearch;