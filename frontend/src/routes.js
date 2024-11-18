import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/Auth/AuthPage';
// import Dashboard from './pages/Dashboard/Dashboard';

const AppRoutes = () => (
  <Router
    future={{
      v7_startTransition: true,
    }}
  >
    <Routes>
      <Route exact path="/" component={AuthPage} />
      {/* <Route path="/dashboard" component={Dashboard} /> */}
      <Route path="/users/sign_in" element={<AuthPage />} />
      <Route path="/users" component={AuthPage} />
    </Routes>
  </Router>
);

export default AppRoutes;
