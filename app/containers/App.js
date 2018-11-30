import * as React from 'react';

const App = props => {
  const { children } = props;

  return <React.Fragment>{children}</React.Fragment>;
};

export default App;
