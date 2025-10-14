

## 🚌 VanLife — React Router + MirageJS Project

### 📘 Overview

This project is part of my journey to becoming a **Full-Stack JavaScript Developer**.
I’m currently learning how to build dynamic web applications using **React**, **React Router**, and **MirageJS** for creating mock APIs.

The **VanLife** app simulates a camper van rental platform where users can explore different van options, view detailed information about each van, and understand how client-side routing and mock API data fetching work together in React.

---

## 🚀 What I’ve Learned So Far

### 🧩 1. React Router Fundamentals

I learned how to use **React Router** to create a multi-page experience within a single-page React app:

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
2. Add a route parameter called `productId` to the Route path below:


<Route path="/products/:productId" element={<ProductDetail />} />

------------
3. Add whatever you need to add for the component below to display
   the route parameter in the <h1>

import { useParams } from "react-router-dom"

function ProductDetail() {
    const { productId } = useParams()
    return <h1>Product id is {productId}</h1>
}

## Review Question 2

1. What is the primary reason to use a nested route?
Whenever we have some shared UI between routes in our app.


2. What is a "Layout Route"?
It's the parent route of some nested routes that contains just
the portion of the UI that will be shared. It will use an Outlet
component.


3. What does the <Outlet /> component do? When do you use it?
We use it anytime we have a parent Route that's wrapping 
children routes. It renders the matching child route's
`element` prop given in its route definition


4. What is an "Index Route"?
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
| ---------------------- | ---------------------------------------------------------- |
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
| ------------------------ | --------------------------------------------------- |
| `<Outlet context={...}>` | Pass data from parent route to its children         |
| `useOutletContext()`     | Access that data inside child routes                |
| Scope                    | Only between a parent route and its direct children |
| Common use               | Sharing fetched data, layout info, or handlers      |

---


