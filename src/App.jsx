import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function App() {
  // useEffect(() => {
  //   fetchApi();
  // }, []);

  const fetchApi = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/product/get-all`);
    return res.data;
  };

  const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi });
  console.log('q', query);

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
