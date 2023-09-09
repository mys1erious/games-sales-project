## Template setup to use with Pycharm Debugger

- Run docker-compose up --build
- Add new interpeter -> On Docker Compose:
  - Service: web 
  - Envs: PYTHONUNBUFFERED=1 
  - Rename interpreter 
- Select Edit Debug Configuration 
  - Open config/main.py file and choose Current File and run debugger

- ATTENCION BLYAT: unix://$XDG_RUNTIME_DIR/docker.sock maps to 'sudo docker' on linux, so it might not be shown in Docker Desktop if you dont run it with sudo
