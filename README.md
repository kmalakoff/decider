Run cluster in development
===========================================================
eval "$(docker-machine env)"
docker-compose -f development.yml build
docker-compose -f development.yml up

Open web app
===========================================================
eval "$(docker-machine env)"
open http://$(docker-machine ip):3000

By hand
===========================================================
docker build -t decider/admin:admin -f admin/Dockerfile.development admin/
docker run -v $PWD/admin:/app -t decider/admin:admin npm install
docker run -it -p 3000:3000 -v $PWD/admin:/app decider/admin:admin

Add bash
===========================================================
RUN apk add --update bash && rm -rf /var/cache/apk/*
CMD ["bash"]
