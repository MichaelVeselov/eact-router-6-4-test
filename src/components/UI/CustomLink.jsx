import { Link, useMatch } from 'react-router-dom';

const CustomLink = (props) => {
  const { children, to, ...rest } = props;

  const match = useMatch({
    path: to,
    end: to.length === 1,
  });

  return (
    <Link to={to} {...rest} style={{ color: match ? 'var(--color-active)' : 'white' }}>
      {children}
    </Link>
  );
};

export default CustomLink;
