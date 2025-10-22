

## 🚌 VanLife — React Router + MirageJS Project

### 📘 Overview

This project is part of my journey to becoming a **Full-Stack JavaScript Developer**.
I’m currently learning how to build dynamic web applications using **React**, **React Router**, and **MirageJS** for creating mock APIs.

The **VanLife** app simulates a camper van rental platform where users can explore different van options, view detailed information about each van, and understand how client-side routing and mock API data fetching work together in React.

---

## 🚀 What I’ve Learned So Far

### 🧩 1. React Router Fundamentals

I learned how to use **React Router** to create a multipage experience within a single-page React app:

* Setting up `BrowserRouter`, `Routes`, and `Route` components.
* Navigating between pages using the `Link` component instead of anchor tags.
* Structuring pages like:

  * `/` → Home
  * `/about` → About page
  * `/vans` → Vans listing page
  * `/vans/:id` → Van details page

Example:

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/vans" element={<Vans />} />
    <Route path="/vans/:id" element={<VanDetail />} />
  </Routes>
</BrowserRouter>
```

This taught me how **client-side routing** prevents page reloads and creates smooth navigation experiences.

---

### 🔗 2. The `useParams` Hook

I learned that `useParams()` lets you access dynamic URL parameters.
For example, when navigating to `/vans/3`, I can extract that `3` and use it to fetch the matching van from my mock API:

```jsx
import { useParams } from "react-router"

const { id } = useParams()
// id would be "3"
```

This helped me understand how **dynamic routing** works and how it connects UI to specific data.

---

OR 
I can add the link directly in my fetch request like this to dynamically render each page : 

```jsx
const params = useParams()
    const [van, setVan] = useState(null)

    useEffect(() => {
        fetch(`/api/vans/${params.id}`)
            .then(res => res.json())
            .then(data => setVan(data.vans))
    }, [params.id])
```


### 🧠 3. Managing State and Fetching Data

I learned how to use the `useState` and `useEffect` hooks to fetch and display data:

```jsx
const [vans, setVans] = useState([])

useEffect(() => {
  fetch("/api/vans")
    .then(res => res.json())
    .then(data => setVans(data.vans))
}, [])
```

This taught me about:

* Setting initial state for lists (`[]`) and single objects (`null`).
* Rendering data conditionally while it’s loading.
* Avoiding errors by using sensible default state values.

---

### ⚙️ 4. Using MirageJS to Mock an API

I set up a **mock backend** using MirageJS.
This allows my app to simulate API requests locally — no external server needed.

```js
import { createServer, Model } from "miragejs"

