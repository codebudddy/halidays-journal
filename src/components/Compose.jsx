import React, { useState } from 'react';
import './compose.css';
import { GrAdd } from 'react-icons/gr';

const initialValue = {
  summary: '',
  details: '',
  imgUrl: '',
  date: new Date().toLocaleString(),
};

const Compose = () => {
  const [form, setForm] = useState(initialValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    console.log(form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    clearFields();
  };

  const clearFields = () => {
    setForm({ summary: '', details: '', imgUrl: '' });
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
            placeholder="A brief summary here"
            onChange={handleChange}
            value={form.summary}
          ></textarea>
        </label>
        <label htmlFor="picture">
          Optional Image:
          <input type="file" name="picture" placeholder="Optional image here" />
        </label>
        <label htmlFor="details">
          Details:
          <textarea
            name="details"
            id="details"
            cols="30"
            rows="10"
            placeholder="Full details here"
            onChange={handleChange}
            value={form.details}
          ></textarea>
        </label>

        <button type="submit" className="compose__submit">
          <GrAdd />
        </button>
      </form>
    </div>
  );
};

export default Compose;
