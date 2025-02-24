# E-commerce Project Setup Guide

## Project Structure
```
ecommerce-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── productController.js
│   │   │   └── cartController.js
│   │   ├── models/
│   │   │   ├── Product.js
│   │   │   └── CartItem.js
│   │   ├── routes/
│   │   │   ├── productRoutes.js
│   │   │   └── cartRoutes.js
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   └── app.js
│   ├── .env
│   ├── package.json
│   └── README.md
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── page.js
    │   │   ├── checkout/page.js
    │   │   └── layout.js
    │   ├── components/
    │   │   ├── product/
    │   │   │   ├── ProductList.js
    │   │   │   └── ProductCard.js
    │   │   ├── cart/
    │   │   │   ├── CartIcon.js
    │   │   │   └── CartSummary.js
    │   │   └── layout/
    │   │       ├── Header.js
    │   │       └── Footer.js
    │   ├── contexts/
    │   │   └── CartContext.js
    │   ├── lib/
    │   │   └── api.js
    │   └── styles/
    │       └── globals.css
    ├── public/
    │   └── images/
    ├── .env.local
    ├── package.json
    └── README.md
```

## Step-by-Step Setup Instructions

### 1. Backend Setup

```bash
# Create backend directory
mkdir ecommerce-app && cd ecommerce-app
mkdir backend && cd backend

# Initialize Node.js project
npm init -y

# Install required dependencies
npm install express mongoose cors dotenv nodemon

# Create required directories
mkdir -p src/{controllers,models,routes,config,middleware}
```

### 2. Frontend Setup

```bash
# Go back to root directory
cd ..

# Create Next.js frontend with TypeScript and Tailwind
npx create-next-app@latest frontend --typescript --tailwind --eslint

# Navigate to frontend directory
cd frontend

# Install additional dependencies
npm install axios @headlessui/react lucide-react clsx
```

### 3. Environment Variables Setup

Backend `.env`:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/ecommerce
NODE_ENV=development
```

Frontend `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```



### 6. Starting the Development Environment

1. Start MongoDB:
```bash
# If using MongoDB locally
mongod
```

2. Start the backend server:
```bash
cd backend
npm run dev
```

3. Start the frontend development server:
```bash
cd frontend
npm run dev
```

### 7. Initial Data Setup



Run the seed script:
```bash
npm run seed
```
