import React, { useEffect, useState , useRef} from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
