# Docker compose command
COMPOSE_CMD := docker-compose
ifeq (, $(shell which $(COMPOSE_CMD)))
    COMPOSE_CMD := docker compose
endif

# -----------------------RULES------------------------------------------------ #
.PHONY: all up stop restart down clean preclean re

all: up

up:
	$(COMPOSE_CMD) up --build

stop:
	$(COMPOSE_CMD) stop

restart:
	$(COMPOSE_CMD) restart

down clean:
	$(COMPOSE_CMD) down

fclean:
	$(COMPOSE_CMD) down --rmi all --remove-orphans -v

preclean:
	docker stop $(shell docker ps -qa); docker rm $(shell docker ps -qa); docker rmi -f $(shell docker images -qa); docker volume rm $(shell docker volume ls -q); docker network rm $(shell docker network ls -q) 2>/dev/null

re: fclean all
