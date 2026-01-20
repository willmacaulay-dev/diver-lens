DiverLens is an interactive marine species exploration and aquarium simulation web application.  
Users can browse ocean species in their inhabited depths, build virtual aquariums, and save/share aquarium profiles publicly using a full-stack web platform.

The project is for educational visualization and simulation, enabling users to explore marine biodiversity in an intuitive way.

---

## Features

- **Explore Mode**
  - Browse a large catalog of marine species, ordered and spaced by depth for immersion
  - Dynamic filtering 

- **Aquarium Builder**
  - Add species to a custom virtual aquarium  
  - Adjust environmental settings
  - View simulated compatibility scores for species  

- **Profiles System**
  - Save aquariums as public profiles
  - View and load saved aquarium configurations
  - Full CRUD functionality via backend API

- **Interactive UI**
  - Animated species images  
  - Dynamic lighting effects based on depth  
  - Responsive React Bootstrap layout  

---

## Tech Stack

### Frontend
- **React (Vite)**
- React Bootstrap
- Hosted on **Vercel**

### Backend
- **Node.js + Express**
- Prisma ORM  
- PostgreSQL database (hosted on Supabase)  
- Hosted on **Render**

### Database
- Supabase PostgreSQL  
- Prisma migrations for schema management  

---

## Live Demo

- **Frontend:** https://diver-lens.vercel.app/
- **Backend API:** https://diverlens-api.onrender.com

---

## Local Development Setup

### Prerequisites

- Git
- Node.js
- PostgreSQL (local or Supabase)

---

### 1. Clone the Repository

```
git clone https://github.com/[your-username]/DiverLens.git
cd DiverLens
```

---

### 2. Backend Setup

```
cd Backend
npm install
```

Create a `.env` file in the Backend directory:

```
DATABASE_URL="postgresql://[user]:[password]@[host]:5432/[database]"
PORT=3001
FRONTEND_URL=http://localhost:5173
```

Run Prisma setup:

```
npx prisma generate
npx prisma migrate dev
```

Start the API:

```
npm run dev
```

API will run at:

```
http://localhost:3001
```

---

### 3. Frontend Setup

```
cd ../Frontend
npm install
```

Create `.env`:

```
VITE_API_BASE_URL=http://127.0.0.1:3001
```

Start dev server:

```
npm run dev
```

App will be available at:

```
http://localhost:5173
```

---

## Deployment

### Frontend – Vercel

- Build command: `npm run build`
- Output directory: `dist`
- Environment variable:
  - `VITE_API_BASE_URL = https://diverlens-api.onrender.com`

### Backend – Render

- Web Service (Node)
- Build command:

```
npm install && npx prisma generate
```

- Start command:

```
node src/server.js
```

- Environment variables:
  - `DATABASE_URL`
  - `FRONTEND_URL`

### Database – Supabase

- PostgreSQL instance  
- Prisma used for schema migrations  

---

## API Endpoints

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/api/profiles` | Get all saved aquarium profiles |
| POST | `/api/profiles` | Create a new profile |
| PUT | `/api/profiles/:id` | Update an existing profile |
| DELETE | `/api/profiles/:id` | Delete a profile |

---

## Design Goals

- Make marine biology exploration fun and intuitive  
- Combine education with visual interaction  
- Practice full-stack development with modern tools  
- Create a portfolio-worthy deployed project  

---

## Known Limitations

- Render free tier API may spin down after inactivity, project contains a GitHub Action script to counter this but it might not be consistent
- Search filtering currently client-side only
- Data set is static JSON (future: database-backed species)

---

## Future Improvements

- User authentication  
- User-submitted species  
- Expanded environmental simulation  
- Improved mobile UI for the Explore tool
- Image upload support  
- Streamlined search menu
- Admin dashboard  

---

## Author

**Will Macaulay**  
- GitHub: https://github.com/willmacaulay-dev

---

## License

This project is licensed under the **MIT License**.
