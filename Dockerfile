FROM python:3.12.3-bullseye AS development

WORKDIR /app

COPY ./requirements.txt .

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

EXPOSE 8000
