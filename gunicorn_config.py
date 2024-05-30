# gunicorn_config.py

import multiprocessing

bind = "0.0.0.0:8000"
wsgi_app = "transcendence.wsgi:application"

workers = multiprocessing.cpu_count() * 2 + 1