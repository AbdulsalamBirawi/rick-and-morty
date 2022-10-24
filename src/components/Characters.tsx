import React, { useState } from "react";
import { useQuery } from "react-query";
import CharactersCard from "./CharactersCard";
import axios from "axios";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
const Characters = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const fetchCharacters = async ({ queryKey }: any) => {
    const response = await axios(
      `https://rickandmortyapi.com/api/character?page=${queryKey[1]}&name=${search}`
    );
    return response.data;
  };
  const { data, status, isPreviousData } = useQuery(
    ["characters", page],
    fetchCharacters,
    {
      keepPreviousData: true,
    }
  );
  let searchBtn = (e: any) => {
    e.preventDefault();
  };
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
    <div>
      <Box mt={2}>
        <Button>
          <Link style={{ textDecoration: "none" }} to="favorite">
            favorite
          </Link>
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" my={3}>
        <TextField
          id="outlined-basic"
          label="Search for characters"
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: "10px" }}
          size="small"
        />
        <Button variant="text" onClick={searchBtn}>
          search
        </Button>
      </Box>
      <Grid container spacing={2}>
        {data.results.map((character: any) => (
          <Grid item md={6} xl={6}>
            <CharactersCard character={character} />
          </Grid>
        ))}
      </Grid>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        mt={2}
      >
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
          <Button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            prev
          </Button>
          <Button
            onClick={() => setPage((old) => old + 1)}
            disabled={!data.info.next}
          >
            next
          </Button>
        </ButtonGroup>
      </Box>
    </div>
  );
};

export default Characters;
