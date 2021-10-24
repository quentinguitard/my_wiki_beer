import React from 'react';
import './CloseModalButton.scss';

export default function CloseModalButton({ action }) {
  return (
    <button
      className="close--modal-button"
      type="button"
      onClick={() => {
        action(false);
      }}
    >
      <i className="fas fa-times icon" />
    </button>
  );
}
