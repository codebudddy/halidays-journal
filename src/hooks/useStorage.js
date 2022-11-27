import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { storage } from '../firebase.config';
import { v4 as uuidv4 } from 'uuid';

// export const useStorage = () => {
//   const [loading, setLoading] = useState(false);
//   const [imageSnapshot, setImageSnapshot] = useState;
//   const [error, setError] = useState(null);

//   const imageUpload = (file) => {
//     const fileRef = ref(storage, `entries/image_${uuidv4()}.png`);
//     setError(null);
//     setLoading(false);

//     try {
//       setLoading(true);
//       uploadBytes(fileRef, file).then((result) => {
//         setImageSnapshot(result);
//         setLoading(false);
//         setError(null);
//       });
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   return { error, loading, imageSnapshot, imageUpload };
// };

export const useStorage = (collectionName, _query, _sort) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snapshot, setSnapshot] = useState('');

  //if we do not use a useRef hook, there will be infinite loop in useEffect hook and we do not want that
  //_query is an array and is different on every funtion call

  const imageUpload = async (file) => {
    const fileRef = ref(storage, `entries_${uuidv4()}.jpg`);
    setError(null);
    setLoading(false);

    try {
      setLoading(true);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      setSnapshot(url);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { error, loading, imageUpload, snapshot };
};
