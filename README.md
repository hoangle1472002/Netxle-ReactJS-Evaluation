# 🧪 Nexle-React-Evaluation

A **ReactJS frontend application** for Nexle’s evaluation test. This project implements **Sign Up**, **Login**, and **Dashboard** pages using **real API integration**, built with modern React practices and tools like Redux, Reactstrap, and React Router.

---

## 🚀 Features

- 🔐 **User Sign Up** with real-time form validation
- 🔑 **User Login** with JWT-based authentication
- 📊 **Dashboard Page** displaying secured user content
- ✅ **Auto-login** if access token is still valid
- 🔁 **Redirect to login** when token is invalid or expired
- 🎨 UI built closely following the [Figma design](https://www.figma.com/file/U2iq3TMMraabKGYwHbGZZk/Untitled?node-id=0%3A1)

---

## 🗂️ Project Structure

```bash
my-react-app/
│
├── public/                 # Static files
├── src/
│   ├── assets/             # Images, icons, etc.
│   ├── components/         # Reusable UI components
│   ├── api/                # Manage API logic
│   ├── redux/              # Redux logic (store, slices, async actions)
│   ├── screens/            # Route-level components (LoginPage, SignupPage)
│   ├── utils/              # Utility functions (validators, helpers)
│   ├── App.jsx             # Root component
│   └── main.jsx            # Entry point
```

---

## ⚙️ Technologies

- **React** (via [Create React App](https://create-react-app.dev))
- **Reactstrap**: UI components ([reactstrap.github.io](https://reactstrap.github.io))
- **Bootstrap 4/5**: Additional styling and layout utility
- **Redux** with `redux-thunk` for state management
- **React Router DOM**: Routing
- **React Hooks**: Functional component logic

---

## 🔗 API Integration

- The project uses **real APIs** hosted on Nexle's development server.
- Upon sign-up, the app auto-logs in and redirects to the dashboard.
- If tokens are valid on app load, user is automatically taken to the dashboard.

---

## 🧪 How to Run

```bash
# Install dependencies
npm install

# Run the app
npm run dev
```

Navigate to: [http://localhost:3000](http://localhost:3000)

---

## 🖼️ UI Design Reference

Follow the exact layout and style from Figma:  
📐 [Figma Design File](https://www.figma.com/file/U2iq3TMMraabKGYwHbGZZk/Untitled?node-id=0%3A1)

---

## 👤 Author

**Hoang Le**  
📧 hoangle14702@gmail.com