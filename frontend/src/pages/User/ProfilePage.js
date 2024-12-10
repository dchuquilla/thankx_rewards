import React from 'react';
import './ProfilePage.css';

const ProfilePage = (props) => {
  const { pointsBalance, redemptions } = props;

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
