import React, { useState, useEffect } from "react";
import { Table, InputGroup, FormControl, Pagination } from "react-bootstrap";
import ClaimDetails from "./claimDetails"; // Import the new component
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function AdminClaim() {
  const [claims, setClaims] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [claimsPerPage] = useState(5);
  const [selectedClaim, setSelectedClaim] = useState(null); // State variable for the selected claim

  useEffect(() => {
    // Fetch claims from the backend when the component mounts
    fetch("http://localhost:8090/claim/")
      .then((response) => response.json())
      .then((data) => setClaims(data))
      .catch((error) => {
        console.error("Error fetching claims: ", error);
      });
  }, []);

  // Filter claims based on the search query
  const filteredClaims = claims.filter((claim) =>
    claim.claimMail.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination calculation
  const indexOfLastClaim = currentPage * claimsPerPage;
  const indexOfFirstClaim = indexOfLastClaim - claimsPerPage;
  const currentClaims = filteredClaims.slice(indexOfFirstClaim, indexOfLastClaim);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const navigate = useNavigate(); // Get the navigate function

  // Function to format the date as "day month year"
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDeleteClaim = (idClaim) => {
    if (window.confirm("Are you sure you want to delete this claim?")) {
      fetch(`http://localhost:8090/claim/deleteClaim/${idClaim}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.status === 200) {
            fetchClaims(); // Call the function to fetch claims
          } else {
            // Handle other error conditions
            response.text().then((errorText) => {
              console.error(`Failed to delete claim: ${errorText}`);
            });
          }
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    }
  };

  const handleStatusChange = (idClaim, currentStatus) => {
    if (window.confirm("Are you sure you want to change claim status?")) {
      const newStatus = currentStatus === 0 ? 1 : 0;

      fetch(`http://localhost:8090/claim/updateStatus/${idClaim}?status=${newStatus}`, {
        method: "PUT",
      })
        .then((response) => {
          if (response.status === 200) {
            fetchClaims(); // Call the function to fetch claims
          } else {
            // Handle other error conditions
            response.text().then((errorText) => {
              console.error(`Failed to update claim status: ${errorText}`);
            });
          }
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    }
  };

  const handleDetailsClick = (claim) => {
    // Navigate to the claim details page using the claim ID
    navigate(`/claim/details/${claim.idClaim}`);
  };

  const fetchClaims = () => {
    fetch("http://localhost:8090/claim/")
      .then((response) => response.json())
      .then((data) => setClaims(data))
      .catch((error) => {
        console.error("Error fetching claims: ", error);
      });
  };

  return (
    <div className="container text-center mt-2">
      <h1>List of Claims</h1>
      <br></br>

      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search by Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>

      <Table striped bordered hover responsive="sm" className="mx-auto">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Title</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentClaims.map((claim) => (
            <tr key={claim.idClaim}>
              <td>{claim.idClaim}</td>
              <td>{claim.claimMail}</td>
              <td>{claim.claimTitle}</td>
              <td>
                <button
                  className={claim.status === 1 ? "btn btn-success" : "btn btn-secondary"}
                  onClick={() => handleStatusChange(claim.idClaim, claim.status)}
                >
                  {claim.status === 0 ? "Unprocessed" : "Processed"}
                </button>
              </td>
              <td>
                <button className="btn btn-primary" onClick={() => handleDetailsClick(claim)}>
                  Details
                </button>
                &nbsp;
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteClaim(claim.idClaim)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedClaim && <ClaimDetails claim={selectedClaim} />}

      <Pagination className="justify-content-center">
        {Array.from(
          { length: Math.ceil(filteredClaims.length / claimsPerPage) },
          (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>
    </div>
  );
}

export default AdminClaim;
