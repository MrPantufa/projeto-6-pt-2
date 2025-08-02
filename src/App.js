import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Restaurant from './pages/Restaurant';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:id" element={<Restaurant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
