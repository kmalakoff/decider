By hand - Development
===========================================================
- Add bash to dockerfile:
RUN apk add --update bash && rm -rf /var/cache/apk/*

- Build and run:
docker build -t decider/image_web:develop -f image_web/Dockerfile.develop image_web/
docker run -p 3000:3000 -v image_web:/home/nodejs/app -it decider/image_web:develop bash
