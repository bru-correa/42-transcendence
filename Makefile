# Docker compose command
COMPOSE_CMD := docker-compose
ifeq (, $(shell which $(COMPOSE_CMD)))
    COMPOSE_CMD := docker compose
endif

APP_DIR = app
ELK_DIR = devops
ELK_SETUP_FILE = setup.sh

APP_COMPOSE_FILE := ./$(APP_DIR)/docker-compose.yml
ELK_COMPOSE_FILE := ./$(ELK_DIR)/docker-compose.yml

# -----------------------RULES------------------------------------------------ #
# Launch application
up-app:

# Launch application and log management
all: up
up: up-app up-elk

# Stop application and log management containers
stop: stop-app stop-elk

# Resume application and log management containers
restart: restart-app restart-elk

# Stop and remove application and log management containers and networks
down clean: clean-elk clean-app

# Do the above and remove images
fclean: fclean-app fclean-elk

# 42's way to clear all existing docker containers, networks, volumes and images
preclean:
	docker stop $(shell docker ps -qa); docker rm $(shell docker ps -qa); \
	docker rmi -f $(shell docker images -qa); \
	docker volume rm $(shell docker volume ls -q); \
	docker network rm $(shell docker network ls -q) 2>/dev/null

# Removes and then rebuilds all images and services
re: fclean all

# -----------------------SPECIFIC RULES--------------------------------------- #
up-app:
	$(COMPOSE_CMD) --file=$(APP_COMPOSE_FILE) up --build --detach
up-elk:
	$(COMPOSE_CMD) --file=$(ELK_COMPOSE_FILE) up --build --detach \
	&& ./$(ELK_DIR)/$(ELK_SETUP_FILE)

stop-app:
	$(COMPOSE_CMD) --file=$(APP_COMPOSE_FILE) stop
stop-elk:
	$(COMPOSE_CMD) --file=$(ELK_COMPOSE_FILE) stop

restart-app:
	$(COMPOSE_CMD) --file=$(APP_COMPOSE_FILE) restart
restart-elk:
	$(COMPOSE_CMD) --file=$(ELK_COMPOSE_FILE) restart

down-app clean-app:
	$(COMPOSE_CMD) --file=$(APP_COMPOSE_FILE) down
down-elk clean-elk:
	$(COMPOSE_CMD) --file=$(ELK_COMPOSE_FILE) down

fclean-app:
	$(COMPOSE_CMD) --file=$(APP_COMPOSE_FILE) down --rmi all --remove-orphans -v
fclean-elk:
	$(COMPOSE_CMD) --file=$(ELK_COMPOSE_FILE) down --rmi all --remove-orphans -v

.PHONY: all
.PHONY: up up-app up-elk
.PHONY: stop stop-app stop-elk
.PHONY: down down-app down-elk
.PHONY: clean clean-app clean-elk
.PHONY: fclean fclean-app fclean-elk
.PHONY: preclean re
