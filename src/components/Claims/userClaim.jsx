import React, { useState, useEffect } from "react";
import { Table, InputGroup, FormControl, Pagination } from "react-bootstrap";
import ClaimDetails from "./claimDetails";
import { useNavigate } from "react-router-dom";

function UserClaim() {
  const [claims, setClaims] = useState([]);
  const [search, setSearch] = useState("ahla"); // Set the default email
  const [currentPage, setCurrentPage] = useState(1);
  const [claimsPerPage] = useState(5);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [loading, setLoading] = useState(false); // Track loading state

  const navigate = useNavigate();

  useEffect(() => {
    if (search) {
      // Fetch claims from the backend only when there's a search query
      setLoading(true); // Set loading to true
      fetch(`http://localhost:8090/claim/?searchEmail=${search}`)
        .then((response) => response.json())
        .then((data) => setClaims(data))
        .catch((error) => {
          console.error("Error fetching claims: ", error);
        })
        .finally(() => {
          setLoading(false); // Set loading back to false when done
        });
    } else {
      // Clear the claims when the search query is empty
      setClaims([]);
    }
  }, [search]); // Watch the search query for changes

  const filteredClaims = claims.filter((claim) =>
    claim.claimMail.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastClaim = currentPage * claimsPerPage;
  const indexOfFirstClaim = indexOfLastClaim - claimsPerPage;
  const currentClaims = filteredClaims.slice(indexOfFirstClaim, indexOfLastClaim);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDetailsClick = (claim) => {
    navigate(`/claim/details/${claim.idClaim}`);
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
          {loading ? ( // Display a loading message while fetching data
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          ) : currentClaims.length === 0 ? ( // Display a message when no data is found
            <tr>
              <td colSpan="5">No claims found</td>
            </tr>
          ) : (
            currentClaims.map((claim) => (
              <tr key={claim.idClaim}>
                <td>{claim.idClaim}</td>
                <td>{claim.claimMail}</td>
                <td>{claim.claimTitle}</td>
                <td>
                  <button
                    className={
                      claim.status === 1 ? "btn btn-success" : "btn btn-secondary"
                    }
                  >
                    {claim.status === 0 ? "Unprocessed" : "Processed"}
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleDetailsClick(claim)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

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

export default UserClaim;
