import { useEffect, useState } from 'react';
import type { GithubUser } from '../../../types/api';

const GithubAuth = () => {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState<GithubUser>();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get('code');

    if (codeParam && !localStorage.getItem('accessToken')) {
      const getAccessToken = async () => {
        try {
          const response = await fetch(`http://localhost:4000/getAccessToken?code=${codeParam}`);
          const data = await response.json();
          if (data.access_token) {
            localStorage.setItem('accessToken', data.access_token);
            setRerender((prev) => !prev);
          }
        } catch (error) {
          console.error('Error fetching access token:', error);
        }
      };
      getAccessToken();
    }

    if (localStorage.getItem('accessToken')) {
      getUserData();
    }
  }, [rerender]);

  const getUserData = async () => {
    try {
      const response = await fetch('http://localhost:4000/getUserData', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      });
      const data = await response.json();
      console.log('userData', data)
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const loginWithGithub = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}`
    );
  };

  return (
    <div>
      <header>
        {localStorage.getItem('accessToken') ? (
          <>
            <h1>Welcome {userData?.login || 'User'}</h1>
            <button
              onClick={() => {
                localStorage.removeItem('accessToken');
                setRerender((prev) => !prev);
              }}
            >
              Log out
            </button>
          </>
        ) : (
          <button onClick={loginWithGithub}>Login with GitHub</button>
        )}
      </header>
    </div>
  );
};

export default GithubAuth;