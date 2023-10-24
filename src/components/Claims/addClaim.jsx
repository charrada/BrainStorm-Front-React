import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function AddClaim() {
  const [claim, setClaim] = useState({
    claimMail: "",
    claimTitle: "",
    claimDetails: "",
    claimRating: 0,
  });

  const [show, setShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedRating, setSelectedRating] = useState(0); // Track the selected rating

  const handleClose = () => setShow(false);
  const handleShow = (message) => {
    setModalMessage(message);
    setShow(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (claim.claimMail && claim.claimTitle && claim.claimDetails) {
      if (claim.claimRating >= 1 && claim.claimRating <= 5) {
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
            // Set the state to clear the input fields
            setClaim({
              claimMail: "",
              claimTitle: "",
              claimDetails: "",
              claimRating: 0,
            });
            // Clear the selected rating as well
            setSelectedRating(0);
          } else {
            handleShow("Failed to add claim.");
          }
        } catch (error) {
          console.error("Error: ", error);
        }
      } else {
        handleShow("You must rate !.");
      }
    } else {
      handleShow("Please fill in all required fields.");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClaim({
      ...claim,
      [name]: name === 'claimRating' ? parseInt(value, 10) : value,
    });
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const className = i <= selectedRating ? "star active" : "star";
      stars.push(
        <span
          key={i}
          className={className}
          data-rating={i}
          onClick={() => handleStarClick(i)}
          style={{
            background: "none",
            border: "none",
            fontSize: "24px", // Adjust the font size as needed
            cursor: "pointer",
            color: "transparent", // Make the button transparent
            textShadow: "0 0 0 gold", // Show the gold color on hover or click
          }}
        >
          ⭐
        </span>
      );
    }
    return stars;
  };

// ... (previous code)

const handleStarClick = (rating, event) => {
  setSelectedRating(rating);
  setClaim({ ...claim, claimRating: rating });
};

// ... (rest of your code)

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Add new claim</h2>
          <form onSubmit={handleSubmit}>
          <br></br>

            <div className="form-group">
              <label htmlFor="claimMail">Email:</label>
              <input
                type="email"
                className="form-control"
                id="claimMail"
                name="claimMail"
                value={claim.claimMail}
                onChange={handleChange}
                required
              />
            </div>
            <br></br>

            <div className="form-group">
              <label htmlFor="claimTitle">Title:</label>
              <input
                type="text"
                className="form-control"
                id="claimTitle"
                name="claimTitle"
                value={claim.claimTitle}
                onChange={handleChange}
                required
              />
            </div>
            <br></br>

            <div className="form-group">
              <label htmlFor="claimDetails">Description:</label>
              <textarea
                className="form-control"
                id="claimDetails"
                name="claimDetails"
                value={claim.claimDetails}
                onChange={handleChange}
                required
              />
            </div>
            <br></br>

            <div className="form-group">
              <div className="star-rating"> Rating [{selectedRating}] : {renderStars()}</div>
            </div>
            <br></br>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>

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
