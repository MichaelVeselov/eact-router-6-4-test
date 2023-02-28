import { Suspense } from 'react';
import { Link, useSearchParams, useLoaderData, Await, defer, json } from 'react-router-dom';

import BlogFilter from '../components/BlogFilter';

const BlogPage = () => {
  const { posts } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const postQuery = searchParams.get('post') || '';
  const latest = searchParams.has('latest');

  const startsFrom = latest ? 81 : 1;

  return (
    <div>
      <h1>Our news</h1>
      <BlogFilter postQuery={postQuery} latest={latest} setSearchParams={setSearchParams} />
      <Link to={'/posts/new'}>Add new post</Link>

      <Suspense fallback={<h2>Loading...</h2>}>
        <Await resolve={posts}>
          {(resolvedPosts) => {
            return (
              <>
                {resolvedPosts
                  .filter((post) => post.title.includes(postQuery) && post.id >= startsFrom)
                  .map((post) => (
                    <Link key={post.id} to={`/posts/${post.id}`}>
                      <li>{post.title}</li>
                    </Link>
                  ))}
              </>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

async function getPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');

  /*  if (!response.ok) {
    throw new Response('', { status: response.status, statusText: 'failed Fetch' });
  } */

  return await response.json();
}

export const blogLoader = async () => {
  const posts = await getPosts();

  if (!posts.length) {
    throw json({ message: 'failed Fetch', reason: 'Wrong URL' }, { status: 404 });
  }

  return defer({
    posts,
  });
};

export default BlogPage;
