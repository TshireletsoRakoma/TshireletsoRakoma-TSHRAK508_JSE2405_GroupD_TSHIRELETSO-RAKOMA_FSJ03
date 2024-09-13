
# Next.js E-Commerce Project

## Overview
This is a simple e-commerce platform built using **Next.js**, designed to demonstrate product listings, pagination, product details with images, reviews, and a shopping cart. The project utilizes **React Hooks** for managing state and lifecycle, and **API fetching** to load product data dynamically.

## Features
- **Product Listings**: View a list of products with pagination.
- **Product Details**: View detailed product information including price, description, images, and reviews.
- **Shopping Cart**: Add and remove products from the cart.
- **Error Handling**: Graceful error handling with custom error boundaries.
- **Responsive Design**: Styled to be responsive across different screen sizes.

## Technologies
- **Next.js**: Framework for server-side rendering and static site generation.
- **React**: JavaScript library for building user interfaces.
- **CSS Modules**: For scoped and modular styling.
- **API**: Fetching product data from an external API.

## Project Structure

\`\`\`bash
├── app/
│   ├── Components/
│   │   ├── ProductCard.js           # Displays individual product cards
│   │   ├── ProductList.js           # Displays the list of products
│   │   ├── Pagination.js            # Pagination component
│   │   ├── ImageGallery.js          # Displays product images in a gallery format
│   │   ├── ErrorBoundary.js         # Component to catch errors and render fallback UI
│   ├── lib/
│   │   ├── api.js                   # API functions for fetching products and product details
│   ├── pages/
│   │   ├── index.js                 # Home page that lists products
│   │   ├── products/[id].js         # Product detail page for individual products
├── public/                          # Static assets like images
├── styles/                          # Global and modular styles
├── README.md                        # Project documentation
├── package.json                     # Dependencies and scripts
\`\`\`

## Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/your-repo-name.git
   \`\`\`
2. Navigate to the project directory:
   \`\`\`bash
   cd your-repo-name
   \`\`\`
3. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
4. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

The app will be running at \`http://localhost:3000\`.

## API Usage

This project uses the following endpoints to fetch products:

- **Get Products**: \`https://next-ecommerce-api.vercel.app/products\`
  - Query Params:
    - \`limit\` (number): Number of products to fetch.
    - \`skip\` (number): Number of products to skip for pagination.
  
- **Get Product by ID**: \`https://next-ecommerce-api.vercel.app/products/{id}\`
  - Fetches a single product by its ID.

## How to Use

1. **Home Page**: Lists all products. You can click on the **"View Details"** button to see the product details.
2. **Product Detail Page**: Displays detailed information about the selected product, including an image gallery, price, category, and customer reviews.
3. **Pagination**: Navigate between product pages using the pagination controls at the bottom of the product listing.

## Components

### ProductCard
Displays product information like title, price, and category with a button to view details.

### ProductList
Renders a list of products by mapping over the fetched data.

### Pagination
Allows navigation between different pages of products.

### ImageGallery
A gallery component that allows users to view product images with next/previous controls.

### ErrorBoundary
Catches and displays any runtime errors in the component tree, ensuring the app doesn’t crash.

## Scripts

- \`npm run dev\`: Runs the app in development mode.
- \`npm run build\`: Builds the app for production.
- \`npm start\`: Starts the app in production mode.

## Troubleshooting

- If you encounter a \`404 - Page Not Found\` error while trying to view product details, make sure the product ID passed in the URL is valid.
- If images are not loading, check the \`ImageGallery\` component and ensure the image URLs are being passed correctly.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