createServer({
  models: {
    vans: Model,
  },

  seeds(server) {
    server.create("van", {
      id: "1",
      name: "Modest Explorer",
      price: 60,
      imageUrl: "...",
      type: "simple",
      description: "A van designed to get you out into nature."
    })
    // ... more vans
  },

  routes() {
    this.namespace = "api"

    this.get("/vans", (schema) => schema.vans.all())
    this.get("/vans/:id", (schema, request) => schema.vans.find(request.params.id))
  }
})
```

This taught me:

* How APIs deliver data in JSON format.
* How to structure and organize API endpoints.
* How the frontend communicate with backends through routes.

---

### 🧭 5. Component-Based Architecture

I structured my app using **reusable components**:

* `main.jsx` → Root layout with `<header>` and navigation links.
* `App.jsx` → Landing page.
* `About.jsx` → About page with image and description.
* `Vans.jsx` → Displays list of vans.
* `VanDetail.jsx` → Shows a single van’s detailed info.

Each page focuses on one specific concern — helping me learn **separation of concerns** and **clean component design**.

---

### 🎨 6. Styling and Layout

I applied custom CSS to give the project a professional look:

* Global resets with `box-sizing: border-box`.
* Gradient backgrounds for the home page.
* Centered buttons using `display: flex; justify-content: center;`.
* Styled links and hover transitions for a better user experience.

This helped me practice how to combine **CSS layout techniques** with React components.

---

### 🧰 7. Debugging Common React Issues

Through trial and error, I learned to fix:

* Route path mismatches (`/vans/:id` vs `/vans`).
* Fetching errors (wrong endpoints or MirageJS namespace issues).
* Visibility issues (text blending with background).
* Understanding when to use arrays (`[]`) vs `null` in state.

These challenges taught me to read React errors carefully and think logically about data flow.

---

## 💡 Key Takeaways

* **React Router** enables seamless client-side navigation.
* **MirageJS** is perfect for simulating a real backend while learning frontend development.
* **State management** and **hooks** (`useState`, `useEffect`, `useParams`) are essential for interactive apps.
* Organizing components and styling properly leads to cleaner, maintainable projects.
* Debugging is part of the learning process — and helps solidify understanding.

---

## 📚 Next Steps

Here’s what I plan to learn next:

1. Add loading and error states to API requests.
2. Learn **nested routes** and **layout routes** in React Router.
3. Introduce **Context API** for global state management.
4. Connect to a **real backend API** (e.g., Node.js/Express or Firebase).
5. Deploy the app on **Netlify** or **Vercel**.

---

## 🧑‍💻 Technologies Used

* **React**
* **React Router**
* **MirageJS**
* **JavaScript (ES6+)**
* **HTML5 & CSS3**

---

## Review Questions 

1. What is a route/url parameter?
A portion of our route path that is a placeholder for what will eventually
be the actual segment in the URL of the page.

------------
1. Add a route parameter called `productId` to the Route path below:


<Route path="/products/:productId" element={<ProductDetail />} />

------------
1. Add whatever you need to add for the component below to display
   the route parameter in the <h1>

import { useParams } from "react-router-dom"

function ProductDetail() {
    const { productId } = useParams()
    return <h1>Product id is {productId}</h1>
}

## Review Question 2

1. What is the primary reason to use a nested route?
Whenever we have some shared UI between routes in our app.


1. What is a "Layout Route"?
It's the parent route of some nested routes that contains just
the portion of the UI that will be shared. It will use an Outlet
component.


1. What does the <Outlet /> component do? When do you use it?
We use it anytime we have a parent Route that's wrapping 
children routes. It renders the matching child route's
`element` prop given in its route definition


1. What is an "Index Route"?
It's the "default route" we want to render when the path
of the parent route matches. It gives us a chance to render
an element inside the parent's <Outlet /> at the same path
as the parent route.


-----------------------------------------------------------------------------

## 🧩 What `<Outlet />` does

`<Outlet />` is a **placeholder** that tells React Router:

> “Render any child route that matches **inside this component**.”

Think of it like a **portal** or **hole** in your parent route’s layout where the nested route content should appear.

---

### 🧠 Analogy

Imagine you have a parent page (like a van’s main page):

```
HostVanDetail
--------------------
Header
<Outlet /> 👈 placeholder for child route
Footer
```

If the user visits:

* `/host/vans/1` → the `<Outlet />` stays **empty** (just shows the main details)
* `/host/vans/1/pricing` → React Router **fills the `<Outlet />`** with the `HostVanPricing` component
* `/host/vans/1/photos` → the `<Outlet />` gets replaced with `HostVanPhotos`

So `<Outlet />` dynamically swaps what’s inside depending on which nested route is active.

---

### 🧭 Visual example

**App.jsx**

```jsx
<Route path="host/vans/:id" element={<HostVanDetail />}>
  <Route path="pricing" element={<HostVanPricing />} />
  <Route path="photos" element={<HostVanPhotos />} />
