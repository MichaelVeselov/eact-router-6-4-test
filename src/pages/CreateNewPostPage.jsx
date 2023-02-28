import { useNavigate, useNavigation, redirect } from 'react-router-dom';

import NewPost from '../components/NewPost';

import useAuth from '../hooks/useAuth';

const CreateNewPostPage = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const handleClick = () => {
    signOut(() => navigate('/', { replace: true }));
  };

  return (
    <div>
      <h1> Create New Post</h1>
      <NewPost submitting={navigation.state === 'submitting'} />
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

const createNewPost = async ({ title, body, userId }) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body, userId }),
  });

  return await response.json();
};

export const createNewPostAction = async ({ request }) => {
  const formData = await request.formData();

  const newPost = {
    title: formData.get('title'),
    body: formData.get('body'),
    userId: formData.get('userId'),
  };

  const post = await createNewPost(newPost);

  return redirect(`/posts/${post.id - 11}`);
};

export default CreateNewPostPage;
