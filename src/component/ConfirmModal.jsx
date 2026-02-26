import React from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({
  title = 'Are you sure?',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}) => (
  <div className='confirm-overlay' role='dialog' aria-modal='true' aria-labelledby='confirm-title'>
    <div className='confirm-modal'>
      <h2 className='confirm-modal-title' id='confirm-title'>{title}</h2>
      {message && <p className='confirm-modal-body'>{message}</p>}
      <div className='confirm-modal-actions'>
        <button className='confirm-modal-cancel' onClick={onCancel}>
          {cancelLabel}
        </button>
        <button className='confirm-modal-confirm' onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmModal;
