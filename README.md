# EduVenture-Academy-LMS

## Overview

This project is a Learning Management System (LMS) built with React.js for the frontend, Spring Boot for the backend, and MySQL as the database. It provides a comprehensive platform for managing online courses, user profiles, assessments, progress tracking, and more.

## Features

- **User Management:**
  - User registration and login functionality.
  - User profiles with the ability to update information.

- **Course Management:**
  - Admin can add, edit, and manage courses.
  - Course details include name, instructor, description, etc.
  
- **Assessment:**
  - Users can take assessments related to courses.
  - Admin can create and manage assessment questions.

- **Progress Tracking:**
  - Monitor user progress and completion status.
  - Visual representation of progress for users.

- **Certificate Generation:**
  - Automatic certificate generation upon course completion.
  - Personalized certificates with user details.

- **Discussion Forum:**
  - Course-specific discussion forums for users.
  - Interaction between users and instructors.

- **Admin Dashboard:**
  - For course addition and assessment question addition.
  - Tracking of students, courses, and enrollments. 

## Technologies Used

- **Frontend:**
  - React.js
  - Styled with CSS

- **Backend:**
  - Spring Boot
  - RESTful API architecture

- **Database:**
  - MySQL
  - Seven tables: course, learning, progress, discussion, feedback, question, user, assessment

## Setup Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/VIVEKCHANDRAVANSHI/EduVenture-Academy-LMS.git
    ```

2. Navigate to the backend directory and run:

    ```bash
    mvn spring-boot:run
    ```

3. Navigate to the frontend directory and run:

    ```bash
    npm install
    npm start
    ```

4. Access the application at http://localhost:3000.

## Usage

- Visit the application on http://localhost:3000.

- As an admin, you can manage courses, create assessments, and monitor user progress. To access the admin dashboard, if your application is running locally, you can navigate to http://localhost:3000/dashboard.

- Users can register, log in, view courses, take assessments, and receive certificates.

## Contributing

Feel free to contribute to the project by opening issues or submitting pull requests. Your feedback is highly appreciated!
