# Feedback application
The Feedback Application for is a web-based platform designed to facilitate the process of gathering reviews and feedback from users on various items. The application serves as a practical project for a security programming course, aiming to demonstrate secure coding practices and address potential vulnerabilities.

Key Features:
- User Registration and Login: Users can create an account and securely log in to the application using their credentials. This ensures that only authorized individuals can access and interact certain parts of the system.
- Item Reviews: Users can add reviews for different items. They can rate items and leave comments. 
- Item Browsing: Users can browse through a collection of items available in the application.
- Security Focus: The application emphasizes security programming principles. It incorporates secure coding practices to mitigate some of the common vulnerabilities.
- Data Protection: User data, including passwords and sensitive information, is securely stored and protected using encryption techniques.

## Setup Instructions for Local Application

Prerequisites:
- Java Development Kit (JDK) installed (version 11 or later)
- An IDE that supports Kotlin (e.g., IntelliJ IDEA, Eclipse with Kotlin plugin)
- Node.js and npm (Node Package Manager) installed
- PostgreSQL installed and running

Step 1: Clone the GitHub repository

    Open a terminal or command prompt.

    Navigate to the directory where you want to clone the repository.

    Run the following command to clone the repository:

    git clone https://github.com/maijaidap/feedback-app.git

Step 2: Set up the backend

    Open a terminal or command prompt.

    Navigate to the backend directory of the cloned repository.

    Open the application.properties file in a text editor.

    Modify the database connection properties (spring.datasource.jdbc-url, spring.datasource.username, spring.datasource.password)
    according to your PostgreSQL configuration.
    
    Modify the JWT-token properties (feedbackapp.app.jwtSecret, jwtExpirationMs).

Step 3: Set up the frontend

    npm install

    npm start

    This will compile the React and TypeScript code and start the frontend server.

Step 4: Create database tables

    Locate the tables.txt file in the root of the cloned repository.
    Open the file and copy the SQL statements that create the tables.
    Open a database management tool (e.g., pgAdmin) and connect to your PostgreSQL database.
    Execute the SQL statements to create the necessary tables.

Step 5: Access the application

    Once the backend and frontend servers are running without any errors, open a web browser.

    Enter the following URL in the address bar:
    http://localhost:3000
    
