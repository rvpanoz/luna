/**
 * useForceUpdate hook
 * force functional component to render
 */

import { useState } from 'react';

const MAX_NUMBER = Number.MAX_SAFE_INTEGER - 1;

const useForceUpdate = () => {
  const [counter, setCounter] = useState(0);

  const forceUpdate = setCounter((counter + 1) % MAX_NUMBER);

  return forceUpdate;
};

export default useForceUpdate;
