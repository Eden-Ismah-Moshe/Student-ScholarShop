import React, { Fragment, useState } from "react";
import "../styles/Modal.css";
import { addUserEmailToProduct } from "../services/ProductsAPI";

const Modal = ({ productId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault(); // Prevents the form from reloading the page (prevent the default behavior of an event from happening.)
    setIsSubmitting(true);

    // Add user email to product
    await addUserEmailToProduct(productId, email);

    setIsSubmitting(false);
    setEmail("");
    setIsModalOpen(false);
  };

  if (!isModalOpen)
    return (
      <button className="track-button" onClick={() => setIsModalOpen(true)}>
        Track
      </button>
    );
  return (
    <>
      <button className="track-button" onClick={() => setIsModalOpen(true)}>
        Track
      </button>
      <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button
            className="modal-close-btn"
            onClick={() => setIsModalOpen(false)}
          >
            ×
          </button>
          <h2>Stay updated with product pricing alerts right in your inbox!</h2>
          <p>Never miss a bargain again with our timely alerts!</p>

          <form onSubmit={handelSubmit}>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
            <button type="submit" className="track-btn">
              {isSubmitting ? "Submitting..." : "Track"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
