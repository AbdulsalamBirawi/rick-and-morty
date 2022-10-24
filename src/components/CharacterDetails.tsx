import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { Button, CardMedia, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Card from "@mui/material/Card";

const CharacterDetails = () => {
  const { id } = useParams();
  // const [fetchedData, updateFetchedData] = useState([]);
  // const { name, location, origin, gender, image, status, species }: any =
  //   fetchedData;

  const api = `https://rickandmortyapi.com/api/character/${id}`;
  const fetchCharacters = async ({ queryKey }: any) => {
    const response = await axios(api);
    return response.data;
  };
  const { data, status, isPreviousData } = useQuery(
    ["ditale-characters"],
    fetchCharacters
  );
  if (status === "loading") {
    return (
      <CircularProgress
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        color="inherit"
      />
    );
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <Box>
      <Box mt={2}>
        <Button>
          <Link to="/">back to characters</Link>
        </Button>
      </Box>
      <Card style={{ marginTop: "30px" }}>
        <Box display="flex" m={5} justifyContent="center">
          <Box mr={5}>
            <CardMedia
              component="img"
              sx={{ width: 350 }}
              image={data.image}
              alt="Live from space album cover"
            />
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            ml={5}
          >
            <Typography component="div" variant="h2">
              {data.name}
            </Typography>
            <Typography variant="h4" color="text.secondary" component="div">
              {data.status} - {data.species}
            </Typography>
            <Typography variant="h5" color="text.secondary" component="div">
              Last seen on : {data.location.name}
            </Typography>
            <Typography variant="h5" color="text.secondary" component="div">
              Origin : {data.origin.name}
            </Typography>
            <Typography variant="h6" color="text.secondary" component="div">
              Gender : {data.gender}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default CharacterDetails;
