> A full-stack application with a **React.js** frontend and a **Node.js** backend, organized using the MVC (Model-View-Controller) monolith architecture.

---

## 📁 Folder Structure

```
├── client/           # Frontend (React.js)
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.js
│       ├── index.js
│       └── routes.js
│
├── server/           # Backend (Node.js, MVC)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── views/
│   ├── config/
│   ├── src
│   └── package.json
│
├── README.md
└── ...
```

---

## 🖥️ Frontend (`client/`)

- **Framework:** [React.js](https://reactjs.org/)
- **Description:** Contains all the code for the user interface, including components, pages, assets, and styling.

### Setup

```bash
cd client
npm install
npm start
```

- Runs the React development server at `http://localhost:5173` (default).

---

## ⚙️ Backend (`server/`)

- **Runtime:** [Node.js](https://nodejs.org/)
- **Architecture:** MVC Monolith
    - **Models:** Data structures and database interactions.
    - **Views:** Server-rendered templates (if any).
    - **Controllers:** Business logic and route handlers.
    - **Routes:** API endpoints.
- **Description:** Handles all API requests, business logic, and data management.

### Setup

```bash
cd server
npm install
npm run dev
```

- Runs the Node.js server (default: `http://localhost:3000`).

---

## 🚀 Getting Started

1. **Clone the repository**
    ```bash
    git clone [<repo-url>](https://github.com/Abhishek-Jaiswar/authsys)
    cd authsys
    ```

2. **Install dependencies**
    - For frontend: `cd client && npm install`
    - For backend: `cd server && npm install`

3. **Start the servers**
    - Start backend first: `cd server && npm run dev`
    - Then start frontend: `cd client && npm run dev`

4. **Access the app**
    - Frontend: [http://localhost:5173](http://localhost:5173)
    - Backend API: [http://localhost:3000](http://localhost:3000)

---

## 📝 Notes

- **Proxy Setup:** The React app may proxy API requests to the backend server (see `client/package.json` for `proxy` field).
- **Environment Variables:** Configure `.env` files in `client/` and `server/` for environment-specific settings.
- **Build & Deploy:** Production builds can be made with `npm run build` in `client/` and deployed alongside the backend.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](LICENSE)

---
