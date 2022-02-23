import React from 'react';
import PropTypes from 'prop-types';

function ArcHeading({ text, arc, radius }) {
  const characters = text.split('');
  const degree = arc / characters.length;

  return (
    <h5>
      {characters.map((char, index) => (
        <span
          key={`heading-span-${index}`}
          style={{
            height: `${radius}px`,
            transform: `rotate(${degree * index - arc / 2}deg)`,
            transformOrigin: `0 ${radius}px 0`,
          }}>
          {char}
        </span>
      ))}
    </h5>
  );
}

ArcHeading.propTypes = {
  text: PropTypes.string.isRequired,
  arc: PropTypes.number, // how curved do you want the text
  radius: PropTypes.number, // how big do you want the curve
};

ArcHeading.defaultProps = {
  arc: 120,
  radius: 400,
};

export default ArcHeading;
