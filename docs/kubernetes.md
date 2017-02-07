Install
===========================================================
brew install kubectl
https://github.com/kubernetes/minikube/releases

minikube service web --namespace production
kubectl scale --replicas=3 decider/web --namespace production

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
