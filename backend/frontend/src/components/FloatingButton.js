import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function FloatingButton() {
  const [isInFooter, setIsInFooter] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const totalHeight = document.body.scrollHeight;
      const scrollPosition = window.scrollY;
      const offset = 100; // Puedes ajustar este valor según sea necesario

      setIsInFooter(scrollPosition > totalHeight - windowHeight - offset);
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
        className={`btn rounded-pill ${isInFooter ? 'btn-light text-dark' : 'btn-dark text-white'}`}
      >
        Create your AITopStaff
      </Link>
    </div>
  );
}

export default FloatingButton;