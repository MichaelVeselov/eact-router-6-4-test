import { Form } from 'react-router-dom';

const NewPost = (props) => {
  const { submitting } = props;

  return (
    <Form action='/posts/new' method='post'>
      <label>
        Title:
        <input type='text' name='title' />
      </label>
      <label>
        Body:
        <input type='text' name='body' />
      </label>
      <input type='hidden' name='userId' value='1' />
      <input type='submit' value='Add new post' disabled={submitting} />
    </Form>
  );
};

export default NewPost;
