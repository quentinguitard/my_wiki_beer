import React from 'react';
import './Beer.scss';
import { useDispatch } from 'react-redux';
import { displayBeerModal } from '../../redux/actions/display/displayModal.action';

export default function Beer({
  name,
  abv,
  ibu,
  firstBrewed,
  id,
}) {
  const dispatch = useDispatch();
  return (
    <tr className="beer" onClick={() => dispatch(displayBeerModal(id))}>
      <td>{name}</td>
      <td>{`${abv}%`}</td>
      <td>{ibu}</td>
      <td>{firstBrewed}</td>
    </tr>
  );
}
