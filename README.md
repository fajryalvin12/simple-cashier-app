# Simple Cashier App

A simple cashier application built with Node.js, Express, PostgreSQL, and Prisma.

![Node.js](https://img.shields.io/badge/Node.js-v20-green)
![License](https://img.shields.io/badge/license-MIT-blue)

This application allows small businesses to manage products, transactions, and reports with a simple backend API.

## Features

- User registration and login (JWT authentication)
- CRUD operations for products
- Create transactions and manage stock
- Pagination and filtering for product list
- Transaction history and summary

## Tech Stack

- Node.js & Express
- PostgreSQL
- Prisma ORM
- JWT for authentication

## Installation

1. Clone this repository

```bash
git clone https://github.com/fajryalvin12/simple-cashier-app.git
cd simple-cashier-app

```

2. Install dependencies

```bash
npm install
```

3. Setup environment database

```bash
cp .env.example .env
```

4. Migrate database

```bash
npx prisma migrate dev
```

5. Run server

```bash
npm run dev
```

## API Endpoints

| Endpoint            | Method | Description        | Body / Params                       |
| ------------------- | ------ | ------------------ | ----------------------------------- |
| `/auth/register`    | POST   | Register user      | `{name, email, password}`           |
| `/auth/login`       | POST   | Login user         | `{email, password}`                 |
| `/products`         | GET    | List products      | `?page=1&limit=10`                  |
| `/products`         | POST   | Add product        | `{name, price, stock}`              |
| `/transactions`     | POST   | Create transaction | `{items: [{product_id, quantity}]}` |
| `/transactions/:id` | GET    | Detail transaction | -                                   |

## Contributing

1. Fork this repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request
