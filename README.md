By hand - Development
===========================================================
- Add bash to dockerfile:
RUN apk add --update bash && rm -rf /var/cache/apk/*

- Build and run:
docker build -t decider/admin_web:develop -f admin_web/Dockerfile.develop admin_web/
docker run -p 3000:3000 -v admin_web:/home/nodejs/app -it decider/admin_web:develop bash
