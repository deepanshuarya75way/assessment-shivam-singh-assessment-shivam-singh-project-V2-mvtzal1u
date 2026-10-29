# Modern Fullstack MERN Publishing & Community Platform

A developer-friendly publishing engine built on the MERN stack. Designed with a block-style composition interface, nested discussion hierarchies, reactive notifications, and cloud media pipelines, Chronicle delivers a frictionless reading and writing experience.

---

## 📸 Key Capabilities

- **Block-Based Rich Text Editor:** Powered by `@editorjs`, supporting custom headers, quotes, nested lists, and inline media assets.
- **Dual Cloud Media Uploads:** AWS S3 pre-signed URL ingestion pipeline (`aws.jsx`) for fast image uploads directly from the client.
- **Unified Identity Flow:** Dual authentication combining standard email/password encryption via `bcrypt` and Google OAuth 2.0 integration through Firebase Admin SDK.
- **Hierarchical Discussions:** Multi-tiered comment nesting with real-time reply threads and soft moderation flags.
- **Interactive Notification Center:** Read/unread interaction feeds tracking upvotes, blog responses, and system alerts.
- **Author Control Plane:** Comprehensive personal dashboard to monitor blog performance, view draft/published state, search posts, and adjust profile metadata.
- **Polished Presentation:** Styled using Tailwind CSS with mobile-first breakpoints and smooth page transition animations.

---

## 🏗️ Architecture & Directory Blueprint

```
mern-blogging-website-main/
│
├── bloggingWebsiteFrontend/          # Client (React 18 + Vite + Tailwind CSS)
│   ├── public/
│   ├── src/
│   │   ├── common/                   # AWS S3, Firebase, animations, session state
│   │   ├── components/               # Modular UI (Editor, Navbar, Comments, Cards)
│   │   ├── pages/                    # Route views (Home, Blog, Dashboard, Profile, Auth)
│   │   ├── App.jsx                   # Global route declaration & state providers
│   │   └── main.jsx                  # Entry point
│   ├── tailwind.config.js            # Design tokens & styling configuration
│   └── vite.config.js                # Vite build settings
│
├── server/                           # Backend (Node.js + Express + MongoDB)
│   ├── Schema/                       # Mongoose Schemas (User, Blog, Comment, Notification)
│   │   ├── Blog.js
│   │   ├── Comment.js
│   │   ├── Notification.js
│   │   └── User.js
│   ├── requests.rest                 # REST API testing endpoints
│   └── server.js                     # Server bootstrap, middleware, and route registry
│
└── .github/workflows/deploy.yml      # CI/CD deployment automation pipeline
```

---

## 🛠️ Technology Stack

| Domain | Selected Framework / Tool |
| :--- | :--- |
| **Frontend Framework** | React 18, Vite |
| **Styling & Motion** | Tailwind CSS, PostCSS, Framer-style Page Transitions |
| **Authoring Engine** | Editor.js (Headers, Lists, Embeds, Inline Tools) |
| **Backend Runtime** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **Authentication** | JWT (JSON Web Tokens), Firebase Admin SDK |
| **API Testing & CI/CD** | VS Code REST Client (`requests.rest`), GitHub Actions |

---

## ⚡ Local Development Setup

### 1. Prerequisites
Ensure you have the following installed locally:
- **Node.js** (v18.x or higher)
- **npm** or **yarn**
- A **MongoDB Atlas** database cluster (or local MongoDB daemon)
- An **AWS S3** bucket (for cover images and inline assets)
- A **Firebase Project** service account key

---

### 2. Backend Installation & Environment Config

1. Open your terminal and navigate to the `server` directory:
   ```bash
   cd mern-blogging-website-main/server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory:
   ```env
   PORT=3000
   DB_LOCATION=mongodb+srv://<username>:<password>@cluster.mongodb.net/blog-db?retryWrites=true&w=majority
   SECRET_ACCESS_KEY=your_jwt_secret_key

   # AWS S3 Bucket Setup (for direct image uploads)
   AWS_ACCESS_KEY=your_aws_access_key_id
   AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
   AWS_BUCKET_NAME=your_s3_bucket_name
   AWS_REGION=your_aws_region
   ```
4. Place your Firebase Service Account JSON credentials inside the `server/` root (or reference your downloaded JSON file matching the filename initialized in `server.js`).

5. Start the backend server:
   ```bash
   # Development mode (nodemon)
   npm run dev

   # Production mode
   npm start
   ```
   *The server will listen on `http://localhost:3000`.*

---

### 3. Frontend Installation & Environment Config

1. Open a second terminal window and navigate to the frontend folder:
   ```bash
   cd mern-blogging-website-main/bloggingWebsiteFrontend
   ```
2. Install node modules:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `bloggingWebsiteFrontend` directory:
   ```env
   VITE_SERVER_DOMAIN=http://localhost:3000
   ```
4. Launch the Vite development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to the URL shown in your terminal (typically `http://localhost:5173`).

---

## 🧪 API Verification & Testing

The server directory includes a ready-to-use testing file:
- **`server/requests.rest`**: Pre-configured HTTP queries for authentication, post publishing, and comment handling.
- Open this file with the [REST Client extension for VS Code](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) to test your endpoints without running Postman.

---

## 📜 Database Schemas Overview

- **User (`User.js`):** Personal metadata, social profiles, role indicators, and references to authored blogs.
- **Blog (`Blog.js`):** Structured block JSON representation, banner images, tag arrays, read activity counters, and soft-delete states.
- **Comment (`Comment.js`):** Tree structures holding references to parent comments, target blog posts, and commenter user data.
- **Notification (`Notification.js`):** Tracks incoming user engagements (likes, comments, replies) with boolean status tracking (`seen: true/false`).

---


