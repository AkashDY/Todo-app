import React from "react";

export default function Modal(props) {
  return (
    <div className={`modal ${props.modalOpen ? "modal-open" : ""}`}>
      <div className="modal-box relative">
        <label
          onClick={() => {
            props.setModalOpen(false);
          }}
          htmlFor="my-modal-3"
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          x
        </label>
        {props.children}
      </div>
    </div>
  );
}
