import React from 'react';
import { Link } from 'react-router-dom';
import { trim } from '../helpers';
import { dummyEntry } from './data';
import './posts.css';
import { useCollection } from '../hooks/useCollections';
import { formatDistance } from 'date-fns';

const Posts = () => {
  const { document, error } = useCollection('entries');
  return (
    <div className="posts">
      <div className="posts__entries">
        {document &&
          document.map((entry) => (
            <div className="posts__entries-entry" key={entry.id}>
              <i className="posts__entries-entry_id">{trim(entry.id, 5)}</i>
              <h3>
                {formatDistance(entry.createdAt.toDate(), new Date(), {
                  addSuffix: true,
                })}
              </h3>
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
