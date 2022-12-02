import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { storage } from '../firebase.config';

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
  const [imageUrl, setImageUrl] = useState('');
  const [progress, setProgress] = useState(0);

  //if we do not use a useRef hook, there will be infinite loop in useEffect hook and we do not want that
  //_query is an array and is different on every funtion call

  const imageUpload = async (file) => {
    // const fileRef = ref(storage, `/images/${Date.now()}${file.name}`);
    // setError(null);
    // setLoading(false);

    // try {
    //   setLoading(true);
    //   const uploadImage = await uploadBytesResumable(fileRef, file);
    //   uploadImage.on(
    //     'state_changed',
    //     (snapshot) => {
    //       const percentProgress = Math.round(
    //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //       );
    //       setProgress(percentProgress);
    //     },
    //     (err) => {
    //       setError(err.message);
    //       setLoading(false);
    //     },
    //     () => {
    //       getDownloadURL(uploadImage.snapshot.ref).then((url) => {
    //         setImageUrl(url);
    //         console.log(imageUrl);
    //       });
    //     }
    //   );
    //   setLoading(false);
    //   setError(null);
    // } catch (err) {
    //   setError(err.message);
    //   setLoading(false);
    // }

    setLoading(true);
    const storageRef = ref(storage, `/entry_images/${Date.now()}${file.name}`);
    const uploadImage = uploadBytesResumable(storageRef, file);
    uploadImage.on(
      'state_changed',
      (snapshot) => {
        setProgress(
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        );
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((url) => {
            setImageUrl(url);
            setError(null);
            setLoading(false);
            console.log(imageUrl);
          })
          .catch((err) => {
            setError(err.message);
            setLoading(false);
          });
      }
    );
  };

  return { error, loading, imageUpload, progress, imageUrl };
};
