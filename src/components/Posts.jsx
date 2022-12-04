import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { trim } from '../helpers';

import './posts.css';
import { useCollection } from '../hooks/useCollections';
import { formatDistance } from 'date-fns';

const Posts = () => {
  const { document } = useCollection('entries');
  const [datesArray, setDatesArray] = useState([]);
  const [date, setDate] = useState('All');
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const fetchDates = () => {
      let dates = ['All'];
      document?.forEach((d) => {
        if (!dates.includes(d?.createdAt?.toDate().toLocaleDateString())) {
          dates.push(d.createdAt?.toDate().toLocaleDateString());
        }
      });
      setDatesArray(dates);
    };

    const setFilters = () => {
      if (date === 'All' && document) {
        setDocs(document);
      } else {
        if (document) {
          const newFilter = document.filter(
            (d) => d.createdAt.toDate().toLocaleDateString() === date
          );
          setDocs(newFilter);
        }
      }
    };

    fetchDates();
    setFilters();
  }, [document, date]);
  return (
    <div className="posts">
      <div className="posts__by-dates">
        {datesArray &&
          datesArray.map((element) => (
            <div
              onClick={() => setDate(element)}
              className={
                date === element
                  ? 'posts__by-dates_date current'
                  : 'posts__by-dates_date'
              }
              key={element}
            >
              <p>{element}</p>
            </div>
          ))}
      </div>
      <div className="posts__entries">
        {docs &&
          docs.map((entry) => (
            <div className="posts__entries-entry" key={entry.id}>
              <i className="posts__entries-entry_id">{trim(entry.id, 5)}</i>
              <h3 className="posts__entries-entry_date">
                {formatDistance(entry.createdAt.toDate(), new Date(), {
                  addSuffix: true,
                })}
              </h3>
              <h4 className="posts__entries-entry_summary"> {entry.summary}</h4>
              <p className="posts__entries-entry_details">
                {trim(entry.details, 70)}...
              </p>
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
