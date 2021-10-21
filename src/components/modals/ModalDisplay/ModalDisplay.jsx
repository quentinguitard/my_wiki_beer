import React from 'react';
import './ModalDisplay.scss';

export default function ModalDisplay({ children }) {
  return (
    <div className="modals--display">
      <div className="_modal">
        {children}
      </div>
    </div>
  );
}
