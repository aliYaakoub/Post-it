import {useState, useEffect} from 'react'
import { projectFireStore } from '../firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

const useFirestore = (col, order) =>{
    const [docs, setDocs] = useState([]);

    useEffect(()=>{
        const q = query(collection(projectFireStore, col), orderBy('timeStamp', order));
        const unsub = onSnapshot(q, (snap)=>{
                let documents = [];
                snap.forEach(doc => {
                    documents.push({...doc.data(), id: doc.id})
                });
                setDocs(documents);
            })
        return () => unsub();
    }, [col, order])

    return { docs };
}

export default useFirestore;