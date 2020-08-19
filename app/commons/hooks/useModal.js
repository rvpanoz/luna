import { useState } from 'react';

export const useModal = (initialMode = false) => {
  const [modalOpen, setModalOpen] = useState(initialMode);
  const toggle = () => setModalOpen(!modalOpen);

  return [modalOpen, setModalOpen, toggle];
};
