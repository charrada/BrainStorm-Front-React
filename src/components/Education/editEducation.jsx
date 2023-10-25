// EditEventDialog.js
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";

const EditEventDialog = ({ open, event, onClose, onUpdate }) => {
  // Provide a default value for editedEvent to prevent errors
  const [editedEvent, setEditedEvent] = useState(event || {});

  useEffect(() => {
    // Update the editedEvent when the event prop changes
    setEditedEvent(event || {});
  }, [event]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({
      ...editedEvent,
      [name]: value,
    });
  };

  const handleUpdateClick = () => {
    onUpdate(editedEvent);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Event</DialogTitle>
      <DialogContent>
        <TextField
          label="Event Name"
          name="nom"
          value={editedEvent.nom || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Event Description"
          name="description"
          value={editedEvent.description || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Organizer"
          name="organisateur"
          value={editedEvent.organisateur || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Event Location"
          name="lieu"
          value={editedEvent.lieu || ""}
          onChange={handleInputChange}
          fullWidth
        />
        {/* Add more fields as needed */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdateClick} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditEventDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  event: PropTypes.shape({
    id: PropTypes.number,
    nom: PropTypes.string,
    description: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

export default EditEventDialog;
