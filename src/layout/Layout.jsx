import { Outlet } from 'react-router-dom';

import CustomLink from '../components/UI/CustomLink';

const Layout = () => {
  return (
    <>
      <header>
        <CustomLink to='/'>Home</CustomLink>
        <CustomLink to='/posts'>Blog</CustomLink>
        <CustomLink to='/about'>About</CustomLink>
      </header>

      <main className='container'>
        <Outlet />
      </main>

      <footer className='container'>React Router Tutorial 2023</footer>
    </>
  );
};

export default Layout;
