import React, { useState } from 'react';

const useFlags = selected => {
  const [flags, setFlags] = useState([]);

  return flags;
};

export default useFlags;
