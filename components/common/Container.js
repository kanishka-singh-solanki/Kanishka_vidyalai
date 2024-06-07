// import React from 'react';
// import useWindowWidth from '../hooks/useWindowWidth';
import React, { useContext } from 'react';                          // Task7
import { WindowWidthContext } from '../hooks/WindowWidthContext';   // Task7

export default function Container({ children }) {
  
  // Task7
  // const { isSmallerDevice } = useWindowWidth();
  const { isSmallerDevice } = useContext(WindowWidthContext);
  // Task7

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <div style={{ width: isSmallerDevice ? '95%' : '85%' }}>{children}</div>
    </div>
  );
}
