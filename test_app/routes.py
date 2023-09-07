from fastapi import APIRouter


router = APIRouter()


@router.get("/")
def root():
    s = 's'
    return {"message": "test_app"}