</Route>
```

**HostVanDetail.jsx**

```jsx
function HostVanDetail() {
  return (
    <div>
      <h1>Van Details</h1>
      <nav>
        <Link to="pricing">Pricing</Link>
        <Link to="photos">Photos</Link>
      </nav>

      {/* 🔽 The nested route renders here */}
      <Outlet />
    </div>
  );
}
```

**HostVanPricing.jsx**

```jsx
export default function HostVanPricing() {
  return <h3>Pricing info goes here</h3>;
}
```

**HostVanPhotos.jsx**

```jsx
export default function HostVanPhotos() {
  return <h3>Photos go here</h3>;
}
```

---

### 🧩 Result in the browser

| URL                    | Components rendered                                        |
|------------------------|------------------------------------------------------------|
| `/host/vans/1`         | `<HostVanDetail>` only                                     |
| `/host/vans/1/pricing` | `<HostVanDetail>` + `<HostVanPricing>` inside `<Outlet />` |
| `/host/vans/1/photos`  | `<HostVanDetail>` + `<HostVanPhotos>` inside `<Outlet />`  |

---

### 🔁 TL;DR

`<Outlet />` = “show the matching child route’s component **here**.”

It lets parent components display shared layouts (like headers, navbars, sidebars) **around** nested pages.

---

-----------------------------------------------------------------------------

## 🧩 What is `Outlet context`?

When you use nested routes, you often want to **share data from a parent route** (the one that contains the `<Outlet />`) **to its child routes**.

React Router gives you a simple built-in way to do this using the **Outlet context**.

---

### 🧠 Analogy

Think of it like a **mini version of React Context**, but **only between a parent route and its children** — not the whole app.

You don’t have to use `React.createContext()` or `useContext()` —
you just pass the data through the `<Outlet />`.

---

## 🧠 How it works

### 👇 Step 1: Pass context through the `<Outlet />`

In your **parent component** (for example, `HostVanDetail.jsx`):

```jsx
import { Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function HostVanDetail() {
  const { id } = useParams();
  const [currentVan, setCurrentVan] = useState(null);

  useEffect(() => {
    fetch(`/api/host/vans/${id}`)
      .then(res => res.json())
      .then(data => setCurrentVan(data.vans));
  }, [id]);

  if (!currentVan) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>{currentVan.name}</h2>
      {/* 👇 Pass data to nested routes here */}
      <Outlet context={{ currentVan }} />
    </div>
  );
}
```

Here, we’re passing `{ currentVan }` down to any nested routes.

---

### 👇 Step 2: Receive context in a child route

In your **child component** (for example, `HostVanPricing.jsx`):

```jsx
import { useOutletContext } from "react-router-dom";

export default function HostVanPricing() {
  const { currentVan } = useOutletContext(); // 👈 access the passed context
  return <h3>${currentVan.price}/day</h3>;
}
```

That’s it — no prop drilling, no global context needed.

---

## 🧭 Why it’s useful

Without `Outlet context`, you’d have to:

* Pass props manually through routes (not supported)
* Fetch the same data again in every nested component (wasteful)
* Use global context unnecessarily

With `Outlet context`, you:
✅ Fetch once in the parent
✅ Share easily with children
✅ Keep routes clean and efficient

---

### 🧩 Another Example

Say you have:

```
/host/vans/:id → HostVanDetail (fetches data)
/host/vans/:id/photos → HostVanPhotos (needs that same van)
```

Instead of fetching the van twice, you can share it like this:

**HostVanDetail.jsx**

```jsx
<Outlet context={{ currentVan }} />
```

**HostVanPhotos.jsx**

```jsx
import { useOutletContext } from "react-router-dom";

