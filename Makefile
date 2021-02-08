DC_DEV := docker-compose.yml
DC_HELPER := docker-compose.helper.yml
DC_STAGING := docker-compose.staging.yml

.PHONY: dev down init

dev: down init
	docker-compose --file $(DC_HELPER) run --rm install
	docker-compose --file $(DC_DEV) up --detach;
	docker-compose --file $(DC_DEV) logs --follow app;

down:
	docker-compose --file $(DC_HELPER) stop;
	docker-compose --file $(DC_HELPER) down --remove-orphans;
	docker-compose --file $(DC_DEV) stop;
	docker-compose --file $(DC_DEV) down --remove-orphans;
	docker-compose --file $(DC_STAGING) stop;
	docker-compose --file $(DC_STAGING) down --remove-orphans;

init:
	docker volume create nm

staging: down
	docker-compose --file $(DC_STAGING) up --detach;
	docker-compose --file $(DC_STAGING) logs --follow app;