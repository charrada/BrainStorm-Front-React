import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function AddClaim() {
  const [claim, setClaim] = useState({
    claimMail: "",
    claimTitle: "",
    claimDetails: "",
  });

  const [show, setShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (message) => {
    setModalMessage(message);
    setShow(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (claim.claimMail && claim.claimTitle && claim.claimDetails) {
      try {
        const response = await fetch("http://localhost:8090/claim/addClaim", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(claim),
        });

        if (response.status === 200) {
          handleShow("Claim added successfully.");
          setClaim({
            claimMail: "",
            claimTitle: "",
            claimDetails: "",
          });
        } else {
          handleShow("Failed to add claim.");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    } else {
      handleShow("Please fill in all required fields.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClaim({
      ...claim,
      [name]: value,
    });
  };

  return (
    <div className="container mt-5">
      <h2>Add new claim</h2> {/* Added title */}
      <br /><br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="claimMail">Claim Mail:</label>
          <input
            type="email"
            className="form-control"
            id="claimMail"
            name="claimMail"
            value={claim.claimMail}
            onChange={handleChange}
            required // Make the field required
          />
          <br />
        </div>
        <div className="form-group">
          <label htmlFor="claimTitle">Title:</label>
          <input
            type="text"
            className="form-control"
            id="claimTitle"
            name="claimTitle"
            value={claim.claimTitle}
            onChange={handleChange}
            required // Make the field required
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="claimDetails">Description:</label>
          <textarea
            className="form-control"
            id="claimDetails"
            name="claimDetails"
            value={claim.claimDetails}
            onChange={handleChange}
            required // Make the field required
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Claim Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddClaim;
