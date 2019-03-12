import React, { useState, useEffect } from 'react';

const useFlags = selected => {
  console.log(selected);
  const [flags, setFlags] = useState([]);

  useEffect(() => {}, [selected]);

  return [flags];
};

export default useFlags;
