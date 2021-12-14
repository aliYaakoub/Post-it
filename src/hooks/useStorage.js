import { useState, useEffect } from 'react';
import { projectStorage, projectFireStore } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc, Timestamp } from '@firebase/firestore';

const useStorage = (file, path, username, content, type) =>{
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    const randomArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    function getRandomNum(num){
        let result = '';
        for(let i=0; i<num; i++){
            result += randomArray[Math.floor(Math.random()*(randomArray.length - 1))];
        }
        return result;
    }

    useEffect(()=>{
        let fileName = getRandomNum(10);
        // refrences
        const spaceRef = ref(projectStorage, `${path}/${fileName}.${file.type.split('/')[1]}`);
        const uploadTask = uploadBytesResumable(spaceRef, file);
        const collectionRef = collection(projectFireStore, `${path}`);
        console.log(uploadTask);

        uploadTask.on(
            'state_changed', 
            (snap)=>{
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, 
        (err)=>{
            setError(err);
        }, 
        async ()=>{
            const url = await getDownloadURL(uploadTask.snapshot.ref)
            if(path === 'posts'){
                addDoc(collectionRef, {
                    username: username, 
                    timeStamp: Timestamp.now(), 
                    content: content, 
                    attachment: {
                        file: url, 
                        attachmentType: type, 
                        fileName: `${fileName}.${file.type.split('/')[1]}`
                    },
                    likes: []
                });
            }
            setUrl(url);
        });
    },[file, path, username, content, type])

    return { progress, error, url };

}

export default useStorage;