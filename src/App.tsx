import React from 'react';
import './global.css';
import './App.css';
import Autocomplete from './components/Autocomplete/Autocomplete';
import Container from './components/Container/Container';
import fetchData from './services/fetchData';

function App() {
  
  return (
    <div className="App">
      <Container>
        <h1><span className="primary">City</span> Autocomplete</h1>
        <Autocomplete fetchData={fetchData}/>
      </Container>
    </div>
  );
}

export default App;
