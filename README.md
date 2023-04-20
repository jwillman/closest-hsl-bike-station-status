# closest-hsl-bike-station-status

Shows how many HSL bikes are available at the nearest stations by geolocation or you can use an url parameter, eg. ?id=019,022,021,023,020, to show stations you want to see.

### Environment Configuration for local development

This project uses environment variables to configure API endpoints for development and production environments.

Create a .env file in the project root for development containing:

REACT_APP_API_URL=http://localhost:7071/api/proxy

### Starting the frontend

Run in project root:
`npm install && npm start`

### Starting the Azure Functions Backend / API

1. Add a local.settings.json file in the project root
2. Include the environment variables:
    ```
    {
    "IsEncrypted": false,
    "Values": {
        "AzureWebJobsStorage": "",
        "FUNCTIONS_WORKER_RUNTIME": "node",
        "CLIENT_URL": "YourClientURL",
        "DIGITRANSIT_SUBSCRIPTION_KEY": "YourSubscriptionKey"
        }
    }
    ```
