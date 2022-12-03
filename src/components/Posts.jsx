import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { trim } from '../helpers';

import './posts.css';
import { useCollection } from '../hooks/useCollections';
import { formatDistance } from 'date-fns';

const Posts = () => {
  const navigate = useNavigate();
  const { document, error } = useCollection('entries');
  const [datesArray, setDatesArray] = useState([]);

  useEffect(() => {
    const fetchDates = () => {
      let dates = [];
      document?.forEach((d) => {
        if (!dates.includes(d?.createdAt?.toDate().toLocaleDateString())) {
          dates.push(d.createdAt?.toDate().toLocaleDateString());
        }
      });
      setDatesArray(dates);
    };
    fetchDates();
  }, [document]);
  return (
    <div className="posts">
      <div className="posts__by-dates">
        {datesArray &&
          datesArray.map((element) => (
            <div
              onClick={() => navigate(`/dates/${element}`)}
              className="posts__by-dates_date"
              key={element}
            >
              <p>{element}</p>
            </div>
          ))}
      </div>
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
