import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase.config';

export const useDocument = (collectionName, docId) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  

  useEffect(() => {
    setIsPending(true);
    // const unsubscribe = onSnapshot(
    //   docRef,
    //   (snapshot) => {
    //     if (snapshot.data()) {
    //       setFile(snapshot.data());
    //       setIsPending(false);
    //       setError(null);
    //     } else {
    //       setError('Resource Not Found');
    //       setIsPending(false);
    //     }
    //   },
    //   (err) => {
    //     setError(err.message);
    //     setIsPending(false);
    //   }
    // );

    // return () => unsubscribe();

    console.log(collectionName, docId);
  }, [collectionName, docId]);

  return { file, error, isPending };
};
