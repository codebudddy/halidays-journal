import React, { useState } from 'react';
import './compose.css';
import { GrAdd } from 'react-icons/gr';
import { useStorage } from '../hooks/useStorage';
import { useFirestore } from '../hooks/useFirestore';
import { serverTimestamp } from 'firebase/firestore';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const initialValue = {
  summary: '',
  details: '',
  imgUrl:
    'https://images.unsplash.com/photo-1669394367856-30500a8c06d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
  createdAt: serverTimestamp(),
};

const Compose = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialValue);
  const { imageUpload, loading, imageUrl, progress } = useStorage();
  const { addDocument } = useFirestore('entries');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntryObj = { ...form, imgUrl: imageUrl };
    await addDocument(newEntryObj).then(() => {
      navigate('/posts');
    });
    clearFields();
  };

  const clearFields = () => {
    setForm({ summary: '', details: '', imgUrl: '' });
  };

  const handleImageUpload = async (e) => {
    if (e.target.files[0].type === 'image/jpeg') {
      await imageUpload(e.target.files[0]).then(() => {
        console.log('Image Uploaded');
      });
    } else {
      console.log('Only images are supported');
    }
  };

  return (
    <div className="compose">
      <h1 className="compose__heading">New Entry</h1>
      <form className="compose__form" onSubmit={handleSubmit}>
        <label htmlFor="summary">
          Summary:
          <textarea
            name="summary"
            id="summary"
            cols="30"
            rows="3"
            required
            placeholder="A brief summary here"
            onChange={handleChange}
            value={form.summary}
          ></textarea>
        </label>

        <label htmlFor="details">
          Details:
          <textarea
            name="details"
            id="details"
            cols="30"
            rows="10"
            required
            placeholder="Full details here"
            onChange={handleChange}
            value={form.details}
          ></textarea>
        </label>
        <label htmlFor="picture">
          Entry Image:
          <input
            type="file"
            name="picture"
            onChange={handleImageUpload}
            placeholder="Optional image here"
          />
        </label>

        <button disabled={loading} type="submit" className="compose__submit">
          {loading ? `Uploading ${progress}%` : <GrAdd />}
        </button>
      </form>
    </div>
  );
};

export default Compose;
