## Thanx Rewards Redemption

### Summary
The challenge is to implement a basic rewards redemption web app that allows a user to do the following:
- View their current reward points balance.
- Browse available rewards.
- Redeem rewards using their points.
- See a history of their reward redemptions.

The app consists of a backend API and a frontend interface. The backend API is implemented using Ruby on Rails and the frontend interface is implemented using React.
### Core Requirements

#### Backend API
Implement RESTful endpoints for the following:
- Retrieve a user’s current points balance
- Get a list of available rewards
- Allow users to redeem a reward
- Retrieve a user’s redemption history

#### Data Persistence
All data is persisted into MySQL database.

#### Interface
Implement a simple interface to interact with the backend API. This could be a command-line interface (CLI) or a web-based interface (Preferred if your focus is on the frontend).

### Access
- Backend: http://127.0.0.1:3000
- Frontend: http://127.0.0.1:3001

### Versions
- Ruby on Rails (7.0.8)
- React (18.3.1)
- MySQL (8.0)


### Setup

To set up the project, use the following `docker-compose` command:

#### Start project

```bash
docker-compose up --build -d
docker-compose run backend rails db:migrate db:seed
```

#### Stop project

```bash
docker-compose down
```

#### Run tests

```bash
docker-compose exec backend bash -c "RAILS_ENV=test rspec"
```
