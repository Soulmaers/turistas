import React from 'react';
import { Header, LeftFrame, CenterFrame, RightFrame, Footer } from './modules/layout/index'
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="Body">
        <LeftFrame />
        <CenterFrame />
        <RightFrame />
      </div>
      <Footer />
    </div>
  );
}

export default App;
