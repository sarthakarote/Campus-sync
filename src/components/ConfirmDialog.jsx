/* Confirm dialog used before destructive actions. Confirm uses the danger
   button; Cancel keeps everything unchanged. */

import Modal from './Modal.jsx'

export default function ConfirmDialog({
  message,
  confirmLabel = 'Confirm',
  isOpen,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal title="Please confirm" isOpen={isOpen} onClose={onCancel}>
      <p>{message}</p>
      <div className="modal__actions">
        <button className="btn btn--secondary" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn--danger" onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}