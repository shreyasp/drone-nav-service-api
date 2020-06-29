## Atlas Corp Drone Navigation Service [![Build Status](https://travis-ci.com/shreyasp/drone-nav-service-api.svg?token=mQpy6BQnmL5pEpaipJmf&branch=master)](https://travis-ci.com/shreyasp/drone-nav-service-api)

#### Requirements

-   MacOSX / Linux
-   Node = v12.18.1
    -   **_Note: Do not use Node version > 12, few packages might not function properly._**
    -   Alternatively you can use `nvm` to manage multiple node versions on your system. To install `nvm` please follow instructions on the following [page](https://github.com/nvm-sh/nvm#installing-and-updating).
-   Yarn

#### Running the application

-   Cloning the repository

```
$ git clone https://github.com/shreyasp/drone-nav-service-api
```

-   Navigate to the `drone-nav-service-api` or cloned repo folder

```
# Install the node_modules
$ yarn install --frozen-lockfile
```

-   Create `.env` in the repo folder

```
$ touch .env
```

```
PORT=<SERVER-PORT>
SECTOR_ID=<SECTOR-ID>  # As we will be deploying one service per sector
PRECISION=<PRECISION-NAVIGATION-RESULT>
GLOBAL_SERVICE=<true-or-false> # In case we decide to create a single service to handle all sectors
APP_DEV_ENV=<development-or-production>
AUTH0_ISSUER=<AUTH0-ISSUER-URL>
AUTH0_AUDIENCE=<AUTH0-AUDIENCE-URL>
AUTH0_TOKEN_URL=<AUTH0-TOKEN-URL>
AUTH0_CLIENT_ID=<AUTH0-CLINET-ID>
AUTH0_CLIENT_SECRET=<AUTH0-CLIENT-SECRET>
AUTH0_GRANT_TYPE=<AUTH0-GRANT-TYPE>

```

_NOTE: All AUTH0 values can be obtained from the AUTH0 user dashboard. For more information refer to, https://auth0.com_

-   Running the application

```
# Running the application in development mode
$ yarn build:dev

OR

# Build the application
$ yarn build:nowatch

AND

# In separate terminal start the application
$ yarn start

# Application should be running at http://localhost:3535/v1/ping
```

-   Running the application as Docker

```
# Build the application
$ yarn build:nowatch

$ docker-compose up -d

# Application should be running at http://localhost:9000/v1/ping
```

-   Making a call to location service

```
# Obtain an access token
    # Request:
    curl --location --request GET 'http://localhost:3535/tokens'

    # Response:
    {
        "accessToken":"<access-token>",
        "tokenType":"Bearer"
    }

# Use the access token in the Authorization header below to make API call
    # Request:
    curl --location --request GET 'http://localhost:3535/v1/locations' \
    --header 'Authorization: Bearer <access-token>' \
    --header 'Content-Type: application/json' \
    --data-raw '{ "x": "123.12", "y": "456.56", "z": "789.89", "vel": "20" }'

    # Response:
    {
        "loc":1389.57
    }
    
# Using the service as global
# Request:
    curl --location --request GET 'http://localhost:3535/v1/locations' \
    --header 'Authorization: Bearer <access-token>' \
    --header 'Content-Type: application/json' \
    --data-raw '{ "x": "123.12", "y": "456.56", "z": "789.89", "vel": "20", "sectorId": "1" }'

    # Response:
    {
        "loc":1389.57
    }
```

-   To run unit tests,

```
$ yarn test
```
