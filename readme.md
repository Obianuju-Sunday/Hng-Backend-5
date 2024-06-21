# Video Upload and Transcription Project

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Database](#database)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [Documentation](#documentation)
- [License](#license)

# Overview
This project allows users to upload videos and obtain transcriptions using Deepgram's transcription service. The application provides an API endpoint for uploading videos, processing them, storing them in Cloudinary, and retrieving transcriptions. The system utilizes MongoDB for storing metadata and transcription results.

# 🚀 Getting Started

### Pre-requisites


Before you begin, ensure you have the following installed on your system:


- Node.js - Download and install Node.js from [nodejs.org](https://nodejs.org/).

### Installation
To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Obianuju-Sunday/Hng-Backend-5.git
   cd Hng-Backend-5

2.  Install dependencies
    ```bash
    npm install

3. Start the server:
    ```bash
    npm start

# 🔨 Usage

### Database

- MongoDB Database
This application uses a MongoDB database by default. If you want to use a different database, make sure to configure it accordingly. Open the .env file and set the following variables:
```
DATABASE_URL: URL of your database connection.
```

# ⚙️ Configuration

- Set up environment variables:

Create a `.env` file based on `.env.example` and fill in necessary values.
```
PORT = 3000
DATABASE_URL = your_mongodb_connection_url
DEEPGRAM_API_KEY = your_deepgram_api_key
CLOUDINARY_CLOUD_NAME = your_cloudinary_cloud_name
CLOUDINARY_API_KEY = your_cloudinary_api_key
CLOUDINARY_API_SECRET = your_cloudinary_api_secret

```


# 🔧  Dependencies

* [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.

* [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.

* [MongoDB](https://www.mongodb.com/) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents. OR any preffered database.

* [Mongoose ODM](https://mongoosejs.com/) This makes it easy to write MongoDB validation by providing a straight-forward, schema-based solution to model to application data.

* [Deepgram SDK](https://www.deepgram.com/) is a software development kit that allows integration with Deepgram's transcription service. It provides functionalities to transcribe audio and video files.

* [Multer](https://www.npmjs.com/package/multer) is a middleware for handling multipart/form-data used for file uploads in Node.js. 

* [Cloudinary](https://cloudinary.com/) A cloud-based service that provides secure storage for the uploaded video files.

* [dotenv](https://www.npmjs.com/package/dotenv) A module to load environment variables from a .env file.


# ⭐ Contributing

- Feel free to [Open an issue](https://github.com/Obianuju-Sunday/Hng-Backend-5/issues) on GitHub to request any additional features you might need for your use case.

- Connect with me on [LinkedIn](https://www.linkedin.com/in/obianuju-sunday/). I'd love ❤️️ to hear where you are using this application.

#### 🐛 Bug Reporting
- Feel free to [Open an issue](https://github.com/Obianuju-Sunday/Hng-Backend-5/issues) on GitHub if you find any bug.


# 📋 Documentation
 Link to Postman Published Documentation
https://documenter.getpostman.com/view/22989155/2s9YeG7sQs

Link to Swagger Documentation https://be-5.onrender.com/api-docs


# 📜 License
This software is open source, licensed under the [MIT License](https://github.com/Obianuju-Sunday/Hng-Backend-5/blob/main/LICENSE).