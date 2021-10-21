import React from 'react';
import { useSelector } from 'react-redux';
import BeerModal from './BeerModal/BeerModal';

export default function ModalManager() {
  const display = useSelector((state) => state.display);

  return <div>{display.beerModal && <BeerModal />}</div>;
}
