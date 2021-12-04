import {useState, useEffect} from 'react'
import { projectFireStore } from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore';

const useFirestore = (col) =>{
    const [docs, setDocs] = useState([]);

    useEffect(()=>{
        const unsub = onSnapshot(collection(projectFireStore, col), (snap)=>{
                let documents = [];
                snap.forEach(doc => {
                    documents.push({...doc.data(), id: doc.id})
                });
                setDocs(documents);
            })
        return () => unsub();
    }, [col])

    return { docs };
}

export default useFirestore;