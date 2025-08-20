# Build client
docker build -t my-client ./client

# Build server
docker build -t my-server ./server

# Run server
docker run -p 3000:3000 my-server

# Run client
docker run -p 8080:80 my-client
