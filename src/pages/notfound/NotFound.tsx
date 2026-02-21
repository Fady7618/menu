import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/button/Button';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-8">
      <div className="text-center text-white">
        <h1 className="text-8xl md:text-9xl font-extrabold m-0 leading-none">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold my-4">Page Not Found</h2>
        <p className="text-xl md:text-2xl mb-8 opacity-95">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button size="large">Go Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;