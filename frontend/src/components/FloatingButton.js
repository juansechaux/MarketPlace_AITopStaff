import React from 'react';
import { Link } from 'react-router-dom';
import './FloatingButton.js'; // Estilos CSS para el botón flotante

function FloatingButton() {
  return (
    <div className="position-fixed bottom-0 end-0 p-3">
      <Link to="https://lidarit.com/" className="btn btn-secondary rounded-pill bg-secondary">Create your AITopStaff</Link>
    </div>
  );
}

export default FloatingButton;
