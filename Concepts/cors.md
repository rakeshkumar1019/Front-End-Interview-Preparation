# 🌐 CORS (Cross-Origin Resource Sharing) — Beginner to Advanced

CORS (**Cross-Origin Resource Sharing**) is a security feature implemented by browsers that controls how resources (e.g., APIs, fonts, images) can be requested from a **different origin** (domain, protocol, or port).

---
> Note: CORS is a browser concept, its implemented on browser not in server.so, cors errors only occurs in browser not in server(eg:postman api works but not in broswer)
## 🔹 What is an Origin?

An **origin** is defined by the combination of:
- **Protocol** (http / https)
- **Domain** (example.com)
- **Port** (3000, 8080, etc.)

Example origins:
- `http://localhost:3000`
- `https://myapp.com`
- `http://127.0.0.1:5000`

Two URLs are considered **different origins** if any of these differ.

---

## 🔹 Why CORS Exists?

Without CORS, **any malicious website** could make requests to your backend APIs (e.g., stealing data).  
CORS ensures that only **trusted origins** can access your resources.

---

## 🔹 Simple Example (Node.js + Express)

```js
const express = require("express");
const cors = require("cors");

const app = express();

// Allow all origins (⚠️ not safe for production)
app.use(cors());

app.get("/data", (req, res) => {
  res.json({ message: "Hello World with CORS!" });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
```

---

## 🔹 CORS Response Headers

When a server allows CORS, it sets headers such as:

```http
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

---

## 🔹 Preflight Requests (OPTIONS)

For **non-simple requests** (e.g., `PUT`, `DELETE`, custom headers), the browser first sends a **preflight `OPTIONS` request** to check if the actual request is safe.

Example:
```http
OPTIONS /data HTTP/1.1
Origin: https://myapp.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: Content-Type
```

Server must reply with:
```http
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Methods: PUT
Access-Control-Allow-Headers: Content-Type
```

---

## 🔹 Allowing Multiple Origins

You can **whitelist multiple domains** dynamically.

```js
const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://myapp.com",
  "https://admin.myapp.com"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("❌ CORS not allowed for this origin: " + origin));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 600
};

app.use(cors(corsOptions));
```

✅ Now only requests from allowed origins will succeed.

---

## 🔹 Allowing Subdomains (Regex Example)

Sometimes you want to allow all subdomains, e.g., `*.myapp.com`.

```js
const corsOptions = {
  origin: (origin, callback) => {
    const regex = /\.myapp\.com$/; // matches foo.myapp.com, bar.myapp.com
    if (!origin || regex.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error("❌ CORS not allowed"));
    }
  }
};
app.use(cors(corsOptions));
```

---

## 🔹 Credentials with CORS (Cookies / Auth)

If your frontend needs to send cookies or `Authorization` headers:

Frontend (fetch):
```js
fetch("https://api.myapp.com/data", {
  method: "GET",
  credentials: "include"   // required for cookies / auth headers
});
```

Backend (Express):
```js
const corsOptions = {
  origin: "https://myapp.com",
  credentials: true
};
app.use(cors(corsOptions));
```

Response must include:
```http
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Credentials: true
```

⚠️ **Note:** You cannot use `Access-Control-Allow-Origin: *` with credentials.

---

## 🔹 Common Errors & Fixes

1. **CORS policy: No 'Access-Control-Allow-Origin' header**
   - Fix: Ensure your server sets `Access-Control-Allow-Origin` properly.

2. **CORS not allowed for this origin**
   - Fix: Add the origin to your whitelist.

3. **Credentials flag is true but the header is '*'**
   - Fix: Replace `*` with the exact origin when using cookies/auth.

---

## ✅ Summary

- CORS protects users from malicious cross-origin requests.
- Use `cors` middleware in Express for simplicity.
- Whitelist trusted domains (never allow `*` in production).
- Handle **preflight (OPTIONS)** requests correctly.
- Use **regex or dynamic functions** for advanced origin control.

---

## 📌 Final Notes

- For **development**, you can allow all origins using `app.use(cors())`.
- For **production**, always **whitelist specific origins**.
- Be careful with `credentials: true` and `Access-Control-Allow-Origin: *`.  

---

👨‍💻 With this knowledge, you can confidently implement **CORS** from **beginner to advanced** use cases in Node.js + Express!
