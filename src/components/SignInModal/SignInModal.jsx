import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./SignInModal.css";

export default function SignInModal({
  isOpen,
  onClose,
  onSignIn,
  onSwitchToSignUp,
}) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignIn(form);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Sign in"
      submitText="Sign in"
      secondary={
        <p className="signin__text">
          or{" "}
          <button
            type="button"
            className="signin__link"
            onClick={onSwitchToSignUp}
          >
            Sign up
          </button>
        </p>
      }
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email"
          required
        />
      </label>

      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
          minLength={6}
        />
      </label>
    </ModalWithForm>
  );
}
