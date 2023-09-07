import hupper
from fastapi import FastAPI

from config.runner import run
from test_app.routes import router as test_app_router


app = FastAPI()


app.include_router(test_app_router, prefix='/test_app')


@app.get("/")
async def root():
    s = 'ss'
    return {"message": "Hello wss"}


if __name__ == "__main__":
    reloader = hupper.start_reloader('runner.run')
    run()
