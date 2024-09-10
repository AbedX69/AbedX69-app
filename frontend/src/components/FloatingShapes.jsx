import React, { useState, useEffect } from 'react';
import './FloatingShapes.css';

const FloatingShapes = () => {
  const [shapes, setShapes] = useState([]);

  // Softer color palette for dynamic color changes
  const colors = ['#f3a683', '#778beb', '#f7d794', '#e77f67', '#cf6a87', '#786fa6'];

  // Generate multiple random shapes (circle, square, triangle)
  useEffect(() => {
    const generateShapes = () => {
      const shapeArray = [];
      for (let i = 0; i < 15; i++) { // 15 shapes
        const shapeType = Math.random() < 0.33 ? 'square' : Math.random() < 0.66 ? 'circle' : 'triangle'; // Random shape type
        const size = Math.floor(Math.random() * 50) + 30; // Random size between 30px and 80px
        const top = Math.random() * 80; // Random top position (limit to 80% to avoid bottom overlap)
        const left = Math.random() * 80; // Random left position (limit to 80% to avoid right overlap)
        const duration = Math.random() * 10 + 6; // Random animation duration between 6s and 16s
        const color = colors[Math.floor(Math.random() * colors.length)]; // Random initial color

        shapeArray.push({
          id: i,
          type: shapeType,
          size,
          top,
          left,
          duration,
          color,
        });
      }
      setShapes(shapeArray);
    };

    generateShapes();
  }, []);

  // Change color dynamically every 3 seconds
  useEffect(() => {
    const changeColorInterval = setInterval(() => {
      setShapes((prevShapes) =>
        prevShapes.map((shape) => ({
          ...shape,
          color: colors[Math.floor(Math.random() * colors.length)], // Assign random color
        }))
      );
    }, 3000); // Change color every 3 seconds

    return () => clearInterval(changeColorInterval); // Cleanup on unmount
  }, [colors]);

  return (
    <div className="shapes-container">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={`shape ${shape.type} float`}
          style={{
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            top: `${shape.top}%`,
            left: `${shape.left}%`,
            animationDuration: `${shape.duration}s`,
            borderColor: shape.color, // Apply the color to the border for squares and circles
            backgroundColor: shape.type === 'circle' ? `${shape.color}` : 'transparent', // Circles get background color, others are transparent
          }}
        >
          {shape.type === 'triangle' && (
            <svg
              width={`${shape.size}px`}
              height={`${shape.size}px`}
              viewBox="0 0 30 30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                fill="none"
                stroke={shape.color} // Apply the color to the triangle stroke
                strokeWidth="2px"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                points="15,5 25,25 5,25"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

export default FloatingShapes;
