import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import {
  addfavourite,
  selectfavourite,
  removeFromFavourite,
} from "../app/features/favouriteReducer";
const CharactersCard = ({ character, favorite }: any) => {
  const theme = useTheme();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const fav = useSelector(selectfavourite);
  const dispatch = useDispatch();
  return (
    <Card
      sx={{ display: "flex" }}
      onClick={() => {
        if (favorite == false) {
          dispatch(removeFromFavourite(character.id));
        }
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={character.image}
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Link to={`${character.id}`} style={{ textDecoration: "none" }}>
            <Typography component="div" variant="h5">
              {character.name}
            </Typography>
          </Link>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {character.status} - {character.species}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Last seen on : {character.location.name}
          </Typography>
          <Checkbox
            style={{ display: favorite == false ? "none" : "" }}
            onChange={(e) => {
              if (e.target.checked) {
                dispatch(addfavourite(character.id));
              } else {
                dispatch(removeFromFavourite(character.id));
              }
            }}
            {...label}
            checked={fav.includes(character.id)}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
          />
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}></Box>
      </Box>
    </Card>
  );
};

export default CharactersCard;
