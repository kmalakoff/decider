brew install coreutils

https://github.com/kubernetes/minikube/releases

https://github.com/kubernetes/minikube/issues/2

minikube start --memory=8192 --vm-driver=xhyve
<!--minikube ssh -- sudo /usr/local/etc/init.d/nfs-client start
minikube ssh -- sudo mkdir /Users
minikube ssh -- sudo mount 192.168.64.1:/Users /Users -o rw,async,noatime,rsize=32768,wsize=32768,proto=tcp-->
eval $(minikube docker-env)

minikube service web --namespace dist

By hand - Development
===========================================================
- Add bash to dockerfile:
RUN apk add --update bash && rm -rf /var/cache/apk/*

eval $(docker-machine env)

- Build and run:
docker build -t decider/web:dev -f web/Dockerfile.dev web/
docker run -v $(pwd)/images/api-command:/home/nodejs/app -it decider/api-command:dev bash
docker run -v $(pwd)/images/web:/home/nodejs/app -it decider/web:dist-pack bash

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
- brew doesn't work - TODO: try a clean install - problem with python?

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

https://kubernetes.io/docs/user-guide/connecting-applications/

Run:

scripts/kube-create
scripts/kube-delete

Open:

minikube service web
kubectl expose service web

kubectl scale --replicas=3 deployment/web

kubectl create namespace dev
kubectl create namespace dist
kubectl create -f deploy/local-forwarding-dev-service.yaml 
kubectl create -f deploy/local-forwarding-dist-service.yaml 
echo "$(minikube ip) local-production-web.decider.com local-production-api-read.decider.com local-production-api-command.decider.com" | sudo tee -a /etc/hosts
echo "$(minikube ip) www.decider.dev api-read.decider.dev api-command.decider.dev" | sudo tee -a /etc/hosts

https://github.com/kubernetes/ingress/blob/master/docs/dev/setup.md
minikube addons enable ingress
https://github.com/kubernetes/minikube/tree/master/deploy/addons/ingress
https://github.com/kubernetes/contrib/tree/master/ingress/controllers/nginx

https://medium.com/@rothgar/exposing-services-using-ingress-with-on-prem-kubernetes-clusters-f413d87b6d34#.k8j8tatul

https://github.com/kubernetes/minikube/issues/496
