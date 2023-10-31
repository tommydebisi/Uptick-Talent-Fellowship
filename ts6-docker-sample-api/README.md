## SAMPLE API WITH DOCKER
This is a sample API built with Node.js and Express that synchronizes writing to both a MySQL and MongoDB database.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authors](#authors)


## Prerequisites
1. Docker and Docker Compose
2. Node.js
3. NPM

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-repo/sample-api.git
cd sample-api
```

### Step 2: Start Docker Containers

Make sure Docker and Docker Compose are installed, then run:

```bash
docker-compose up
```

This will spin up MySQL and MongoDB containers as defined in `docker-compose.yml`.

### Step 3: Install Node.js Dependencies

Navigate to the root directory of your Node.js application and run:

```bash
npm install
```

This will install all required packages.

### Step 4: Run the Node.js Application

```bash
node app.js
```

The API server will start on `http://localhost:3000`.

## Usage

Once the server is up and running, you can use `curl` or Postman to query the API.

### Create Data

To create data, you can POST JSON to the `/api/data` endpoint.

Example using `curl`:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"sample", "value":10}' http://localhost:3000/api/data
```

This will insert the data into both MySQL and MongoDB databases and return the inserted IDs.

## API Endpoints

| Endpoint   | HTTP Method | Description                           |
|------------|-------------|---------------------------------------|
| `/api/data` | POST        | Insert data into MySQL and MongoDB    |

## Authors
Oluwatomiwa Adebisi
