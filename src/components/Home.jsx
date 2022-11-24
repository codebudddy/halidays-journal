import React from 'react';
import { Link } from 'react-router-dom';
import { dummyEntry } from './data';
import './home.css';
// import { GiFeather } from 'react-icons/gi';

const todayEntries = dummyEntry.filter(
  (e) => e.date.getDate() === new Date().getDate()
);

const Home = () => {
  return (
    <div className="home">
      <div className="home__hero">
        <div className="home__hero-container">
          <div className="home__hero-divider"></div>
          <h2 className="home__hero-heading">
            Writting is the deepest form of thinking.
            <br />
            <i>...Anonymous</i>
          </h2>
        </div>
      </div>
      <div className="home__info">
        {!dummyEntry ? (
          <h1 className="home__info-heading">
            Take a moment to take a note about your day.
          </h1>
        ) : (
          <h1 className="home__info-heading">Today so far</h1>
        )}

        <div className="home__info-today">
          {todayEntries.map((entry) => (
            <Link key={entry.id} to={`/posts/${entry.id}`}>
              <div className="home__info-today__entry card">
                <h3 className="home__info-today__entry-date">
                  {entry.date.toLocaleString()}
                </h3>
                <p className="home__info-today__entry-summary">
                  {entry.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
