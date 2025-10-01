# EmployeeDataMgmt

A full-stack web application to manage employee data (CRUD operations) with front-end, back-end, and database layers.

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running the App](#running-the-app)  
- [Usage](#usage)  
- [Future Improvements](#future-improvements)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Overview

This is an **Employee Data Management** system that lets you **create, read, update, and delete** employee records through a web interface. The application follows a client-server architecture:  

- A **frontend** (user interface) where users can interact (view the list of employees, edit, delete, etc.).  
- A **backend API** that handles the business logic, database access, and serves data to the frontend.  
- A **database** to persist employee data.  

It is intended to be simple yet solid enough to demonstrate full-stack capabilities: front-end, back-end, RESTful APIs, state management, and data persistence.

---

## Features

- Employee CRUD (Create, Read, Update, Delete)  
- Form validation 
- Clean UI for listing and editing employee data
- Modular architecture (frontend / backend separation)

---

## Tech Stack

| Layer        | Technology / Framework         |
|---------------|--------------------------------|
| Frontend      | JavaScript, React with TailwindCSS |
| Backend       | Node.js, Express.js |
| Database      | MongoDB |
| API           | RESTful API endpoints |
| Others        | CORS, body-parser, environment variables, etc. |

---

## Getting Started

### Prerequisites

Before running the project, ensure you have:

- **Node.js** (v14+ recommended)  
- **npm** or **yarn** (package manager)  
- A running **database instance** (MongoDB, MongoDB Compass recommended)  
- (Optional) **Postman** or any API client to test endpoints  

### Installation - First (In localHost)

1. **Clone the repository**

   ```bash
   git clone https://github.com/rahil1801/EmployeeDataMgmt.git
   cd EmployeeDataMgmt

   cd backend
   npm install
   Create a .env file (Take help from .env.example file).
   Example .env

    ```bash
    cd ../frontend
    npm install

    Running the App
    You’ll need to run both backend and frontend seperately.

2. **Start backend server**

    ```bash
    cd backend
    npm run dev
    This will start the API server on the port specified (e.g. http://localhost:4000).

3. **Start frontend client**

    ```bash
    cd ../frontend
    npm run dev
    This will launch the frontend (at http://localhost:3000 by default), and the UI will call your backend APIs for CRUD operations.

### Installation - Second (In docker)

1. **Clone the repository**

   ```bash
   git clone https://github.com/rahil1801/EmployeeDataMgmt.git
   cd EmployeeDataMgmt

   docker compose up --build

**Note:** To use this method, Docker Desktop must be installed in your computer
**Note:** By using this method, it is not necessary to set the env variables as compose build cmd automatically does it.

## Contributing

Contributions are welcome! If you want to contribute:

Fork this repo

Create a new branch: git checkout -b feature/YourFeature

Commit your changes: git commit -m "Add feature"

Push to the branch: git push origin feature/YourFeature

Open a Pull Request

Please ensure your code is clean, well-commented, and tested.

---

## License

This project is licensed under the MIT License — see the LICENSE file for details.
