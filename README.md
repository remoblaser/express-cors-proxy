
# Fight the CORSe!

This simple Node.js / express based proxy allows your application to call services that are hosted on a different domain which do not support [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing). 

## Installation

    - Clone this repository
    - Install npm dependencies
    
        ```
        npm install
        ```
    
    - Start the server
         
         ```
         node server
         ```

## Usage

When making an API call using JavaScript:

- Prepend the URL of the Express Server and add the actual URL as a `target` parameter: http://localhost:3000?target=myapi.com/endpoint
