import React from 'react';

const App = ({ Component, pageProps }) => (

  // Task7
  // <React.Fragment>
    <WindowWidthProvider>
    <Component {...pageProps} />
    </WindowWidthProvider>
  // </React.Fragment> 
  // Task7

);

export default App;
