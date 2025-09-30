from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Portfolio Models
class PersonalInfo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    surname: str
    title: str
    subtitle: str
    location: str
    email: str
    phone: str
    availability_status: str

class SkillCategory(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    category_name: str
    icon: str
    skills: List[str]

class Experience(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    position: str
    company: str
    location: str
    start_date: str
    end_date: str
    is_current: bool = False
    achievements: List[str]
    highlight_metric: Optional[Dict[str, Any]] = None

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    category: str
    description: str
    technologies: List[str]
    key_results: List[str]
    status: str  # "Completed", "Ongoing", etc.

class AboutInfo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    journey_description: str
    current_focus: str
    stats: Dict[str, Dict[str, str]]  # {"years_experience": {"value": "5+", "label": "Years Experience"}}

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

# Portfolio API Endpoints
@api_router.get("/")
async def root():
    return {"message": "Varshank Portfolio API"}

@api_router.get("/portfolio/personal-info", response_model=PersonalInfo)
async def get_personal_info():
    """Get personal information"""
    # Return static data for now - can be made dynamic later
    return PersonalInfo(
        name="Varshank",
        surname="Shukla", 
        title="Business Manager & Data Science Professional",
        subtitle="Transforming Business Operations Through Data-Driven Innovation",
        location="LUCKNOW, INDIA • AVAILABLE FOR OPPORTUNITIES",
        email="ektayyeshukla@gmail.com",
        phone="+91 8932820616",
        availability_status="Available for opportunities"
    )

@api_router.get("/portfolio/about", response_model=AboutInfo)
async def get_about_info():
    """Get about section information"""
    return AboutInfo(
        journey_description="Client-focused Business Manager with diverse experience in sales, business operations, and technical support. Expert at relationship-building, project coordination, innovation, and process improvement to transform underperforming operations and drive business growth.",
        current_focus="Currently pursuing advanced Data Science & AI to merge business acumen with cutting-edge analytics.",
        stats={
            "years_experience": {"value": "5+", "label": "Years Experience"},
            "projects_completed": {"value": "50+", "label": "Projects Completed"}, 
            "business_growth": {"value": "25%", "label": "Business Growth"},
            "certifications": {"value": "10+", "label": "Certifications"}
        }
    )

@api_router.get("/portfolio/skills", response_model=List[SkillCategory])
async def get_skills():
    """Get skills and expertise"""
    return [
        SkillCategory(
            category_name="Business Leadership",
            icon="👥",
            skills=[
                "Business & Operational Leadership",
                "Customer Relationship Management (CRM)",
                "Strategic Planning & Consulting", 
                "Retail Operations & Sales Processes",
                "Financial Management & Negotiation",
                "Project Management & Team Leadership"
            ]
        ),
        SkillCategory(
            category_name="Technical Expertise", 
            icon="💻",
            skills=[
                "Python Programming",
                "SQL & Database Management",
                "Machine Learning (Scikit-Learn, TensorFlow)",
                "Data Analysis (Pandas, NumPy)",
                "Data Visualization (Power BI, Tableau)",
                "SEO & Online Marketing"
            ]
        ),
        SkillCategory(
            category_name="Core Competencies",
            icon="🎯", 
            skills=[
                "Strategic Thinking",
                "Problem Solving",
                "Client Relations",
                "Process Optimization",
                "Team Leadership",
                "Innovation Management"
            ]
        )
    ]

@api_router.get("/portfolio/experience", response_model=List[Experience])
async def get_experience():
    """Get professional experience"""
    return [
        Experience(
            position="Family-Owned Business Manager",
            company="Gurudev Electricals & Real Estate, Lucknow",
            location="Lucknow",
            start_date="Nov 2019",
            end_date="Current",
            is_current=True,
            achievements=[
                "Led business planning, operations, and delivery for real estate and electrical contracts",
                "Improved profits via cost containment and new revenue streams", 
                "Reduced shipment turnaround and optimized warehouse workflow",
                "Enhanced client satisfaction and vendor relations",
                "Transformed underperforming units by implementing new strategies"
            ],
            highlight_metric={"value": "25%", "label": "Cost Reduction"}
        ),
        Experience(
            position="Associate – Customer Service (Internet)",
            company="Sutherland Global Services Pvt. Ltd., Chennai", 
            location="Chennai",
            start_date="Feb 2018",
            end_date="Oct 2019",
            is_current=False,
            achievements=[
                "Led digital sales ops and marketing campaigns, driving customer engagement",
                "Optimized website UX with analytics, improved retention via feedback analysis"
            ],
            highlight_metric=None
        )
    ]

@api_router.get("/portfolio/projects", response_model=List[Project])
async def get_projects():
    """Get featured projects"""
    return [
        Project(
            title="Rossmann Store Sales Forecasting",
            category="Data Science Capstone",
            description="Forecasted daily sales for 9 key Rossmann stores using VAR/VARMAX time series models with comprehensive data analysis and feature engineering.",
            technologies=["Python", "Pandas", "Time Series Analysis", "VAR/VARMAX Models"],
            key_results=[
                "Accurate sales predictions for strategic planning",
                "Comprehensive feature engineering pipeline", 
                "Advanced time series modeling implementation"
            ],
            status="Completed 2025"
        ),
        Project(
            title="Business Process Optimization System",
            category="Business Operations", 
            description="Implemented data-driven process improvements across multiple business units, resulting in significant operational efficiency gains.",
            technologies=["Process Analysis", "Data Modeling", "Business Intelligence"],
            key_results=[
                "Reduced operational costs by 25%",
                "Improved customer satisfaction scores",
                "Streamlined workflow processes"
            ],
            status="Ongoing"
        ),
        Project(
            title="Customer Analytics Dashboard",
            category="Data Visualization",
            description="Developed comprehensive analytics dashboard using Power BI to track customer behavior, sales performance, and operational metrics.",
            technologies=["Power BI", "SQL", "Data Modeling", "DAX"],
            key_results=[
                "Real-time business intelligence insights",
                "Enhanced decision-making capabilities",
                "Improved performance tracking"
            ],
            status="Completed"
        )
    ]

@api_router.post("/portfolio/contact", response_model=ContactMessage)
async def submit_contact_message(message: ContactMessageCreate):
    """Submit contact form message"""
    try:
        contact_message = ContactMessage(**message.dict())
        await db.contact_messages.insert_one(contact_message.dict())
        return contact_message
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save message: {str(e)}")

@api_router.get("/portfolio/contact/messages", response_model=List[ContactMessage])
async def get_contact_messages():
    """Get all contact messages (admin endpoint)"""
    try:
        messages = await db.contact_messages.find().sort("timestamp", -1).to_list(100)
        return [ContactMessage(**msg) for msg in messages]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve messages: {str(e)}")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
