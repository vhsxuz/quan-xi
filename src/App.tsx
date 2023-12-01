import React from 'react';
import { Stack } from '@chakra-ui/react';
import Navbar from './widgets/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from './routes/route';

function App() {
  return (
    <Router>
      <Stack>
        <Navbar />
        <Route />
      </Stack>
    </Router>
  );
}

export default App;
