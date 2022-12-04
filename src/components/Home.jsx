import React, { useEffect, useState } from 'react';
import './home.css';
import { useCollection } from '../hooks/useCollections';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { formatDistance } from 'date-fns';
import { trim } from '../helpers';

const Home = () => {
  const navigate = useNavigate();
  const { document } = useCollection('entries');

  //states
  const [todayPost, setTodayPost] = useState([]);

  useEffect(() => {
    const fetchTodayPost = () => {
      const posts = [];
      document?.forEach((doc) => {
        if (
          doc?.createdAt?.toDate().toLocaleDateString() ===
          new Date().toLocaleDateString()
        ) {
          posts.push(doc);
        }
      });
      setTodayPost(posts);
    };

    fetchTodayPost();
  }, [document]);
  return (
    <div className="home">
      <div className="home__heading">
        <h2 className="home__heading-quote">
          "Journaling is a refined mode of thinking..."
        </h2>
        <p className="home__heading-by">_Anonymous</p>
      </div>
      <div className="home__divider"></div>
      <div className="home__today">
        {todayPost.length <= 0 ? (
          <div className="home__today-empty">
            <h3> You have not made an entry today</h3>
            <button
              onClick={() => navigate('/compose')}
              className="home__compose"
            >
              Write Something
            </button>
          </div>
        ) : (
          <div className="home__today-entries">
            {todayPost.map((p) => (
              <div
                className="home__today-entry"
                onClick={() => navigate(`/posts/${p.id}`)}
                key={uuidv4()}
              >
                <h2>
                  {formatDistance(p?.createdAt?.toDate(), new Date(), {
                    addSuffix: true,
                  })}
                </h2>
                <p>{trim(p.summary, 35)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
