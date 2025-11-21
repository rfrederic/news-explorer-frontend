import "./ModalWithForm.css";
import close__btn from "../../assets/close.svg";

function ModalWithForm({
  children,
  title,
  isOpen,
  onClose,
  onSubmit,
  submitText,
  secondary,
}) {
  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={(e) => e.target.classList.contains("modal") && onClose()}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} type="button" className="modal__close-btn">
          <img src={close__btn} alt="Close form" />
        </button>

        <form onSubmit={onSubmit} className="modal__form">
          <h2 className="modal__title">{title}</h2>

          {children}

          <button type="submit" className="modal__submit-btn">
            {submitText}
          </button>

          {secondary && <div className="modal__secondary">{secondary}</div>}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
