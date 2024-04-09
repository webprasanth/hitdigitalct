# hitdigitalct Flight Booking System

## Technologies Used

- Backend: Node.js with Express and MySQL
- Docker: Used for containerization
- Frontend: HTML/CSS/JavaScript (Developed with Basic Html/JS)

## Backend Setup:

1. **Setup project**:
   Clone the repository run the subsequent steps 

2. **Refer .env  file**:
    In the .env file kindly update the DB connection strings accordingly

3. **Backend File Structure**:
    
    - There is a file called backend/index.js pointing to the Express Node Server with series of API calls

4. **Frontend File Structure**: (I have made it a optional as well workable)
    
    - There is a file called ui/index.html pointing to the Frontend landing for the Operations against
        1.	Departure location
        2.	Arrival location
        3.	Departure date and time
        4.	Number of passengers
      w.r.t the flight booking system

5. **Install dependencies**:
   Install necessary packages for the backend:

    npm install express mysql2 body-parser dotenv
    npm install --save-dev nodemon

6. **In package.json**:
   Ensure script path under scripts code line is getting added properly

7. **Run Backend API**:
   Run the below command to run the node file via node server

   npm start backend/index.js


### Docker Setup:

Run Docker Containers:

1. **Backend API Docker Container**:
   Build the backend Docker image and run the container

   docker build -t backend-api .
   docker run -d -p 3000:3000 --name backend-container backend-api

2. **Frontend UI Docker Container**:
   Build the frontend Docker image and run the container

   docker build -t frontend-ui .
   docker run -d -p 80:80 --name frontend-container frontend-ui

3. **Now finally up the build via compose file**:
    To trigger the final docker-compose.uml 
  
   docker-compose up --build

 Both backend and frontend is accessible, like via http://localhost for UI and the backend also accessible via container linked between them. In-case of standalone accessible only for http://localhost:3000.
 
   
