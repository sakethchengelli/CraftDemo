# MERN Player Management Service

## Overview
This project is a MERN (MongoDB, Express, React, Node.js) stack-based service for managing player data with role-based access and AI-generated nicknames.

## Features
- **Role-Based Access:**
  - Admin users (`isAdmin=true`) can see full player details (first name, last name, and age).
  - Regular users (`isAdmin=false`) can only see first names and ages.
- **AI-Based Nickname Generation:**
  - Generates a player nickname based on the country.
- **MongoDB Storage:**
  - Players' data is stored persistently.
- **React UI:**
  - User-friendly interface to view players and generate nicknames.

## Setup Instructions
### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/mern-player-service.git
cd mern-player-service
```

### 2. Setup Backend
#### Install dependencies
```bash
cd server
npm install
```
#### Start MongoDB (if not running)
```bash
mongod --dbpath /your/db/path
```
#### Run backend server
```bash
node index.js
```

### 3. Setup Frontend
#### Install dependencies
```bash
cd ../client
npm install
```
#### Start React App
```bash
npm start
```

## License
This project is licensed under the MIT License.
