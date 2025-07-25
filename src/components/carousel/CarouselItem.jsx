import React from 'react';

const CarouselItem = ({ text }) => {
  return (
    <div style={{ padding: "1em 3em" }}>
      <h3 className="carousel-item text-primary" style={{ textAlign: 'center', margin: 0 }}>
        {text}
      </h3>
    </div>
  );
};

export default CarouselItem;