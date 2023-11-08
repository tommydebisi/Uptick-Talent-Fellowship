## SAMPLE API WITH DOCKER
This is a sample API built with Node.js and Express that synchronizes writing to both a Postgres and MongoDB database. It makes use of Github Actions for CI/CD and Docker for containerization. It also has a test suite that tests the API endpoints and the database connections.

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
git clone https://github.com/tommydebisi/Uptick-Talent-Fellowship.git
cd Uptick-Talent-Fellowship/ts6-docker-sample-api
```

### Step 2: Start Docker Containers

Make sure Docker and Docker Compose are installed, then run:

```bash
docker-compose up
```

This will spin up Postgres and MongoDB containers as defined in `docker-compose.yml`.

### Step 3: Install Node.js Dependencies

Navigate to the root directory of your Node.js application and run:

```bash
npm install
```

This will install all required packages.

### Step 4: Set Environment Variables

Create a `.env` file in the root directory of your Node.js application and add the following:

```bash
PORT=<your_port_number>
MONGOURI=mongodb://root:password@localhost:27017/admin
POSTGRESURI=postgres://user:password@localhost:5432/testDb

# You can replace the values of the variables above with your own values.
# Based on the values in the docker-compose.yml file, the default values are given above.
```


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

This will insert the data into both Postgres and MongoDB databases and return the inserted IDs.

## API Endpoints

| Endpoint   | HTTP Method | Description                           |
|------------|-------------|---------------------------------------|
| `/api/data` | POST        | Insert data into Postgres and MongoDB    |
| `/api/data` | GET        | Shows the list Postgres and MongoDB data   |

## Images of results from the API
**For the POST request**
![Post Request](public/post-req-upd.PNG)

**For the GET request**
![Get Request](public/get-req-upd.PNG)

**For the tests passed**
![Tests](public/tests-passed.PNG)


## Authors
Oluwatomiwa Adebisi
