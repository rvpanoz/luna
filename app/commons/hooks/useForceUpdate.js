/**
 * useForceUpdate hook
 * force functional component to render
 */

import { useState } from 'react';

const MAX_NUMBER = Number.MAX_SAFE_INTEGER - 1;

const useForceUpdate = () => {
  const [counter, setCounter] = useState(0);

  setCounter((counter + 1) % MAX_NUMBER);

  return counter;
};

export default useForceUpdate;
