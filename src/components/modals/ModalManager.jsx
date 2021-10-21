import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import BeerModal from './BeerModal/BeerModal';
import useComponentVisible from '../../hooks/useComponentVisible';

export default function ModalManager() {
  const display = useSelector((state) => state.display);

  return <div>{display.beerModal && <BeerModal />}</div>;
}
