Run
===========================================================
scripts/{local|remote}/{env}/start
scripts/{local|remote}/{env}/pack
scripts/{local|remote}/{env}/up
scripts/{local|remote}/{env}/down
scripts/{local|remote}/{env}/stop

Install
===========================================================
brew install coreutils

https://www.docker.com/products/docker

brew install docker-machine-driver-xhyve
sudo chown root:wheel $(brew --prefix)/opt/docker-machine-driver-xhyve/bin/docker-machine-driver-xhyve
sudo chmod u+s $(brew --prefix)/opt/docker-machine-driver-xhyve/bin/docker-machine-driver-xhyve
docker-machine create --driver xhyve --xhyve-memory-size=8192 --xhyve-experimental-nfs-share default

brew install kubectl
https://github.com/kubernetes/minikube/releases

minikube service web --namespace production
kubectl scale --replicas=3 decider/web --namespace production

DNS
===========================================================
echo "$(minikube ip) local-production-web.decider.com" | sudo tee -a /etc/hosts
echo "$(minikube ip) local-production-api.decider.com" | sudo tee -a /etc/hosts

echo "$(docker-machine ip) local-development-web.decider.com" | sudo tee -a /etc/hosts
echo "$(docker-machine ip) local-development-api.decider.com" | sudo tee -a /etc/hosts

127.0.0.1 local-development-web.decider.com
127.0.0.1 local-development-api.decider.com
127.0.0.1 local-development-servicebus.decider.com
127.0.0.1 local-development-rabbtmq.decider.com
127.0.0.1 local-development-mongodb.decider.com
127.0.0.1 local-development-eventstore.decider.com

192.168.64.22 local-production-web.decider.com
192.168.64.22 local-production-api.decider.com
192.168.64.22 local-production-servicebus.decider.com
192.168.64.22 local-production-rabbtmq.decider.com
192.168.64.22 local-production-mongodb.decider.com
192.168.64.22 local-production-eventstore.decider.com

By hand - Development
===========================================================
- Add bash to dockerfile:
RUN apk add --update bash && rm -rf /var/cache/apk/*

- Build and run:
docker build -f images/web/Dockerfile.dev -t decider/web:dev images/web/
docker run -v $(pwd)/images/web:/home/nodejs/app -it decider/web:dev bash
docker run -v $(pwd)/images/web:/home/nodejs/app -it decider/web:pack-pack bash

Install minikube
===========================================================
https://github.com/kubernetes/minikube/releases

minikube service web --url
kubectl describe service web

Generate kubernetes files from docker compose
===========================================================
https://github.com/kubernetes-incubator/kompose
brew install wget
wget https://github.com/kubernetes-incubator/kompose/releases/download/v0.1.2/kompose_darwin-amd64.tar.gz
tar -xvf kompose_darwin-amd64.tar.gz --strip 1
sudo mv kompose /usr/local/bin
kompose -f scripts/compose/dist.yml convert

Update services:
  "spec": {
    "type": "NodePort",

Credentials
===========================================================
- Eventstore
http://localhost:2113
login: admin
password: changeit
