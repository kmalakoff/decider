Install
===========================================================
brew install coreutils

https://www.docker.com/products/docker

brew install docker-machine-driver-xhyve
sudo chown root:wheel $(brew --prefix)/opt/docker-machine-driver-xhyve/bin/docker-machine-driver-xhyve
sudo chmod u+s $(brew --prefix)/opt/docker-machine-driver-xhyve/bin/docker-machine-driver-xhyve
docker-machine create --driver xhyve --xhyve-memory-size=8192 --xhyve-experimental-nfs-share default
