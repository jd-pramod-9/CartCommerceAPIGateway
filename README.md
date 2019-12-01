# CartCommerceAPIGateway
CORS proxy server for Cart Commerce frontend

docker build -t cart-com-api .

docker run -d --env-file .env -p 8000:8000 cart-com-api