import React from 'react';
import './BackgroundBeer.scss';
import { useSelector } from 'react-redux';

export default function BackgroundBeer() {
  const pageNbr = useSelector((state) => state.pageNumber);

  return (
    <div className="background-beer">
      <div className={`beer-fill size-${pageNbr}`} />
    </div>
  );
}
