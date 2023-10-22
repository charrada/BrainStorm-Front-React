import React, { useState, useEffect } from "react";
import { Table, InputGroup, FormControl, Pagination } from "react-bootstrap";

function AdminClaim() {
  const [claims, setClaims] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [claimsPerPage] = useState(10);

  useEffect(() => {
    fetch("http://localhost:8090/claim/") // Specify the correct API endpoint
      .then((response) => response.json())
      .then((data) => setClaims(data));
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

  // Function to format the date as "day month year"
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container text-center mt-4">
      <h1>List of Claims</h1>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search by Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>
      <Table striped bordered hover responsive="lg" className="mx-auto">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Title</th>
            <th>Details</th>
            <th>Status</th>
            <th>Date</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {currentClaims.map((claim) => (
            <tr key={claim.idClaim}>
              <td>{claim.idClaim}</td>
              <td>{claim.claimMail}</td>
              <td>{claim.claimTitle}</td>
              <td>{claim.claimDetails}</td>
              <td>{claim.status}</td>
              <td>{formatDate(claim.claimDate)}</td>
              <td>⭐{claim.claimRating}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="justify-content-center">
        {Array.from({ length: Math.ceil(filteredClaims.length / claimsPerPage) }, (_, i) => (
          <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}

export default AdminClaim;
