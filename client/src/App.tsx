import React from 'react';
import { LeftFrame, CenterFrame, RightFrame, Footer } from './modules/centerFrame/index'
import './App.css';

function App() {
  return (
    <div className="App">
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
