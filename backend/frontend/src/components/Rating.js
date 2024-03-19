import React from 'react'

function Rating({ value, text, color }) {
  const filledStars = Math.floor(value);
  const hasHalfStar = value % 1 !== 0;

  return (
    <div className="rating">
      {[...Array(5)].map((_, index) => (
        <span key={index}>
          {index < filledStars ? (
            <i style={{ color }} className="fas fa-star"></i>
          ) : hasHalfStar && index === filledStars ? (
            <i style={{ color }} className="fas fa-star-half-alt"></i>
          ) : (
            <i style={{ color }} className="far fa-star"></i>
          )}
        </span>
      ))}
      <span>{text && text}</span>
    </div>
  );
}

export default Rating
