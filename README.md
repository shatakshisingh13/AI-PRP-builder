# AI PRD Builder

An AI-powered Software-as-a-Service (SaaS) application that automatically generates comprehensive Product Requirements Documents (PRDs) from a simple product idea. 

This project utilizes the **Google Gemini API** to instantly draft intelligent PRDs containing targeted user personas and actionable sprint tasks.

## 🚀 Features
- **Instant Generation:** Type a product idea and receive a fully structured PRD within seconds.
- **Modern UI:** A stunning, responsive user interface built with React, Tailwind CSS v4, and shadcn/ui.
- **Robust Backend:** Clean Architecture implemented in Java using Spring Boot.
- **Direct AI Integration:** Directly interfaces with the Gemini native REST API for extremely fast streaming and reliable generation.

## 💻 Tech Stack
**Frontend:**
- React (Vite)
- TypeScript
- Tailwind CSS (v4)
- shadcn/ui (Lucide Icons, Radix UI)
- Axios

**Backend:**
- Java 17
- Spring Boot 3.2.4
- Maven
- Google Gemini API (Free Tier)

---

## 🛠️ Local Setup

### Prerequisites
- Node.js (v18+)
- Java 17+
- Maven
- Google Gemini API Key (Grab one from [Google AI Studio](https://aistudio.google.com/))

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Set your Google Gemini API key as an environment variable in your terminal:
   - **Windows (PowerShell):** `$env:GEMINI_API_KEY="your-api-key-here"`
   - **Mac/Linux:** `export GEMINI_API_KEY="your-api-key-here"`
3. Run the Spring Boot server:
   ```bash
   mvn spring-boot:run
   ```
   *The backend will start on `http://localhost:8081`.*

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the required Node dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will start on `http://localhost:5173`. Navigate there in your browser!*

---

## 🚀 Deployment Guide

### Backend (Render.com / Railway.app)
1. Create a new "Web Service".
2. Connect this GitHub repository.
3. **Root Directory:** `backend`
4. **Build Command:** `mvn clean package`
5. **Start Command:** `java -jar target/*.jar`
6. **Environment Variables:**
   - `GEMINI_API_KEY` = `your-api-key-here`
   - `PORT` = `8080`

### Frontend (Vercel)
1. Import this GitHub repository into Vercel.
2. **Framework Preset:** `Vite`
3. **Root Directory:** `frontend`
4. **Build Command:** `npm run build`
5. **Environment Variables:**
   - `VITE_API_URL` = `https://your-deployed-backend-url.onrender.com`

---

## 📝 License
This project is open-source and available under the MIT License.
