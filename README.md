By hand - Development
===========================================================
- Add bash to dockerfile:
RUN apk add --update bash && rm -rf /var/cache/apk/*

- Build and run:
docker build -t decider/image-web:develop -f image-web/Dockerfile.develop image-web/
docker run -p 3000:3000 -v image-web:/home/nodejs/app -it decider/image-web:develop bash

Install docker (Mac)
===========================================================
brew install docker
brew install docker-machine-driver-xhyve
sudo chown root:wheel $(brew --prefix)/opt/docker-machine-driver-xhyve/bin/docker-machine-driver-xhyve
sudo chmod u+s $(brew --prefix)/opt/docker-machine-driver-xhyve/bin/docker-machine-driver-xhyve
docker-machine create --driver xhyve --xhyve-memory-size=8192 --xhyve-experimental-nfs-share default

Install minikube
===========================================================
https://github.com/kubernetes/minikube/releases
- brew doesn't work - TODO: try a clean install

minikube service image-web --url
kubectl describe service image-web


Generate kubernetes files from docker compose
===========================================================
https://github.com/kubernetes-incubator/kompose
brew install wget
wget https://github.com/kubernetes-incubator/kompose/releases/download/v0.1.2/kompose_darwin-amd64.tar.gz
tar -xvf kompose_darwin-amd64.tar.gz --strip 1
sudo mv kompose /usr/local/bin

kompose -f scripts/compose/pack.yml convert

Update services:
  "spec": {
    "type": "NodePort",

https://kubernetes.io/docs/user-guide/connecting-applications/

Run:

scripts/kube-create
scripts/kube-delete

Open:

minikube service image-web
kubectl expose service image-web

kubectl scale --replicas=3 deployment/image-web
