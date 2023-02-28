import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      /*    <div>
        <h1>{error.status}</h1>
        <h2>{error.statusText || 'Something went wrong...'}</h2>
      </div> */
      <div>
        <h1>{error.status}</h1>
        <h2>{error.data.message || 'Something went wrong...'}</h2>
        <h3>{error.data.reason || 'Something went wrong...'}</h3>
      </div>
    );
  }

  return <div>Not Routing Error</div>;
};

export default ErrorPage;
