import {useState, useEffect} from 'react'
import { projectFireStore } from '../firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore';

const useFirestoreBySearch = (col, user) =>{
    const [docs, setDocs] = useState([]);

    useEffect(()=>{
        const q = query(collection(projectFireStore, col), where("username", "==", user));
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