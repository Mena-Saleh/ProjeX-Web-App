# ProjeX-Web-App

A simple project management system built with React for the front-end and a .Net core web API for the backend.

## Table of Contents

0. About Project
1. Screenshots
2. Setup And Initialization
3. Notes And Missing Features (stay tuned for updates :D )
4. Copyrights And Acknowledgements

## About

This project features an app that allows users to manage tasks effectivly, it aims to allow teams to communicate by making project boards, each board can have
multiple categories of tasks for users to track progress on.

## Screenshots

Home screen featuring a simplistic modern design.

![Home Page](Screenshots/0.png)

Users can add each other as friends.

![Users Page](Screenshots/2.png)

Boards can be created and shared to showcase a project's tasks, including assigned users and the status of each task (completed or not).

![Boards Page](Screenshots/1.png)

## Setup And Initialization

To run the project (on a local machine) you need to:

1. Configure the API:

- Open MS SQL server and create a database with the name " ProjeX ".
- Navigate to /ProjeX-API/ProjeX-API and create a .env file
  Inside the .env file add this entry: " TOKEN_SECRET_KEY=cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2
  " which is a secret used to hash the tokens by the API (you can use any token secret, just make sure its the same across the frontend and backend).
- Navigate to the "appsettings.json" and change the server name in the default connection object to your sql server name.
- Navigate to NuGet Packagage Manager and run the migrations on the database using dotnet ef database update.
- Run the API server.

2. Configure the frontend

- Open the folder ProjeX-React in vs code.
- Run the command " npm i " to install all required packages.
- Create a .env (in the root directore of ProjeX-React) file and add this entry " VITE_API_URL=https://localhost:7114 " which is basically the environment variable for the API URL.
- in the .env also add the entry: " VITE_TOKEN_SECRET_KEY=cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2 " (same secret used in the backend)
- Run the React Server using the command " npm run dev ".

3. Run the API using visual studio and run the React app using the command "npm run dev" in any editor such as vsCode, enjoy :D the project should be working now.

## Notes And Missing Features

This project is incomplete and is missing a few features:

- Edit and delete options are not available yet for some entites like task cards, user accounts etc.
- Task cards should be movable between categories using the mouse but it is not yet implemented.

## Copyrights And Acknowledgements

    This project is solely done by me, the author Mena Ashraf.

    - About The Author
        - Name: Mena Ashraf Mikhael Saleh
        - Email: Mena.a.saleh.2001@gmail.com
        - GitHub: https://github.com/Mena-Ibrahim
        - LinkedIn: https://www.linkedin.com/in/mena-saleh-23b947167/
