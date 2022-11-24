import React from 'react';
import { Link } from 'react-router-dom';
import { trim } from '../helpers';
import { dummyEntry } from './data';
import './posts.css';

const Posts = () => {
  return (
    <div className="posts">
      <div className="posts__entries">
        {dummyEntry.map((entry) => (
          <div className="posts__entries-entry" key={entry.id}>
            <i className="posts__entries-entry_id">{entry.id}</i>
            <h3>{entry.date.toLocaleString()}</h3>
            <h4> {entry.summary}</h4>
            <p>{trim(entry.details, 70)}...</p>
            <Link className="posts__entries-view" to={`/posts/${entry.id}`}>
              View Full
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
