# User Management System

A full-stack user management application built using Angular and ASP.NET Core Web API with JWT authentication, role-based authorization, Entity Framework Core, and layered backend architecture.

This project demonstrates secure authentication, CRUD operations, service-layer architecture, DTO usage, dependency injection, and SQL Server integration in a modern enterprise-style application structure.

---

# Features

## Authentication & Security

* JWT-based authentication
* Password hashing using BCrypt
* Role-based authorization (Admin/User)
* Protected API endpoints using `[Authorize]`
* Angular HTTP interceptor for automatic JWT token attachment

## User Management

* Create users
* View users
* Update users
* Delete users (Admin only)
* Duplicate email validation
* Password update support

## Backend Architecture

* ASP.NET Core Web API
* Entity Framework Core
* SQL Server integration
* DTO pattern
* Service Layer architecture
* Dependency Injection
* RESTful API design

## Frontend

* Angular standalone application
* Angular routing
* Reactive HTTP communication
* Authentication state handling
* Role-based UI rendering

---

# Technologies Used

## Frontend

* Angular 19
* TypeScript
* RxJS
* Angular HTTP Client

## Backend

* ASP.NET Core Web API (.NET 7)
* Entity Framework Core
* SQL Server
* JWT Authentication
* BCrypt.Net

---

# Project Architecture

The backend follows a layered architecture approach to separate responsibilities and improve maintainability.

```plaintext
Angular Frontend
        ↓
Controllers (API Layer)
        ↓
Services (Business Logic Layer)
        ↓
Entity Framework Core (Data Access Layer)
        ↓
SQL Server Database
```

## Architecture Concepts Implemented

* Separation of Concerns
* Dependency Injection
* Interface-based Service Layer
* DTO Pattern
* SOLID Principles
* Layered Architecture

---

# Authentication Flow

1. User logs in with email and password
2. Backend validates credentials
3. JWT token is generated
4. Angular stores token in localStorage
5. Angular interceptor automatically attaches token to API requests
6. Protected endpoints validate token and roles

---

# API Endpoints

## Authentication

| Method | Endpoint          | Description |
| ------ | ----------------- | ----------- |
| POST   | `/api/auth/login` | User login  |

## Users

| Method | Endpoint          | Description              |
| ------ | ----------------- | ------------------------ |
| GET    | `/api/users`      | Get all users            |
| POST   | `/api/users`      | Create user              |
| PUT    | `/api/users/{id}` | Update user              |
| DELETE | `/api/users/{id}` | Delete user (Admin only) |

---

# Database

The application uses SQL Server with Entity Framework Core migrations.

## Migration Commands

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

---

# Setup Instructions

## Backend Setup

```bash
cd dotnet-backend

dotnet restore

dotnet ef database update

dotnet run
```

Backend runs on:

```plaintext
http://localhost:5274
```

---

## Frontend Setup

```bash
cd angular-frontend

npm install

ng serve
```

Frontend runs on:

```plaintext
http://localhost:4200
```


# Future Improvements

* Refresh token authentication
* Global exception handling
* Repository pattern
* AutoMapper integration
* Unit testing
* Docker support
* Clean Architecture implementation
* Pagination and search
* User profile management

---

# Learning Outcomes

This project helped reinforce concepts such as:

* Full-stack application development
* Secure authentication workflows
* REST API development
* Layered backend architecture
* Dependency Injection
* Entity Framework Core
* Angular + .NET integration
* Software engineering best practices

---

# Author

Duleesha Gamalathge
