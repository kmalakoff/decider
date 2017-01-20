Install
===========================================================
brew install coreutils

https://www.docker.com/products/docker

brew install docker-machine-driver-xhyve
sudo chown root:wheel $(brew --prefix)/opt/docker-machine-driver-xhyve/bin/docker-machine-driver-xhyve
sudo chmod u+s $(brew --prefix)/opt/docker-machine-driver-xhyve/bin/docker-machine-driver-xhyve
docker-machine create --driver xhyve --xhyve-memory-size=8192 --xhyve-experimental-nfs-share default
docker-machine create --driver xhyve --xhyve-memory-size=8192 --xhyve-experimental-nfs-share default

brew install kubectl
https://github.com/kubernetes/minikube/releases

minikube service web --namespace production
kubectl scale --replicas=3 decider/web --namespace production

DNS
===========================================================
echo "$(minikube ip) local-production-web.decider.com" | sudo tee -a /etc/hosts
echo "$(minikube ip) local-production-api-command.decider.com" | sudo tee -a /etc/hosts
echo "$(minikube ip) local-production-api-read.decider.com" | sudo tee -a /etc/hosts

echo "$(docker-machine ip) local-development-web.decider.com" | sudo tee -a /etc/hosts
echo "$(docker-machine ip) local-development-api-command.decider.com" | sudo tee -a /etc/hosts
echo "$(docker-machine ip) local-development-api-read.decider.com" | sudo tee -a /etc/hosts

Run
===========================================================
eval $(minikube docker-env)
eval $(docker-machine env)

scripts/{local|remote}/{env}/start
scripts/{local|remote}/{env}/pack
scripts/{local|remote}/{env}/up
scripts/{local|remote}/{env}/down
scripts/{local|remote}/{env}/stop

By hand - Development
===========================================================
- Add bash to dockerfile:
RUN apk add --update bash && rm -rf /var/cache/apk/*

- Build and run:
docker build -t decider/web:dev -f web/Dockerfile.dev web/
docker run -v $(pwd)/images/api-command:/home/nodejs/app -it decider/api-command:dev bash
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
