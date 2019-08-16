/* eslint-disable object-shorthand */
/* eslint-disable react/state-in-constructor */

import React from 'react';
import { Component, createFactory } from 'react';

const withErrorBoundary = BaseComponent => {
  const factory = createFactory(BaseComponent);

  return class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null, errorInfo: null };
    }

    componentDidCatch(error, info) {
      this.setState({ hasError: true, errorInfo: info, error: error });
      console.error('componentDidCatch() :: ', error, info);
    }

    render() {
      const { hasError, error, errorInfo } = this.state;
      const props = {
        ...this.props
      };

      if (hasError) {
        return (
          <div style={{ padding: 20 }}>
            <h2>Something went wrong.</h2>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {error && error.toString()}
              <br />
              {errorInfo.componentStack}
            </details>
          </div>
        );
      }

      return factory({
        ...props
      });
    }
  };
};

export default withErrorBoundary;
