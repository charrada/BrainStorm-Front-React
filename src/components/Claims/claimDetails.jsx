import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";

function ClaimDetails() {
  // Access the claimId parameter from the URL
  const { claimId } = useParams();
  const [claim, setClaim] = useState(null);


  function formatDate(dateString) {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  
  useEffect(() => {
    // Fetch the claim details using the claimId
    fetch(`http://localhost:8090/claim/getClaimById/${claimId}`)
      .then((response) => response.json())
      .then((data) => setClaim(data))
      .catch((error) => {
        console.error("Error fetching claim details: ", error);
      });
  }, [claimId]);

  if (!claim) {
    // Handle the case when claim is not loaded yet
    return <div>Loading...</div>;
  }

  return (
    <div className="container text-center mt-2">
      
      <h1>Claim Details</h1>
      <br />
      <br />
      <Table striped bordered hover responsive="sm" className="mx-auto" style={{ maxWidth: "600px" }}>
        <tbody>
          <tr>
            <th>ID</th>
            <td>{claim.idClaim}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{claim.claimMail}</td>
          </tr>
          <tr>
            <th>Title</th>
            <td>{claim.claimTitle}</td>
          </tr>
          <tr>
            <th>Details</th>
            <td>{claim.claimDetails}</td>
          </tr>
          <tr>
            <th>Claim Date</th>
            <td>{formatDate(claim.claimDate)}</td>
          </tr>
          <tr>
            <th>Claim Rating</th>
            <td>{claim.claimRating}⭐</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default ClaimDetails;
