import { useEffect, useRef } from "react";
import "./modal.css"

export default function Modal({ openModal, closeModal, title, children }) {
    console.log('Render Modal');
  const ref = useRef();

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  document.addEventListener("mousedown", event => event.target.className === 'modal-dialog' && closeModal());

  return (
    <dialog key='modal-dialog' className="modal-dialog" ref={ref} onCancel={closeModal}>
      <div key='modal' className="modal">
        <div key='header' className="modal-header">
          {title}
        </div>
        <div key='content' className="modal-content">
          {children}
        </div>
        <div key='footer' className="modal-footer">
          <button className="modal-button" onClick={closeModal}>
            Stäng
          </button>
        </div>
      </div>
    </dialog>
  );
}