import './styles/App.css';
import { Route, Navigate, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import HomePage from './pages/HomePage';

import LoginPage from './pages/LoginPage';

import BlogPage from './pages/BlogPage';
import SinglePostPage from './pages/SinglePostPage';
import CreateNewPostPage from './pages/CreateNewPostPage';
import EditPostPage from './pages/EditPostPage';

import AboutPage from './pages/AboutPage';

import NotFoundPage from './pages/NotFoundPage';

import Layout from './layout/Layout';

import RequireAuth from './hoc/RequireAuth';
import { AuthProvider } from './hoc/AuthProvider';

import { blogLoader } from './pages/BlogPage';
import { postLoader } from './pages/SinglePostPage';

import { createNewPostAction } from './pages/CreateNewPostPage';
import { updatePostAction } from './pages/EditPostPage';

import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='posts' element={<BlogPage />} loader={blogLoader} errorElement={<ErrorPage />} />
      <Route path='posts/:id' element={<SinglePostPage />} loader={postLoader} />
      <Route path='posts/:id/edit' element={<EditPostPage />} loader={postLoader} action={updatePostAction} />
      <Route
        path='posts/new'
        element={
          <RequireAuth>
            <CreateNewPostPage />
          </RequireAuth>
        }
        action={createNewPostAction}
      />
      <Route path='about' element={<AboutPage />}>
        <Route path='contacts' element={<p>Our contacts</p>} />
        <Route path='team' element={<p>Our team</p>} />
      </Route>
      <Route path='about-us' element={<Navigate to={'/about'} replace />} />
      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
