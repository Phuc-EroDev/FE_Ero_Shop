import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { isJsonString } from './utils';
import { jwtDecode } from 'jwt-decode';
import * as UserService from './services/UserService';
import { updateUser } from './redux/slides/userSlide';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './components/LoadingComponent/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setIsLoading(true);
    const { decoded, storageData } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
    setIsLoading(false);
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

  return (
    <div>
      <Loading isPending={isLoading}>
        <Router>
          <Routes>
            {routes.map((route, index) => {
              const Page = route.page;
              const isCheckAuth = !route.isPrivate || user.isAdmin;
              const Layout = route.isShowHeader ? DefaultComponent : React.Fragment;
              return (
                <Route
                  key={index}
                  // path={route.path}
                  // path={isCheckAuth ? route.path : '*'}
                  path={isCheckAuth ? route.path : '/not-found/ahihi-liuliu'}
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
      </Loading>
    </div>
  );
}

export default App;
