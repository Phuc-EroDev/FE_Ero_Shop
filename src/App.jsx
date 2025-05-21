import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { isJsonString } from './utils';
import { jwtDecode } from 'jwt-decode';
import * as UserService from './services/UserService';
import { updateUser } from './redux/slides/userSlide';
import { useDispatch } from 'react-redux';

function App() {
  // useEffect(() => {
  //   fetchApi();
  // }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    const { decoded, storageData } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
  }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token');
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  UserService.axiosJWT.interceptors.request.use(
    async function (config) {
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken();
        config.headers['token'] = `Bearer ${data?.access_token}`;
      }
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const fetchApi = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/product/get-all`);
    return res.data;
  };

  const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi });
  // console.log(query);

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route, index) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : React.Fragment;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
