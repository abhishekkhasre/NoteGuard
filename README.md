#  NoteGuard

![ NoteGuard](https://drive.google.com/file/d/1GrsVxwBDVb33CdXeo42J-YSAuEWQv7OR/view?usp=sharing)

## Introduction

 NoteGuard is a powerful full-stack web application designed to be your ultimate digital vault for managing various aspects of your online life. Seamlessly organize and access your essential information, including notes, web archives (bookmarks), and sensitive passwords, all within a secure and user-friendly interface.

Our mission is to simplify your digital life by providing a centralized platform for managing your valuable data, enhancing productivity, and promoting online security.

## Features

- **User Authentication**: Enjoy seamless and secure access to your  NoteGuard account with our robust authentication system. Sign up or log in via Google OAuth, or create an account with your email and password. To ensure an additional layer of security for your sensitive data in the password manager (VaultLock), we employ JSON Web Tokens (JWT) with cookies for authentication.

- **Notes Manager**: Take notes and organize them effortlessly. With our intuitive interface, you can create, view, update, and delete notes, streamlining your personal and professional life.

- **Web Archive (Bookmark Manager)**: Keep your favorite websites and online resources neatly categorized. Our Web Archive feature lets you save and access bookmarks with ease, making browsing a breeze.

- **VaultLock (Password Manager)**: Securely store and manage your passwords in our state-of-the-art VaultLock. Your sensitive information is protected with hashing and encryption for enhanced data security.

- **Responsive Design**:  NoteGuard is designed with responsiveness in mind, ensuring optimal performance and user experience across devices and screen sizes.
- **Forget Password Functionality**: Never worry about forgetting your password again!  NoteGuard features a password reset option for users who forget their passwords. Upon requesting a password reset, a reset token is sent via email, allowing users to securely reset their password.

## Folder Structure

Our project follows a well-organized folder structure:

- `server.js`: The main server file responsible for starting the application.
- `server`: Contains all server-related code and configurations.
  - `config`: Holds essential configuration files, such as database connection (`db.js`).
  - `controllers`: Houses route handlers and controllers for various functionalities, including Notes, Web Archive, and VaultLock.
  - `middleware`: Implements custom middleware functions for authentication, error handling, and more.
  - `models`: Defines database models (schemas) for User, Notes, Web Archive, and VaultLock.
  - `routes`: Contains route definitions for different application sections, such as `auth.js`, `index.js`, `dashboard.js`, `bookmark.js`, and `password.js`.
- `views`: Consists of EJS templates responsible for rendering pages.
  - `layout`: Holds the common layout template, including header, footer, etc.
  - `partials`: Reusable partial templates for header, footer, etc.
  - `dashboard`: Contains EJS templates for the dashboard functionality.
  - `webarchive`: Contains EJS templates for the bookmark manager (Web Archive).
  - `vaultlock`: Contains EJS templates for the password manager (VaultLock).
  - Other EJS templates for the landing page and error pages are also included.
- `public`: Contains static assets, including CSS, JavaScript, images, etc.
- Other project-related files, such as `.env`, `package.json`, `README.md`, etc., are present.

## Installation

To set up the project, follow these steps:

1. Clone the repository: `git clone <repository_url>`
2. Navigate to the project folder: `cd -NoteGuard`
3. Install dependencies: `npm install`
4. Create a `.env` file in the root directory and set environment variables (e.g., database connection, Google OAuth credentials).

## Usage

1. Run the application: `npm start`
2. Access the application in your web browser at `http://localhost:3000/`

## Technologies Used

Our application harnesses the power of the following technologies:

- Node.js: A versatile server-side JavaScript runtime.
- Express.js: A popular web application framework for Node.js.
- MongoDB (Mongoose): A flexible and scalable NoSQL database for data storage.
- Passport.js (Google OAuth): A user authentication middleware for Node.js, enabling seamless Google login and signup.
- JSON Web Tokens (JWT): A secure method for transmitting information between parties, used for password manager (VaultLock) authentication.
- EJS (Embedded JavaScript): A templating engine for rendering dynamic HTML content.
- Bootstrap: A front-end framework for responsive and visually appealing web design.
