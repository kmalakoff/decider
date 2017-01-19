By hand - Development
===========================================================
- Add bash to dockerfile:
RUN apk add --update bash && rm -rf /var/cache/apk/*

- Build and run:
docker build -t decider/image-web:dev -f image-web/Dockerfile.dev image-web/
docker run -p 3000:3000 -v image-web:/home/nodejs/app -it decider/image-web:dev bash

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

kubectl create namespace dev
kubectl create namespace pack
kubectl create -f deploy/local-forwarding-dev-service.yaml 
kubectl create -f deploy/local-forwarding-pack-service.yaml 
echo "$(minikube ip) www.decider.pack read-api.decider.pack command-api.decider.pack" | sudo tee -a /etc/hosts
echo "$(minikube ip) www.decider.dev read-api.decider.dev command-api.decider.dev" | sudo tee -a /etc/hosts

https://github.com/kubernetes/ingress/blob/master/docs/dev/setup.md
minikube addons enable ingress
https://github.com/kubernetes/minikube/tree/master/deploy/addons/ingress
https://github.com/kubernetes/contrib/tree/master/ingress/controllers/nginx

https://medium.com/@rothgar/exposing-services-using-ingress-with-on-prem-kubernetes-clusters-f413d87b6d34#.k8j8tatul

https://github.com/kubernetes/minikube/issues/496
