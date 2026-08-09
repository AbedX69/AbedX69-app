# E-Commerce Platform

A full-stack e-commerce application — product catalogue, user accounts, ordering, and an admin dashboard — built as my final project for a BSc in Computer Science at Ramat Gan Academic College.

React front-end over an Express REST API, with MongoDB for persistence.

---

## Stack

| Layer | Technology |
|---|---|
| Front-end | React 18, Vite, React Router, Axios |
| Back-end | Node.js, Express, Mongoose |
| Database | MongoDB |
| File uploads | Multer, served as static assets |

---

## Features

- **Accounts** — signup and sign-in, with the session held in a React context and shared across the app
- **Protected routes** — authenticated-only pages guarded at the router level
- **Catalogue** — product listing and individual product pages
- **Product creation** — including image upload, stored server-side and served statically
- **Orders** — order placement and an order view, with sequential order numbering
- **Admin dashboard** — separate admin surface backed by its own route group

---

## Project structure

```
.
├── backend/
│   ├── models/          # Mongoose schemas: User, Product, Order, Counter
│   ├── routes/          # userRoutes, productRoutes, orderRoutes, adminRoutes
│   ├── uploads/         # uploaded product images (served statically)
│   └── server.js        # Express app, middleware, DB connection, route mounting
└── frontend/
    └── src/
        ├── components/  # Header, Footer, FloatingShapes
        ├── context/     # UserContext — auth state shared across the tree
        ├── pages/       # Welcome, Product, Item, Order, CreateProduct, AdminDashboard, SignIn, Signup
        ├── ProtectedRoute.jsx
        └── App.jsx
```

---

## API

The Express server mounts four route groups plus a static path for uploaded images:

| Base path | Responsibility |
|---|---|
| `/api/users` | Registration, authentication, user records |
| `/api/products` | Product CRUD and catalogue queries |
| `/api/orders` | Order creation and retrieval |
| `/api/admin` | Admin-only operations |
| `/uploads` | Static serving of uploaded product images |

Each group lives in its own module under `backend/routes/`, so the entry point stays a wiring file rather than a place where logic accumulates.

---

## Running locally

**Prerequisites:** Node.js 18+ and a MongoDB instance (local `mongod` or a hosted connection string).

**1. Clone and install**

```bash
git clone https://github.com/AbedX69/AbedX69-app.git
cd AbedX69-app
npm install --prefix backend
npm install --prefix frontend
```

**2. Configure the backend**

Create `backend/.env`:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

This file is git-ignored and must never be committed.

**3. Run**

```bash
# terminal 1
npm run dev --prefix backend      # API on http://localhost:5000

# terminal 2
npm run dev --prefix frontend     # Vite dev server on http://localhost:5173
```

---

## Design notes

**Why the API contract came first.** The part of this project I spent the most time on was the boundary between the client and the server — deciding the endpoint structure, the shape of requests and responses, and where validation and error handling belonged. Settling that early meant the front-end could be built against a stable interface instead of one that shifted every time the backend changed. That turned out to matter more than any individual feature.

**Sequential order numbers.** MongoDB's ObjectIds are not sequential, so a dedicated `Counter` collection issues incrementing order numbers. Human-readable order references are worth a small amount of extra machinery.

**Auth state in context rather than prop-drilling.** `UserContext` holds the session so that `ProtectedRoute` and the header can both read it without threading state through intermediate components.

---

## Known limitations

Being straightforward about where this stands, since it was a degree project rather than production software:

- **No automated tests.** The most valuable thing I'd add next.
- **Uploads are stored on the server's local disk**, which does not survive a redeploy and would not work across multiple instances. Object storage is the right answer.
- **The front-end `package.json` carries backend dependencies** (`express`, `mongoose`) that it does not use — a leftover from initialising both halves from one place.
- **No input validation layer.** Validation is handled ad hoc in route handlers rather than through schema validation middleware.

---

## Author

**Abedallh Nashef** — [github.com/AbedX69](https://github.com/AbedX69)
