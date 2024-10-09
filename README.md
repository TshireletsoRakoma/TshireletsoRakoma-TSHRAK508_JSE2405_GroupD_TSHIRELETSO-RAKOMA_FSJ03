
# MyProductStore

MyProductStore is an e-commerce platform built using **Next.js**, **Firebase**, **Firestore**, and **React**. The platform features user authentication, product filtering, pagination, shopping cart functionality, and responsive design. This project uses Firebase Authentication to manage user sessions and provides product data fetched from Firestore.

NEXT_PUBLIC_USER_EMAIL=tshirejohanes614@yahoo.com
NEXT_PUBLIC_USER_PASSWORD=Tshire*01


## Table of Contents

- [Project Setup](#project-setup)
- [Firebase Configuration](#firebase-configuration)
- [Authentication](#authentication)
  - [WithAuth HOC](#withauth-hoc)
  - [Authentication Hook](#authentication-hook)
- [Product Fetching](#product-fetching)
  - [Fetching All Products](#fetching-all-products)
  - [Fetching Product by ID](#fetching-product-by-id)
- [Features](#features)
- [Components](#components)
  - [Header](#header)
  - [Pagination](#pagination)
  - [ImageGallery](#imagegallery)
  - [Filter](#filter)
  - [ErrorBoundary](#errorboundary)
  - [Home](#home)
  - [Product Details](#product-details)
- [API Integration](#api-integration)
- [Custom Hooks](#custom-hooks)
- [Error Handling](#error-handling)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

---

## Project Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd project-directory
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file and add your Firebase credentials:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

---

## Firebase Configuration

1. **Firebase Initialization:**

   Firebase is initialized in `firebaseConfig.js`:

   ```javascript
   import { initializeApp } from 'firebase/app';

   const firebaseConfig = {
     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
   };

   const app = initializeApp(firebaseConfig);
   export default app;
   ```

2. **Firestore Setup:**

   Ensure your Firestore rules allow necessary read access:

   ```plaintext
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;  // Development use only
       }
     }
   }
   ```

---

## Authentication

### WithAuth HOC

The `WithAuth` Higher-Order Component (HOC) protects specific pages that require authentication. It uses Firebase Authentication and redirects users to the login page if they are not authenticated.

```javascript
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebaseConfig';

const WithAuth = (Component) => {
  return function AuthenticatedComponent(props) {
    const router = useRouter();

    useEffect(() => {
      const auth = getAuth(app);
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          router.push('/auth');
        }
      });

      return () => unsubscribe();
    }, [router]);

    return <Component {...props} />;
  };
};

export default WithAuth;
```

### Authentication Hook

A custom authentication hook (`useAuth`) simplifies access to the user’s authentication state:

```javascript
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebaseConfig';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, isLoading };
};
```

---

## Product Fetching

### Fetching All Products

The API route fetches all products from Firestore:

```javascript
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import app from '../../../firebaseConfig';
import { NextResponse } from 'next/server';

const db = getFirestore(app);

export async function GET() {
  try {
    const productsCollection = collection(db, 'products');
    const querySnapshot = await getDocs(productsCollection);
    const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products.' }, { status: 500 });
  }
}
```

### Fetching Product by ID

Fetch product details by ID:

```javascript
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import app from '../../../firebaseConfig';
import { NextResponse } from 'next/server';

const db = getFirestore(app);

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const productRef = doc(db, 'products', id);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    }

    return NextResponse.json({ id: productSnap.id, ...productSnap.data() });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product.' }, { status: 500 });
  }
}
```

---

## Features

- **Authentication**: User login and protected routes using Firebase Authentication.
- **Header**: Navigation, search, wishlist, and cart.
- **Product Listings**: View a list of products with pagination and filtering.
- **Product Details**: View detailed product information including images, reviews, and price.
- **Shopping Cart**: Add/remove products from the cart.
- **Error Handling**: Handles errors such as missing products or authentication issues.
- **Responsive Design**: Mobile-friendly design with Tailwind CSS.

---

## Components

### 1. Header

Manages navigation, search functionality, and cart summary.

### 2. Pagination

Provides navigation controls for browsing through product pages.

### 3. ImageGallery

Displays a carousel of product images.

### 4. Filter

Allows filtering products by category.

### 5. ErrorBoundary

Catches JavaScript errors in child components and displays fallback UI.

### 6. Home

Displays featured products with pagination and filters.

### 7. Product Details

Shows detailed product information based on the product ID.

---

## API Integration

The application integrates with Firestore to fetch product data and Firebase Authentication for user authentication.

---

## Custom Hooks

- `useAuth`: Handles user authentication and provides authentication status.

---

## Error Handling

- **Authentication Errors**: Redirects unauthenticated users to the login page.
- **Product Fetching Errors**: Displays error messages if product fetching fails.

---

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create the environment variables**:

   Add the following to `.env.local`:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

---

## Contributing

If you'd like to contribute, feel free to fork the repository, make your changes, and submit a pull request.

---

## License

This project is licensed under the MIT License.
