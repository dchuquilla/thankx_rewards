import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RewardsPage from './pages/Rewards/RewardsPage';
import AuthPage from './pages/Auth/AuthPage';
import ProfilePage from './pages/User/ProfilePage';

const AppRoutes = (props) => {
  const { pointsBalance, setPointsBalance } = props; // Destructure pointsBalance from props

  return (
    <Router
      future={{
        v7_startTransition: true,
      }}
    >
      <Routes>
        <Route exact path="/" element={<RewardsPage setPointsBalance={setPointsBalance} />} />
        <Route path="/profile" element={<ProfilePage pointsBalance={pointsBalance} />} />
        <Route path="/users/sign_in" element={<AuthPage />} />
        <Route path="/users" component={AuthPage} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