export default function HostVanPhotos() {
  const { currentVan } = useOutletContext();
  return <img src={currentVan.imageUrl} alt={currentVan.name} />;
}
```

---

### ⚡ Summary

| Concept                  | Description                                         |
|--------------------------|-----------------------------------------------------|
| `<Outlet context={...}>` | Pass data from parent route to its children         |
| `useOutletContext()`     | Access that data inside child routes                |
| Scope                    | Only between a parent route and its direct children |
| Common use               | Sharing fetched data, layout info, or handlers      |

-------------------------------------------------------------------------------



---

# 🚐 React Router Filtering with `useSearchParams`

This project demonstrates how to use React Router’s `useSearchParams()` hook to manage **URL query parameters** for filtering and navigation in a React application.

You’ll learn two main approaches:

1. Using the `<Link>` component to filter via navigation.
2. Using the `setSearchParams()` function to filter programmatically.

---

## 🧭 Overview

`useSearchParams()` is a React Router hook that allows you to **read and modify the query string** in the URL (e.g., `?type=simple`).

It returns an array with two values:

```js
const [searchParams, setSearchParams] = useSearchParams();
```

* `searchParams` → used to read parameters
* `setSearchParams` → used to update them

This makes it perfect for **filtering, sorting, and pagination** features.

---

## ⚙️ 1. Filtering with `<Link>`

This approach uses **React Router Links** to change the URL query parameter when a user clicks a button.
It’s simple, declarative, and great for static filter options.

### 🧩 Example:

```jsx
import { Link, useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';

export default function Vans() {
  const [searchParams] = useSearchParams();
  const [vans, setVans] = useState([]);

  const typeFilter = searchParams.get('type');

  useEffect(() => {
    fetch("/api/vans")
      .then(res => res.json())
      .then(data => setVans(data.vans));
  }, []);

  const displayedVans = typeFilter
    ? vans.filter(van => van.type === typeFilter)
    : vans;

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>

      {/* Filter Links that update query string */}
      <div className="van-list-filter-buttons">
        <Link to="?type=simple" className="van-type simple">Simple</Link>
        <Link to="?type=luxury" className="van-type luxury">Luxury</Link>
        <Link to="?type=rugged" className="van-type rugged">Rugged</Link>
        <Link to="." className="van-type clear">Clear</Link>
      </div>

      <div className="van-list">
        {displayedVans.map(van => (
          <div key={van.id}>
            <h3>{van.name}</h3>
            <p>${van.price}/day</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### ✅ How It Works

* Each `<Link>` updates the browser’s query string (`?type=simple`).
* `useSearchParams()` detects this change.
* The component re-renders automatically and filters vans based on the selected type.

**Best For:**
➡️ Static filters or navigation links (simple, clean UI).

---

## ⚙️ 2. Filtering with `setSearchParams()`

This approach uses a **function call** to update the query parameters dynamically.
It gives you more control and works well with dropdowns, buttons, or other custom UI events.

### 🧩 Example:

```jsx
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vans, setVans] = useState([]);

  const typeFilter = searchParams.get('type');

  useEffect(() => {
    fetch("/api/vans")
      .then(res => res.json())
      .then(data => setVans(data.vans));
  }, []);

  const displayedVans = typeFilter
    ? vans.filter(van => van.type === typeFilter)
    : vans;

  // Update the URL query param programmatically
  function handleFilterChange(type) {
    if (type) {
      setSearchParams({ type }); // sets ?type=simple, ?type=luxury, etc.
    } else {
      setSearchParams({}); // clears all filters
    }
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>

      {/* Filter buttons using setSearchParams */}
      <div className="van-list-filter-buttons">
        <button onClick={() => handleFilterChange('simple')}>Simple</button>
        <button onClick={() => handleFilterChange('luxury')}>Luxury</button>
        <button onClick={() => handleFilterChange('rugged')}>Rugged</button>
        <button onClick={() => handleFilterChange(null)}>Clear</button>
      </div>

      <div className="van-list">
        {displayedVans.map(van => (
          <div key={van.id}>
            <h3>{van.name}</h3>
            <p>${van.price}/day</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### ✅ How It Works

* Clicking a button triggers `setSearchParams()`.
* The URL updates immediately (e.g., `?type=luxury`).
* The component re-renders with filtered data.

**Best For:**
➡️ Dynamic filters, interactive forms, or real-time search.


## 🧠 Key Takeaways

* Both approaches **update the browser URL** and **trigger a re-render** automatically.
* `useSearchParams()` keeps the UI state **in sync with the URL**, making your filters shareable and bookmarkable.
* Choose **`Link`** for simple static filters, and **`setSearchParams()`** for dynamic interactions.

---

## 💡 Bonus Tip

You can **combine both**:

* Use `<Link>` for main category filters.
* Use `setSearchParams()` for advanced dynamic filters (like price range or sort order).

---------------------------------------------------------------------------------------------------------------------------------------------------------------


1. 404 (Not Found) Route

Learned how to use the wildcard (*) path in React Router.

Implemented a custom NotFound component:

import { Link } from "react-router"

export default function NotFound() {
  return (
    <>
      <h1>Sorry, Page Not Found</h1>
      <Link to="/">Click here to return to the main page</Link>
    </>  )
}


Added this route at the end of the <Routes> list:

<Route path="*" element={<NotFound />} />


✅ Ensures that any unmatched route displays the 404 page.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------


## 🧠 What I Learned Today

### 1. Modern React Router Setup

In React Router v6.4+, instead of wrapping routes with `<BrowserRouter>` and `<Routes>`, we now use three main tools:

* **`createBrowserRouter()`** → creates the main router
* **`createRoutesFromElements()`** → allows us to write routes using JSX
* **`RouterProvider`** → renders the router in our app

#### 🧩 Example:

```jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";

import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans from "./pages/Vans";
import VanDetail from "./pages/VanDetail";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="vans" element={<Vans />} />
      <Route path="vans/:id" element={<VanDetail />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
```

This setup helps manage routes more cleanly and supports features like **data loading, error handling, and nested routes**.

---

### 2. Nested Routes and `<Outlet />`

Nested routes allow you to group related pages under one layout.
For example, in a **VanLife** project, all host routes can share the same layout.

#### 🧩 Example:

```jsx
<Route path="host" element={<HostLayout />}>
  <Route index element={<HostDashboard />} />
  <Route path="vans" element={<HostVans />} />
  <Route path="vans/:id" element={<HostVanDetail />}>
    <Route index element={<HostVanInfo />} />
    <Route path="pricing" element={<HostVanPricing />} />
    <Route path="photos" element={<HostVanPhotos />} />
  </Route>
</Route>
```

Inside `HostLayout.jsx`, you use:

```jsx
import { Outlet } from "react-router-dom";

export default function HostLayout() {
  return (
    <div>
      <nav>/* host nav links here */</nav>
      <Outlet /> {/* Renders child routes here */}
    </div>
  );
}
```

This lets all host pages share the same header or sidebar.

---

### ✅ In Short

Today I learned how to:

* Set up **modern React Router** using `createBrowserRouter`, `createRoutesFromElements`, and `RouterProvider`.
* Build **nested routes** that use `<Outlet />` to display child pages inside parent layouts.
* Organize routes better for large apps like the **VanLife project**.

--------------------------------------------------------------------------------------------------------
1. When does the code in a loader function run?

Before the route change happens and the component for that route loads


2. What are some benefits of using a data loader function
   instead of fetching our data in a useEffect in a component?

    * Don't need to worry about handling loading state in the
      component
    * Don't need to have lengthy/confusing useEffect code in our
      component
    * Don't need to handle error state in the component


3. What change do we need to make to our BrowserRouter before
   we can use loaders (or any of the new data-layer API features)
   in our app?

   Get rid of the BrowserRouter component and use
   createBrowserRouter() instead. Can use
   createRoutesFromElements() to make the transition a bit easier



4. What are the steps we need to take in order to use
   a loader on any given route?

    1. Define and export a loader function
    2. Import the loader and pass it to the route we're wanting
       to fetch data for
    3. Use the useLoaderData() hook to get the data from the loader
       function.


    *** Check the Vans component for more details ***

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Protected Routes and Actions in React Router 

1. How did we change our route definitions in order to
   "protect" certain routes from an un-logged-in user?

Wrapped the routes we wanted to protect in a Layout route
that contains logic to redirect someone if they're not logged
in


2. What component can we use to automatically send someone
   to a different route in our app?

<Navigate to="/login" />


3. What component can we render if the user IS logged in?

<Outlet />



-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------





# 🧭 Understanding useParams() vs useSearchParams() in React Router

This section explains the key differences between **`useParams()`** and **`useSearchParams()`** in React Router.  
Both hooks allow you to access parts of the URL inside your React components, but they serve very different purposes.

---

## 📌 Overview

In React Router, the URL can carry two types of data:
1. **Path parameters** — dynamic segments in the route path.
2. **Query parameters** — key-value pairs after the `?` symbol in the URL.

React Router provides two different hooks to handle these:
- `useParams()` → for **path parameters**
- `useSearchParams()` → for **query parameters**

---

## ⚙️ 1. useParams()

### 🔍 Purpose
`useParams()` allows you to access **dynamic route parameters** defined in your route path using a colon (`:`).  
These parameters are part of the actual path structure.

### 🧩 Example

#### Route Definition
```jsx
<Route path="/vans/:id" element={<VanDetail />} />
````

#### Example URL

```
/vans/123
```

#### Inside the Component

```jsx
import { useParams } from "react-router-dom";

function VanDetail() {
  const { id } = useParams();
  return <h1>Van ID: {id}</h1>;
}
```

#### Output

```
Van ID: 123
```

### 🧠 Key Points

* Retrieves **path variables** (like `/users/:userId`)
* Values are taken **from the URL path itself**
* Commonly used for **dynamic pages** (e.g., product details, user profiles)

---

## ⚙️ 2. useSearchParams()

### 🔍 Purpose

`useSearchParams()` allows you to read and manipulate **query string parameters** — the part of the URL after the `?`.

### 🧩 Example

#### Example URL

```
/login?message=Please%20log%20in%20to%20continue
```

#### Inside the Component

```jsx
import { useSearchParams } from "react-router-dom";

function Login() {
  const [searchParams, setSearchParams] = useSearchParams();
  const message = searchParams.get("message");

  return (
    <div>
      {message && <p style={{ color: "red" }}>{message}</p>}
      <h2>Login Page</h2>
    </div>
  );
}
```

#### Output

```
Please log in to continue
Login Page
```

### 🧠 Key Points

* Retrieves **query parameters** (`?key=value`)
* Useful for **search filters**, **alerts**, or **redirect messages**
* You can also update the query string using `setSearchParams()`

---

## 📊 Comparison Table

| Feature          | `useParams()`                | `useSearchParams()`                  |
| ---------------- | ---------------------------- | ------------------------------------ |
| Data Source      | URL Path                     | Query String                         |
| URL Example      | `/vans/123`                  | `/login?message=Welcome`             |
| Accessed Value   | `{ id: "123" }`              | `"Welcome"`                          |
| Return Type      | Object                       | `[URLSearchParams, setSearchParams]` |
| Common Use Cases | Dynamic routes, detail pages | Filters, messages, search            |
| Editable?        | ❌ No                         | ✅ Yes, using `setSearchParams()`     |

---

## 💡 Example: Using Both Together

Sometimes, you may want both path and query parameters in the same component.

```jsx
// URL: /vans/123?sort=asc
import { useParams, useSearchParams } from "react-router-dom";

function VanDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const sortOrder = searchParams.get("sort");

  return (
    <div>
      <h2>Van ID: {id}</h2>
      <p>Sort order: {sortOrder}</p>
    </div>
  );
}
```

---

## 🧠 Summary

* **`useParams()`** → Reads route parameters (`/vans/:id`)
* **`useSearchParams()`** → Reads query parameters (`?sort=asc`)
* Use both for clean, dynamic, and URL-driven UIs
* Both hooks help keep your app state **synchronized with the browser URL**

---

## 🧩 Practical Example in Context

In a protected route scenario:

* The `requireAuth()` function may redirect unauthorized users to `/login?message=Please%20log%20in`.
* The `Login` component then reads this message using `useSearchParams()` and displays it to the user.

This approach provides a better **user experience** and helps users understand **why they were redirected.**

---

