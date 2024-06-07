# User service

This repository contains a rest user service built with Node.js, Express, and SQLite. The service provides endpoints for user registration, authentication, and management.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Alhanaqtah/user-service.git
   cd user-service
   ```
2. Install dependencies:

   ```sh
   npm install
   ```

## Configuration

Configuration settings for the service are managed through environment variables. Create a `.env` file in the root directory of the project with the following structure:

```sh
PORT=3000
STORAGE_PATH=./database.sqlite
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h
```

Replace `'your_jwt_secret_key'` with a secure secret key.

## Usage

Start the server:

```sh
npm start
```

The server will run on the port specified in the configuration file (default: 3000).

## API Endpoints

### Health Check

- **GET /healthcheck**
  - Returns 200 if the server is running.

### Authentication

- **POST /auth/signup**

  - Registers a new user.
  - Request body:
    ```json
    {
        "username": "your_username",
        "email": "your_email",
        "password": "your_password"
    }
    ```
  - Response:
    ```json
    {
        "token": "jwt_token"
    }
    ```
- **POST /auth/login**

  - Authenticates a user.
  - Request body:
    ```json
    {
        "username": "your_username",
        "password": "your_password"
    }
    ```
  - Response:
    ```json
    {
        "accessToken": "jwt_token"
    }
    ```

### Users

- **GET /users**

  - Retrieves a list of all users (requires authentication).
  - Response:
    ```json
    [
        {
            "username": "user1",
            "name": "John",
            "surname": "Doe",
            "email": "john.doe@example.com",
            "role": "user",
            "is_blocked": false,
            "created_at": "2023-01-01T00:00:00Z",
            "modified_at": "2023-01-01T00:00:00Z"
        },
        ...
    ]
    ```
- **GET /users/me**

  - Retrieves the authenticated user's information.
  - Response:
    ```json
    {
        "username": "your_username",
        "name": "Your Name",
        "surname": "Your Surname",
        "email": "your_email@example.com",
        "role": "user",
        "is_blocked": false,
        "created_at": "2023-01-01T00:00:00Z",
        "modified_at": "2023-01-01T00:00:00Z"
    }
    ```
- **GET /users/:id**

  - Retrieves a user's information by their ID.
  - Response:
    ```json
    {
        "username": "user1",
        "name": "John",
        "surname": "Doe",
        "email": "john.doe@example.com",
        "role": "user",
        "is_blocked": false,
        "created_at": "2023-01-01T00:00:00Z",
        "modified_at": "2023-01-01T00:00:00Z"
    }
    ```
- **PATCH /users/me**

  - Updates the authenticated user's information.
  - Request body:
    ```json
    {
        "username": "new_username",
        "name": "New Name",
        "surname": "New Surname",
        "email": "new_email@example.com"
    }
    ```
- **DELETE /users/me**

  - Deletes the authenticated user's account.
  - Response:
    ```json
    {}
    ```

## Error Handling

Errors are returned in the following format:

```json
{
    "error": "Error message"
}
```

Common error codes:

- `400 Bad Request`: Invalid input or user not found.
- `401 Unauthorized`: Authentication failed or token expired.
- `500 Internal Server Error`: An unexpected error occurred.
