# User Management CRUD Application (Angular)

This is a simple **User Management CRUD application** built with **Angular (Standalone Components)** and a RESTful backend API.

The application allows users to:
- View all users
- Add a new user
- Update an existing user
- Delete a user
- Handle frontend and backend validations
- Display proper UI loading and error states

---

## 🚀 Features

- Angular standalone components
- Single reusable form for **Add & Update**
- Template-driven forms with validation
- Backend validation error handling and display
- UI state management (loading, saving)
- Clean separation of UI logic and API logic
- Responsive UI using Bootstrap

---

## 🛠️ Tech Stack

- **Frontend**: Angular, TypeScript
- **Forms**: Template-driven forms (`ngModel`)
- **Styling**: Bootstrap
- **Backend**: REST API (JSON-based)
- **HTTP**: Angular HttpClient

## 📋 Application Logic Overview

### User List
- Users are loaded when the component initializes.
- A loading indicator is shown while fetching data.

### Add / Update User
- A **single form** is reused for both add and update.
- The form switches mode using `isEditMode`.
- The save button is disabled if:
  - The form is invalid
  - A save request is already in progress

### Delete User
- Users can be deleted directly from the list.
- UI updates instantly after successful deletion.

---

## ✅ Validation Handling

### Frontend Validation
- Required field validation for Name and Email
- Email format validation
- Error messages shown only when fields are touched

### Backend Validation
- Backend validation errors are captured from API responses
- Errors are displayed clearly in the UI

---

## 🔄 UI State Management

The application uses flags such as:
- `isLoading`
- `isSaving`
- `isEditMode`

This ensures:
- No duplicate API calls
- Clear feedback to the user
- Better user experience

---

## ▶️ How to Run

1. Clone the repository
   ```bash
   git clone <repository-url>

2. Install dependencies

npm install

3. Run the application

ng serve

4. Open in browser

http://localhost:4200
