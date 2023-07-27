import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export const Checkout = () => {
  const { cartItems, clear, totalPurchase } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });

  const [orderId, setOrderId] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (orderId) {
      handleShowModal();
    }
  }, [orderId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    if (email !== confirmEmail) {
      setShowError(true);
      return;
    }
    e.preventDefault();
    const order = {
      buyer: {
        name: formData.name,
        phone: formData.phoneNumber,
        email: formData.email,
      },
      items: cartItems.map((item) => ({
        name: item.name,
        price: item.totalPrice,
      })),
      total: totalPurchase,
    };

    const db = getFirestore();
    const orderCollection = collection(db, "orders");

    addDoc(orderCollection, order)
      .then(({ id }) => {
        setOrderId(id);
        handleShowModal();
        setOrderData({
          id,
          buyer: { ...formData },
          items: cartItems.map((item) => ({ ...item })),
          total: totalPurchase,
        });
      })
      .catch((error) => console.error("Error al enviar la orden:", error));
    handleShowModal();

    clear();
    setFormData({
      name: "",
      phoneNumber: "",
      email: "",
    });
  };

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group">
            {cartItems.map((item) => (
              <li key={item.id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <h5>{item.name}</h5>
                  <p>
                    - Quantity: {item.quantity} - Price: {item.totalPrice} ETH
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <h5>Total purchase: {totalPurchase} ETH</h5>
          </div>
        </>
      )}
      <div className="mt-3">
        <h2>Buyer's information</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPhoneNumber">
            <Form.Label>Telephone Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingresa tu número de teléfono"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formConfirmEmail">
            <Form.Label>Email Confirmation</Form.Label>
            <Form.Control
              type="email"
              placeholder="Confirme su correo electrónico"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              required
            />
          </Form.Group>
          {showError && (
            <p style={{ color: "red" }}>
              The emails do not match. Please check.
            </p>
          )}
          <Button variant="primary" type="submit">
            Send Order
          </Button>
        </Form>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orderData && (
            <>
              <p>Order ID: {orderData.id}</p>
              <p>Name: {orderData.buyer.name}</p>
              <p>Telephone: {orderData.buyer.phoneNumber}</p>
              <p>Email: {email}</p>
              <h5>Products:</h5>
              <ul>
                {orderData.items.map((item) => (
                  <li key={item.id}>
                    {item.name} - Quantity: {item.quantity} - Price:{" "}
                    {item.totalPrice} ETH
                  </li>
                ))}
              </ul>
              <h5>Total purchase: {orderData.total} ETH</h5>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
