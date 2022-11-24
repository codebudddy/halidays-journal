import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dummyEntry } from './data';
import './post.css';

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState('');
  const [todayPost, setTodayEntries] = useState('');

  useEffect(() => {
    const newPost = dummyEntry.filter((p) => p?.id === postId);
    const samDay = dummyEntry.filter(
      (p) => p.date.getDate() === new Date().getDate()
    );
    setTodayEntries(samDay);
    setPost(newPost);
  }, [postId]);
  return (
    <div className="post__main">
      <div className="post">
        <div className="post__heading">
          <h2 className="post__heading-date">
            {post[0]?.date.toLocaleString()}
          </h2>
          <div className="post__heading-summary">
            <h2>{post[0]?.summary}</h2>
          </div>
        </div>
        <div className="post__body">
          <div className="post__body-image">
            <img
              src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
              alt="computer"
            />
          </div>
          <div className="post__body-details">{post[0]?.details}</div>
        </div>
      </div>
      {todayPost.length >= 1 && (
        <div className="post__main-outlet">
          <h2 className="post__main-outlet_heading">Same Date Entries</h2>
          <div className="post__main-outlet_entries">
            {todayPost &&
              todayPost.map((p) => (
                <div className="post__main-outlet_entry" key={p.id}>
                  <h3>{p?.date.toLocaleString()}</h3>
                  <p>{p.summary}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
