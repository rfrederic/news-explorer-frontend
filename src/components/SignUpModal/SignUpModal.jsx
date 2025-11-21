import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./SignUpModal.css";

export default function SignUpModal({
  isOpen,
  onClose,
  onSignUp,
  onSwitchToSignIn,
}) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp?.(form);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Sign up"
      submitText="Sign up"
      secondary={
        <p className="signin__text">
          or{" "}
          <button
            type="button"
            className="signin__link"
            onClick={onSwitchToSignIn}
          >
            Sign in
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
        />
      </label>

      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
      </label>
    </ModalWithForm>
  );
}
