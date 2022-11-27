import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Compose, Footer, Header, Home, Post, Posts } from './components';
import Login from './components/Login';
import './App.css';
import { GiFeather } from 'react-icons/gi';
import { useAuthContext } from './hooks/useAuthContext';

const App = () => {
  const { user, authIsReady } = useAuthContext();

  console.log(authIsReady);
  return (
    <div>
      {authIsReady && (
        <BrowserRouter>
          <div>
            {user ? (
              <div>
                <div className="App">
                  <div className="app__compose">
                    <Link to="./compose">
                      <GiFeather />
                    </Link>
                  </div>
                  {user && <Header />}
                </div>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/posts/:postId" element={<Post />} />
                  <Route path="/posts" element={<Posts />} />
                  <Route path="/compose" element={<Compose />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </div>
            ) : (
              <div className="App">
                <Login />
              </div>
            )}
          </div>
          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
