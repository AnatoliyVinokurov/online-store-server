# Tech Store Server

<img src="./readme_assets/logo.png" width="15%"></a>

This is the server-side component of an online tech store, built using Node.js with the Express.js framework and utilizing Sequelize as the Object-Relational Mapping (ORM) to interact with a PostgreSQL database. The server provides RESTful API endpoints to manage users, brands, types, devices, and user shopping baskets.

## Table of Contents

- [Project Structure](#project-structure)
- [Database Models](#database-models)
- [Controllers](#controllers)
- [API Endpoints](#api-endpoints)
- [Environment Configuration](#environment-configuration)
- [Setup and Usage](#setup-and-usage)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

### `models`

This directory contains the Sequelize model definitions for various entities in the application. These models define the structure of the corresponding database tables. Key models include:

- `User`: Represents a user with properties such as email, password, and role.
- `Brand`: Represents a brand of tech devices.
- `Type`: Represents a type or category of tech devices.
- `Device`: Represents a tech device with properties like name, price, brand, and type.
- `Rating`: Stores user ratings for devices.
- `DeviceInfo`: Contains additional information about devices.
- `Basket`: Represents a user's shopping basket.
- `BasketDevice`: Links devices to a user's basket.
- `TypeBrand`: Represents the many-to-many relationship between types and brands.

### `controllers`

The `controllers` directory contains controller functions for managing different aspects of the application, such as creating brands, devices, types, and handling user-related actions. Notable controllers include:

- `BrandController`: Manages brand creation and retrieval.
- `DeviceController`: Handles device creation, retrieval, and searching.
- `TypeController`: Manages tech device type creation and retrieval.
- `UserController`: Handles user registration, login, and authentication.

### `error`

This directory provides custom error handling for the application. The `ApiError` class is used to generate custom error responses and improve error management.

### `static`

The `static` directory is where you can store static files, mainly device images. These images can be served through the server to be displayed on the client-side.

### `config`

The `config` directory contains configuration files, including the settings for connecting to the PostgreSQL database. Ensure that you configure the database connection according to your setup.

### `middlewares`

Middleware functions are defined in the `middlewares` directory. These functions are responsible for tasks like authentication and request validation. Middleware can be applied to specific routes as needed.

### `routes`

API routes and their corresponding controller functions are defined in the `routes` directory. The server's API is accessible via these routes. Check the detailed API documentation within the code for a list of available endpoints and their functionality.

## Database Models

The server uses Sequelize as an ORM to define and manage the database models. Here's a brief overview of the main models:

- `User`: Represents user data, including email, hashed password, and user role (default: "USER").
- `Brand`: Represents the brands of tech devices available in the store.
- `Type`: Represents device types or categories.
- `Device`: Represents individual tech devices with properties such as name, price, brand, and type.
- `Rating`: Stores user ratings for devices.
- `DeviceInfo`: Contains additional information about devices, such as title and description.
- `Basket`: Represents a user's shopping basket.
- `BasketDevice`: Links devices to a user's basket.
- `TypeBrand`: Represents a many-to-many relationship between device types and brands.

## Controllers

### BrandController

The `BrandController` handles brand-related actions, including creating new brands and retrieving existing ones.

### DeviceController

The `DeviceController` is responsible for device-related actions, including creating devices, retrieving devices, and searching for devices based on various parameters. It also handles device image uploads.

### TypeController

The `TypeController` manages device types or categories, allowing you to create new types and retrieve existing ones.

### UserController

The `UserController` controller is dedicated to user-related actions, such as user registration, login, and authentication.

## API Endpoints

The server provides various API endpoints to interact with the application. To explore and test these endpoints, refer to the detailed API documentation within the code.

## Environment Configuration

For the server to work properly, it relies on environment variables, including the `SECRET_KEY` for JWT token generation. Make sure to set up environment variables according to your requirements and deployment environment.

Example `.env` file:

```env
SECRET_KEY=your_secret_key_here
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=your_database_host
DB_PORT=your_database_port
```

## Setup and Usage

1. Clone this repository to your local environment.
2. Install the required dependencies using `npm install`.
3. Set up a PostgreSQL database and configure the connection in the `config/db.js` file. Make sure to create the necessary tables based on the defined models.
4. Run the server using `npm start`.
5. You can use the provided API endpoints to interact with the tech store application.

Please make sure to configure environment variables, especially the `SECRET_KEY` for JWT token generation, and set up the database connection settings accordingly.

## Contributing

Contributions are welcome! If you have ideas for improvements, bug fixes, or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute it as per the terms of the license.

For any questions, issues, or collaboration inquiries, feel free to contact the project owner or contribute through GitHub.

Happy coding!

