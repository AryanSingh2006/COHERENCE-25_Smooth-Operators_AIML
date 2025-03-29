from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router

# ✅ Initialize FastAPI app
app = FastAPI()

# ✅ Enable CORS (for frontend communication)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include router
app.include_router(router)

# ✅ Root endpoint to check API status
@app.get("/")
def root():
    return {"message": "Resume Screener API is running!"}