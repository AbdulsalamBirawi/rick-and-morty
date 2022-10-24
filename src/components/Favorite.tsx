import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { selectfavourite } from "../app/features/favouriteReducer";
import CharactersCard from "./CharactersCard";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { Button, CircularProgress } from "@mui/material";

const Favorite = () => {
  const favourite = useSelector(selectfavourite);
  const fetchCharacters = async ({ queryKey }: any) => {
    const response = await axios(
      `https://rickandmortyapi.com/api/character/${favourite.join(",")}`
    );
    return response.data;
  };
  const { data, status, isPreviousData } = useQuery(
    ["fav-characters"],
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
    <Box my={3}>
      <Box my={5}>
        <Button href="/">back to characters</Button>
      </Box>
      <Grid container spacing={2}>
        {data.map((character: any) => (
          <Grid item md={6} xl={6}>
            <CharactersCard character={character} favorite={false} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Favorite;
