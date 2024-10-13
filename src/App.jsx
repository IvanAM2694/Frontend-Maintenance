import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UsersTable from './components/UsersTable';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Login />}></Route>
        <Route path='/dashboard' element = {<Dashboard  />}>
          <Route path="users" element={<UsersTable />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
