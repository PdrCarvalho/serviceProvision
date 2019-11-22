# serviceProvision
docker run -p  27017:27017 -v /home/carvalho/data:/data/db -d mongo
docker run -d -p 6379:6379 -i -t redis:3.2.5-alpine
