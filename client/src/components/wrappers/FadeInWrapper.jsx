import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Import Styles:
import './FadeInWrapper.scss';

/**
 * Provides a smooth fade-in animation to its child elements
 */
const FadeInWrapper = ({ children }) => {
  const key = new Date().getTime();

  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true);
    // Optionally reset fade on route change
    return () => setFade(false);
  }, []);

  return (
    <div key={key} className={fade ? 'fadeIn' : ''}>
      {children}
    </div>
  );
};

// Prop Types:
FadeInWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FadeInWrapper;
