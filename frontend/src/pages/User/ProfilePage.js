import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './ProfilePage.css';


const ProfilePage = () => {
  const [pointsBalance, setPointsBalance] = useState(0);
  const [redemptions, setRedemptions] = useState([]);

  useEffect(() => {
    const fetchPointsBalance = async () => {
      try {
        const response = await api.get('/v1/users/points_balance');
        console.log('response 1:', response.data.points);
        setPointsBalance(response.data.points);
      } catch (error) {
        console.error('Error fetching points balance:', error);
      }
    };

    const fetchRedemptions = async () => {
      try {
        const response = await api.get('/v1/users/redemptions');
        console.log('response 2:', response.data);
        setRedemptions(response.data);
      } catch (error) {
        console.error('Error fetching redemptions:', error);
      }
    };

    fetchPointsBalance();
    fetchRedemptions();
  }, []);

  return (
    <div className="rewards-page">
      <h1>My Profile</h1>
      <div className="points-balance">
        <h2>Points Balance: {pointsBalance}</h2>
      </div>
      <div className="redemptions">
        <h2>Redeemed Rewards</h2>
        <ul>
          {redemptions.map((redimed_reward) => (
            <li key={redimed_reward.id}>{redimed_reward.reward.name} : { redimed_reward.points_cost }</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProfilePage;
