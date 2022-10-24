import React from "react";
import logo from "./logo.svg";
import { QueryClient, QueryClientProvider } from "react-query";
import Characters from "./components/Characters";
import { Container } from "@mui/system";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CharacterDetails from "./components/CharacterDetails";
import Favorite from "./components/Favorite";

function App() {
  const queryClient = new QueryClient();
  return (
    <Container>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Characters />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/:id" element={<CharacterDetails />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Container>
  );
}

export default App;
