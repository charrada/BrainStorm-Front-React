import { useEffect, useState } from "react";
import EducationList from "./GetEducation";
import AddEducation from "./AddEducation";
import {
  TextField,
  InputAdornment,
  Grid,
  Container,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [filteredEducationList, setFilteredEducationList] = useState([]);
  const [searchResult, setSearchResult] = useState(null); // To store the search result
  const [allData, setAllData] = useState(null);
  const [sortedData, setSortedData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = async () => {
    // Clear previous search results and errors
    setSearchResult(null);
    setFilteredEducationList([]);
    setError(null);

    // Send a GET request to the backend endpoint for searching by search criteria
    // fetch(`http://localhost:8099/evenements/searchByName?nom=${search}`)
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     if (data.length > 0) {
    //       setSearchResult(data[0]); // Store the first result if found
    //     } else {
    //       setSearchResult(null); // No result found
    //     }
    //     setFilteredEducationList(data); // Update the list with the response data
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching searched data:", error);
    //     setError(error.message); // Store the error message
    //   });
    await axios.get(`http://localhost:8099/evenements/searchByName?nom=${search}`).then(
      (res) => setSearchResult(res.data)
    ).catch(
      (error) => console.log(error)
    )
  };

  const fetchAllData = async () => {
    await axios.get("http://localhost:8099/evenements/getAll").then(
      (res) => {}
    ).catch(
      (error) => setAllData(error.response.data)
    )
  }

  const fetchSorted = async () => {
    await axios.get("http://localhost:8099/evenements/getEventsSortedByPlaces").then(
      (res) => {setSortedData(res.data)}
    ).catch(
      (error) => console.log(error)
    )
  }

  const fetchSortedDSC = async () => {
    await axios.get("http://localhost:8099/evenements/getEventsSortedByPlacesDesc").then(
      (res) => {setSortedData(res.data)}
    ).catch(
      (error) => console.log(error)
    )
  }

  useEffect(() => {
    fetchAllData();
  },[]);

  // console.log(allData);
  return (
    <Container>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearchClick}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Button variant="contained" onClick={fetchSorted}>ASC</Button>
      <Button variant="contained" onClick={fetchSortedDSC}>DSC</Button>
      <AddEducation />
      {/* Conditionally render the EducationList based on searchResult */}
      {searchResult ? (
        <EducationList educationList={searchResult} />
      ) : (
        sortedData ? (
          <EducationList educationList={sortedData} />
        ): (
          <EducationList educationList={allData} />
        )
        
      )}
    </Container>
  );
}

export default App;
