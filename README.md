# Cart Com API Gateway
- Cart Com is proxy service gateway can be used as a middleware between Affiliate APIs(now only provides flipkart) and any forntend webapps or mobile apps.
- This app is developed using express js. Cart com service is easy to scale as it is dockerized.

**Use below enviornment variables for service deployment:**

    #Env and Port
    NODE_ENV=development
    port=8000
    #Flipkart API Id and Token
    fk_affiliate_id=<affiliate-id>
    fk_affiliate_token=<affiliate-token>
    data_format=json #json or xml


__Command to build docker image:__

    docker build -t cart-com-api .

__Command to run container and start node service:__

    docker run -d --env-file .env -p 8000:8000 cart-com-api
