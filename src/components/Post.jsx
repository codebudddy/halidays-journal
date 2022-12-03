import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dummyEntry } from './data';
import './post.css';
import { useCollection } from '../hooks/useCollections';
import { formatDistance } from 'date-fns';

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState('');
  const [todayPost, setTodayEntries] = useState('');
  const { document } = useCollection('entries');

  useEffect(() => {
    const fetchData = async () => {
      let newPostObj = {};
      document?.forEach((doc) => {
        if (doc.id === postId) {
          newPostObj = { ...doc };
        }
      });
      setPost(newPostObj);
    };

    const fetchTodayPost = () => {
      let newPostArray = [];
      if (document) {
        document.forEach((p) => {
          if (
            p?.createdAt &&
            p.createdAt.toDate().toLocaleDateString() ===
              new Date().toLocaleDateString() &&
            p.id !== postId
          ) {
            newPostArray.push(p);
          }
        });
      }

      setTodayEntries(newPostArray);
    };

    fetchData();
    fetchTodayPost();
  }, [document, postId]);
  return (
    <div className="post__main">
      {post && (
        <div className="post">
          <div className="post__heading">
            {post?.createdAt && (
              <h2 className="post__heading-date">
                {formatDistance(post?.createdAt?.toDate(), new Date(), {
                  addSuffix: true,
                })}
              </h2>
            )}
            <div className="post__heading-summary">
              <h2>{post?.summary}</h2>
            </div>
          </div>
          <div className="post__body">
            <div className="post__body-image">
              <img src={post?.imgUrl} alt="computer" />
            </div>
            <div className="post__body-details">{post?.details}</div>
          </div>
        </div>
      )}
      {todayPost.length >= 1 && (
        <div className="post__main-outlet">
          <h2 className="post__main-outlet_heading">Today Entries</h2>
          <div className="post__main-outlet_entries">
            {todayPost &&
              todayPost.map((p) => (
                <div className="post__main-outlet_entry" key={p.id}>
                  <h3>
                    {formatDistance(p?.createdAt?.toDate(), new Date(), {
                      addSuffix: true,
                    })}
                  </h3>
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
