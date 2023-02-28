import { useParams, useLoaderData, useNavigation, useActionData } from 'react-router-dom';

import UpdatePost from '../components/UpdatePost';

const EditPostPage = () => {
  const { id } = useParams();
  const { post } = useLoaderData();
  const navigation = useNavigation();
  const data = useActionData();

  return (
    <div>
      {data?.message && <div style={{ color: 'blue' }}>{data.message}</div>}
      <h1>Edit Post {id}</h1>
      <UpdatePost {...post} submitting={navigation.state === 'submitting'} />
    </div>
  );
};

const updatePost = async (post) => {
  const id = post.get('id');
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    body: post,
  });
  return await response.json();
};

export const updatePostAction = async ({ request }) => {
  const formData = await request.formData();

  if (!formData.get('title') || !formData.get('body')) {
    return { message: 'All fields are required!' };
  }

  const updatedPost = await updatePost(formData);

  return { message: `Post ${updatedPost.id} was successfully updated` };
};

export default EditPostPage;
