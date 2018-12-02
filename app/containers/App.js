import * as React from 'react';
import Layout from './Layout';
import '../app.global.css';

const App = props => {
  const { children } = props;

  return (
    <div className="app-content">
      <Layout />
    </div>
  );
};

export default App;
