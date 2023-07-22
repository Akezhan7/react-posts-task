import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserTable from './components/UserTable';
import "./App.css"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/page/:pageNumber" element={<UserTable />} />
        <Route path="/" element={<Navigate to="/page/1" />} /> {/* Добавить эту строку */}
      </Routes>
    </Router>
  );
}

export default App;
