## Template setup to use with Pycharm Debugger

- Run docker-compose up --build
- Add new interpeter -> On Docker Compose:
  - Service: web 
  - Envs: PYTHONUNBUFFERED=1 
  - Rename interpreter 
- Select Edit Debug Configuration 
  - Open config/main.py file and choose Current File and run debugger
