import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ClaimDetails() {
  // Access the claimId parameter from the URL
  const { claimId } = useParams();
  const [claim, setClaim] = useState(null);

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
      <div>
        <h3>ID: {claim.idClaim}</h3>
        <p>Email: {claim.claimMail}</p>
        <p>Title: {claim.claimTitle}</p>
        <p>Status: {claim.status === 0 ? "Unprocessed" : "Processed"}</p>
        <p>Claim Date: {claim.claimDate}</p>
        <p>Claim Rating: {claim.claimRating}</p>
      </div>
    </div>
  );
}

export default ClaimDetails;
