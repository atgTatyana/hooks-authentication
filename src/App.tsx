import { useEffect, useState } from 'react';
import './App.css';
import { FirstLoading } from './components/FirstLoading';
import { IForm } from './components/FirstLoading';
import { Profile } from './components/Profile';
import { News } from './components/News';

export interface IProfile {
  id: string,
  login: string,
  name: string,
  avatar: string,
}

export interface INews {
  id: string,
  content: string,
  image: string,
  title: string,
}

const url = 'http://localhost:7070/auth';
const urlProfile = 'http://localhost:7070/private/me';
const urlNews = 'http://localhost:7070/private/news';

function App() {
  const [ profile, setProfile ] = useState<IProfile | null>(null);
  const [ news, setNews ] = useState<INews[]>([]);

  useEffect(() => {
    const user = localStorage.getItem('profile');
    const userToken = localStorage.getItem('token');
    if (user && userToken) {
      setProfile(JSON.parse(user));
      getNews(userToken);
    }
  }, []);

  const fetchData = async (form: IForm) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        getProfile(data.token);
      }
      
    } catch (e) {
      console.log(e);
    }
  }
  
  const getProfile = async (token: string) => {
    try {
      const responseProfile = await fetch(urlProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (responseProfile.status === 401) {
        console.log('Ошибка 401!');
        handleLogout();
      }

      const data: IProfile = await responseProfile.json();
      console.log(data);
      setProfile(data);
      localStorage.setItem('profile', JSON.stringify(data));
      localStorage.setItem('token', token);

      getNews(token);

    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
      }
    }
  }

  const getNews = async (token: string) => {
    const responseNews = await fetch(urlNews, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    const data = await responseNews.json();
    console.log(data)

    setNews(data);
  }
  
  const handleLogout = () => {
    setProfile(null);
    setNews([]);
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
  }

  return (
    <>
      {!profile && <FirstLoading authentication={fetchData} />}
      {profile && (
        <>
          <Profile profile={profile} logout={handleLogout} />
          <News news={news} />
        </>
      )}
    </>
  )
}

export default App
