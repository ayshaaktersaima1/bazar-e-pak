# API Hook & Server API Guide

## Files

```text
src/
├── hooks/
│   └── use-api.jsx
│
└── lib/
    └── api/
        └── server.js
```

## `use-api.jsx`

**Purpose:** Client Components-এর জন্য centralized API handler।

**Features:**

- Automatic Better Auth token
- GET / POST / PUT / PATCH / DELETE
- `auth: false` support
- Automatic JSON handling
- Automatic API error handling
- `react-hot-toast` success/error
- No repeated `fetch()` / headers / token code

### Usage

```jsx
const api = useApi();
```

### GET

```jsx
const users = await api.get("/api/users");
```

### POST

```jsx
await api.post("/api/products", productData);
```

### PUT

```jsx
await api.put(`/api/products/${id}`, productData);
```

### PATCH

```jsx
await api.patch(`/api/users/${id}/status`, { isBlocked: true });
```

### DELETE

```jsx
await api.delete(`/api/products/${id}`);
```

### Success Toast

```jsx
await api.post(
  "/api/products",
  productData,
  {},
  {
    showSuccess: true,
    successMessage: "Product created successfully",
  },
);
```

### Public API

Token লাগবে না:

```jsx
await api.get(
  "/api/categories",
  {},
  {
    auth: false,
  },
);
```

**Default:** `auth: true`

---

## `server.js`

**Purpose:** Server Components-এর জন্য centralized API handler।

**Features:**

- Server-side Better Auth token
- GET / POST / PUT / PATCH / DELETE
- `auth: false` support
- Automatic JSON handling
- Automatic API error handling
- `cache: "no-store"`
- No repeated token / headers / fetch code

### Import

```js
import { serverApi } from "@/lib/api/server";
```

### GET

```js
const users = await serverApi.get("/api/users");
```

### POST

```js
const product = await serverApi.post("/api/products", productData);
```

### PUT

```js
const product = await serverApi.put(`/api/products/${id}`, productData);
```

### PATCH

```js
await serverApi.patch(`/api/users/${id}/status`, { isBlocked: true });
```

### DELETE

```js
await serverApi.delete(`/api/products/${id}`);
```

### Public API

```js
const categories = await serverApi.get(
  "/api/categories",
  {},
  {
    auth: false,
  },
);
```

---

## Auth Behavior

```text
Default
auth: true
→ Better Auth token automatically added

Public API
auth: false
→ Token is not requested/sent
```

## Request Structure

```text
Client Component
    ↓
useApi()
    ↓
Better Auth token
    ↓
API Request
    ↓
Backend

Server Component
    ↓
serverApi
    ↓
Better Auth token
    ↓
API Request
    ↓
Backend
```

## Rule

**Client Component → `useApi()`**

**Server Component → `serverApi`**

**Protected API → default `auth: true`**

**Public API → `auth: false`**

**No manual token/header handling in components.**
