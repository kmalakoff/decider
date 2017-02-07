Run
===========================================================
scripts/{local|remote}/{env}/start
scripts/{local|remote}/{env}/pack
scripts/{local|remote}/{env}/up
scripts/{local|remote}/{env}/down
scripts/{local|remote}/{env}/stop

- Example - Local Development:

scripts/local/development/pack
scripts/local/development/up
scripts/local/development/down

- Example -Local Production:

scripts/local/production/start
scripts/local/production/pack
scripts/local/production/up
scripts/local/production/down
scripts/local/production/stop


To route properly in development, you need to DNS
===========================================================

- Update /etc/hosts:

echo "$(docker-machine ip) local-development-web.decider.com" | sudo tee -a /etc/hosts
echo "$(docker-machine ip) local-development-api.decider.com" | sudo tee -a /etc/hosts
echo "$(docker-machine ip) local-development-servicebus.decider.com" | sudo tee -a /etc/hosts

- Example - Local Development:

127.0.0.1 local-development-web.decider.com
127.0.0.1 local-development-api.decider.com
127.0.0.1 local-development-servicebus.decider.com

- Update /etc/hosts

echo "$(minikube ip) local-production-web.decider.com" | sudo tee -a /etc/hosts
echo "$(minikube ip) local-production-api.decider.com" | sudo tee -a /etc/hosts
echo "$(minikube ip) local-production-servicebus.decider.com" | sudo tee -a /etc/hosts

- Example - Local Production:

192.168.64.22 local-production-web.decider.com
192.168.64.22 local-production-api.decider.com
192.168.64.22 local-production-servicebus.decider.com
