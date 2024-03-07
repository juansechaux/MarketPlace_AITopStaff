import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FloatingButton.js';
import { useLocation } from 'react-router-dom';

function FloatingButton() {
  const [isInBody, setIsInBody] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsInBody(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="position-fixed bottom-0 end-0 p-3">
      <Link
        to="https://aitopstaff.com/#015c4ce0-dab8-40a3-9254-45202d08a534"
        className={`btn rounded-pill ${isInBody ? 'btn-dark text-white': 'btn-light text-dark'}`}
      >
        Create your AITopStaff
      </Link>
    </div>
  );
}

export default FloatingButton;