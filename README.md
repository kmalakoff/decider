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

- Example - Local Production:
- Update /etc/hosts

echo "$(minikube ip) local-production-web.decider.com" | sudo tee -a /etc/hosts
echo "$(minikube ip) local-production-api.decider.com" | sudo tee -a /etc/hosts
echo "$(minikube ip) local-production-servicebus.decider.com" | sudo tee -a /etc/hosts

192.168.64.22 local-production-web.decider.com
192.168.64.22 local-production-api.decider.com
192.168.64.22 local-production-servicebus.decider.com
