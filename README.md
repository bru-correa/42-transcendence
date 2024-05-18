# Preparação do ambiente

## Ambiente virtual 

> em modo administrador:
> digite o comando a seguir para criar um ambiente virtual em python
> *Levo em consideração que já tenha instalado Python em seu computador

```
    python -m venv <nome_venv>
```
> Para ativar o ambiente virtual use o comando abaixo para windows

```
    <nome_venv>\Scripts\activate
```
> Para ativer o ambiente virtual use o comando abaixo para Linux

```
    source <nome_venv>/bin/activate  
```

# Referência para estudo:

## Videos

1. [MELHORES PRÁTICAS PARA ORGANIZAR UM PROJETO COM PYTHON](https://www.youtube.com/watch?v=bCQrN8qCxiU)

2. [Ambiente de PRODUÇÃO vs DESENVOLVIMENTO com PYTHON](https://www.youtube.com/watch?v=cJp3uxDII6c)

## Artigos

1. [venv — Creation of virtual environments](https://docs.python.org/3/library/venv.html)

2. [Permitir a execução de scripts no PowerShell do Windows 10](https://answers.microsoft.com/pt-br/windows/forum/all/permitir-a-execu%C3%A7%C3%A3o-de-scripts-no/f6b195cf-0be7-46e2-b88c-358c79f78343)

# ft_transcendence

## Project setup

 - You have to set the environment variables in the .env file.

## Project run

Start all containers:
```
make
```
---
Start all containers in the background:
```
make detached
```
---
Build containers:
```
make build
```
---
Stop all containers:
```
make stop
```
---
Stop and remove all containers:
```
make down
```
---
Remove all self created images (nginx, frontend, backend):
```
make iclean
```
---
Remove volumes (database):
```
make vclean
```
---
Remove all containers, images and volumes (except the frontend node_modules folder):
```
make clean
```
---
Remove all containers, images and volumes:
```
make fclean
```
---
Remove backend Migration files:
```
make mclean
```
---
Docker prune (remove docker cache...)
```
make prune
```
---
Check the status of the project:
```
make status
```

## Project usage

### Development

- Set the environment variables in the .env file:
```
NODE_ENV=development
DJANGO_SETTINGS_MODULE=backend.settings.development
```
- The development frontend server updates the changes automatically.
- The backend server needs to be restarted to update the changes.

### Production

- Set the environment variables in the .env file:
```
NODE_ENV=production
DJANGO_SETTINGS_MODULE=backend.settings.production
```
- To update the frontend changes, you need to run 'npm run build' and restart the frontend server.
- The backend server needs to be restarted to update the changes.