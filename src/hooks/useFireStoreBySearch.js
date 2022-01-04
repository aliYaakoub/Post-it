import {useState, useEffect} from 'react'
import { projectFireStore } from '../firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useAuth } from './../contexts/AuthContext';

const useFirestoreBySearch = (col, user) =>{
    const [docs, setDocs] = useState([]);

    const { currentUser } = useAuth()

    useEffect(()=>{
        let q;
        if(user === 'AuthUser' && currentUser){
            q = query(collection(projectFireStore, col), where("posterId", "==", currentUser.id));
        }
        else{
            q = query(collection(projectFireStore, col), where("posterId", "==", user));
        }
        const unsub = onSnapshot(q, (snap)=>{
                let documents = [];
                snap.forEach(doc => {
                    documents.push({...doc.data(), id: doc.id})
                });
                setDocs(documents);
            })
        return () => unsub();
    }, [col, user, currentUser])

    return { docs };
}

export default useFirestoreBySearch;