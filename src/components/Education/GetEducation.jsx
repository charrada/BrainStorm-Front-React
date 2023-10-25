// EducationList.js
import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  Button,
  CardActions,
} from "@mui/material";
import EditEventDialog from "./editEducation";

const EducationList = (props) => {
  const [educationData, setEducationData] = useState(props.educationList);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  // console.log(props.educationList)

  // useEffect(() => {
  //   fetch("http://localhost:8099/evenements/getAll")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setEducationData(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error fetching the education data:", error);
  //       setLoading(false);
  //     });
  // }, []);

  const handleUpdate = (updatedEvent) => {
    // Check if updatedEvent has a valid ID
    if (updatedEvent.id === null || updatedEvent.id === undefined) {
      console.error("Invalid ID for updating event:", updatedEvent);
      return; // Do not proceed with the update
    }

    fetch(`http://localhost:8099/evenements/update/${updatedEvent.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    })
      .then((response) => response.json())
      .then((data) => {
        setEducationData((prevData) =>
          prevData.map((item) => (item.id === data.id ? data : item))
        );
        setEditDialogOpen(false);
      })
      .catch((error) => {
        console.error("There was an error updating the item:", error);
      });
  };
  const handleEdit = (event) => {
    // Make a GET request to fetch the education event by its ID
    fetch(`http://localhost:8099/evenements/getById/${event.id}`)
      .then((response) => response.json())
      .then((data) => {
        // Check if data is not null or undefined
        if (data) {
          setCurrentEvent(data); // Set the currentEvent with the fetched data
          setEditDialogOpen(true); // Open the edit dialog
        } else {
          console.error("Education event not found by ID:", event.id);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the event by ID:", error);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8099/evenements/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setEducationData((prevData) =>
            prevData.filter((item) => item.id !== id)
          );
        }
      })
      .catch((error) => {
        console.error("There was an error deleting the item:", error);
      });
  };

  // if (loading) {
  //   return (
  //     <Container
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "100vh",
  //       }}
  //     >
  //       <CircularProgress />
  //     </Container>
  //   );
  // }

  if(props.educationList){
    return (
      <Container component="main" maxWidth="md">
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Education List
        </Typography>
        <List>
          {props.educationList.map((item) => (
            <ListItem key={item.id}>
              <Card variant="outlined" style={{ width: "100%" }}>
                <CardHeader title={item.nom} />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {item.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {item.nom}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {item.organisateur}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {item.lieu}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {item.placesDisponibles}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button color="primary" onClick={() => handleEdit(item)}>
                    Edit
                  </Button>
                  <Button color="secondary" onClick={() => handleDelete(item.id)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </ListItem>
          ))}
        </List>
        <EditEventDialog
          open={editDialogOpen}
          event={currentEvent}
          onClose={() => setEditDialogOpen(false)}
          onUpdate={handleUpdate}
        />
      </Container>
    );
  }else{
    return (
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <CircularProgress />
      </Container>
    );
  }
  
};

export default EducationList;
