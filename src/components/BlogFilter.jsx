import { useState } from 'react';

const BlogFilter = (props) => {
  const { postQuery, latest, setSearchParams } = props;

  const [search, setSearch] = useState(postQuery);
  const [checked, setChecked] = useState(latest);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const query = form.search.value;
    const isLatest = form.latest.checked;

    const params = {};

    if (query.length) {
      params.post = query;
    }
    if (isLatest) {
      params.latest = true;
    }

    setSearchParams(params);
  };

  return (
    <form autoComplete='off' onSubmit={handleSubmit}>
      <input type='search' name='search' value={search} onChange={(event) => setSearch(event.target.value)} />
      <label style={{ padding: '0 1rem' }}>
        <input type='checkbox' name='latest' checked={checked} onChange={(event) => setChecked(event.target.checked)} />{' '}
        New posts only
      </label>
      <input type='submit' value='Search' />
    </form>
  );
};

export default BlogFilter;
