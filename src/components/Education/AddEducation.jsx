import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

const AddForm = () => {
  const [formData, setFormData] = useState({
    nom: "",
    organisateur: "",
    description: "",
    lieu: "",
    placesDisponibles: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const refreshPage = () => {
    window.location.reload();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8099/evenements/add", {
        // Replace with your backend server URL if it's different
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        const result = await response.json();
        console.log(result);
        alert("Event added successfully!");
        refreshPage();
      } else {
        console.error("Error adding event:", response.statusText);
        alert("Failed to add event.");
      }
    } catch (error) {
      console.error("There was an error:", error);
      alert("Failed to add event.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Ajouter un événement
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Organisateur"
          name="organisateur"
          value={formData.organisateur}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={4}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Lieu"
          name="lieu"
          value={formData.lieu}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Places Disponibles"
          name="placesDisponibles"
          type="number"
          value={formData.placesDisponibles}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: "1rem" }}
        >
          Ajouter
        </Button>
      </form>
    </Container>
  );
};

export default AddForm;
