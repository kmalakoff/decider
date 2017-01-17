Run cluster in development
===========================================================
eval "$(docker-machine env)"
docker-compose -f development.yml build
docker-compose -f development.yml up

Open web app
===========================================================
eval "$(docker-machine env)"
open http://$(docker-machine ip):3000

By hand - Development
===========================================================
docker build -t decider/admin:development -f admin/Dockerfile.development admin/
docker run -p 3000:3000 -v $PWD/admin:/home/nodejs/app -it decider/admin:development

By hand - Development
===========================================================
docker build -t decider/admin:development -f admin/Dockerfile.development admin/
docker run -p 3000:3000 -it decider/admin:production bash
docker run -p 3000:3000 -it decider/admin:production

Add bash
===========================================================
RUN apk add --update bash && rm -rf /var/cache/apk/*
CMD ["bash"]
