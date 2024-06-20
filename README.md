# Google Forms Clone Backend

This is a backend server for a Google Forms clone application.

## Prerequisites

- Node.js installed (https://nodejs.org)

## Getting Started

1. **Install Dependencies**

```sh
npm install
```
## Start the Server
```sh
npm start

```
The server will start at http://localhost:3000.

## Endpoints

* GET /ping: Returns True to indicate server is running.
* POST /submit: Receives form submissions and saves them to db.json.
* **GET /read?index={index}: Retrieves a submission by index from db.json`
