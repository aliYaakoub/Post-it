import { useState, useEffect } from 'react';
import { projectStorage, projectFireStore } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc, Timestamp, doc, getDoc, updateDoc } from '@firebase/firestore';
import { deleteObject } from '@firebase/storage';

const useStorage = (file, path, posterId, content, type, userId) =>{
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
                await addDoc(collectionRef, {
                    posterId: posterId, 
                    timeStamp: Timestamp.now(), 
                    content: content, 
                    attachment: {
                        file: url, 
                        attachmentType: type, 
                        fileName: `${fileName}.${file.type.split('/')[1]}`
                    },
                    likes: [],
                    comments: []
                });
            }
            else if(path === 'profile-pictures') {
                try{
                    // const doesExist = doc(projectFireStore, 'profile-pictures', userId)
                    // const elem = await getDoc(doesExist);
                    // if(elem.exists()){
                    //     const imageRef = ref(projectStorage, `profile-pictures/${elem.data().attachment.fileName}`);
                    //     await deleteObject(imageRef)
                    // }
                    // await setDoc(doc(projectFireStore, 'profile-pictures', userId), {
                    //     username: username, 
                    //     attachment: {
                    //         file: url, 
                    //         fileName: `${fileName}.${file.type.split('/')[1]}`
                    //     },
                    //     timeStamp: Timestamp.now()
                    // })
                    const user = await getDoc(doc(projectFireStore, 'users', userId));
                    if(user.data().attachment){
                        const imageRef = ref(projectStorage, `profile-pictures/${user.data().attachment.fileName}`);
                        await deleteObject(imageRef)
                    }
                    await updateDoc(doc(projectFireStore, 'users', userId),{
                        attachment: {
                            file: url, 
                            fileName: `${fileName}.${file.type.split('/')[1]}`
                        },
                    })
                }
                catch(err){
                    console.error(err.message);
                }
            }
            setUrl(url);
        });
    },[file, path, posterId, content, type, userId])

    return { progress, error, url };

}

export default useStorage;