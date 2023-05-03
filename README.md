# ProjeX-Web-App

A simple project management system built with React for the front-end and a .Net core web API for the backend.

## Table of Contents

1. About Project
2. Setup And Initialization
3. Notes And Missing Features (stay tuned for updates :D )
4. Copyrights And Acknowledgements

## About

This project features an app that allows users to manage tasks effectivly, it aims to allow teams to communicate by making project boards, each board can have
multiple categories of tasks for users to track progress on.

## Setup And Initialization

To run the project you need to:

1. Configure the API:

-   Open MS SQL server and create a database with the name " ProjeX ".
-   navigate to /ProjeX-API/ProjeX-API and create a .env file
    inside the .env file add this entry: " TOKEN*SECRET_KEY=1247893247jsdsdasd@#&*($@&(_$@@$_(DJJJJDJDJDSAHJ!&^#(_&!(\*))))) " which is a secret used to hash the tokens by the API.
-   navigate to NuGet Packagae Manager and run the migrations on the database using dotnet ef database update.
-   Run the API server.

2. Configure the frontend

-   Open the folder ProjeX-React in vs code.
-   Run the command " npm i " to install all required packages.
-   Create a .env file and add this entry " VITE_API_URL=https://localhost:7114 " which is basically the environment variable for the API URL.
-   Run the React Server using the command " npm run dev ".

3. Enjoy :D the project is working now

## Notes And Missing Features

This project is incomplete and is missing a few features:

-   Login Session is not stored and user is logged out as soon as they refresh.
-   Edit and delete options are not available yet for some entites like task cards, user accounts etc.
-   Task cards should be movable between categories using the mouse but it is not yet implemented. (stay tuned)

## Copyrights And Acknowledgements

    This project is solely done by me, the author Mena Ashraf.

    - About The Author
        - Name: Mena Ashraf Mikhael Saleh
        - Email: Mena.a.saleh.2001@gmail.com
        - GitHub: https://github.com/Mena-Ibrahim
        - LinkedIn: https://www.linkedin.com/in/mena-saleh-23b947167/
