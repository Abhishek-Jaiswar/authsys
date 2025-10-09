# Authentication System Structure

This directory contains the modular authentication system for the React application.

## 📁 Directory Structure

```
src/
├── contexts/
│   ├── AuthContext.jsx     # React Context definition
│   └── index.js           # Context exports
├── providers/
│   ├── AuthProvider.jsx    # Authentication provider component
│   └── index.js           # Provider exports
├── hooks/
│   ├── useAuth.js         # Custom hook for auth state
│   └── index.js           # Hook exports
└── components/
    ├── ProtectedRoute.jsx  # Route protection component
    └── AuthCallback.jsx    # OAuth callback handler
```

## 🔧 Components

### AuthContext (`contexts/AuthContext.jsx`)

- Pure React Context definition
- No business logic, just the context creation
- Exported as default for easy importing

### AuthProvider (`providers/AuthProvider.jsx`)

- Contains all authentication business logic
- Manages user state, loading states, and auth methods
- Optimized with `useCallback` and `useMemo` for performance
- Handles API calls and error management

### useAuth Hook (`hooks/useAuth.js`)

- Custom hook that provides easy access to auth context
- Includes error handling for context usage outside provider
- Clean API for components to access auth state

## 🚀 Usage

### 1. Wrap your app with AuthProvider

```jsx
import { AuthProvider } from "./providers";

function App() {
  return <AuthProvider>{/* Your app components */}</AuthProvider>;
}
```

### 2. Use the auth hook in components

```jsx
import { useAuth } from "../hooks";

function MyComponent() {
  const { user, isAuthenticated, logout, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1>Welcome, {user?.fullname}!</h1>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>Please log in</div>
      )}
    </div>
  );
}
```

### 3. Protect routes

```jsx
import ProtectedRoute from "../components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
```

## 🔐 Available Auth State

- `user`: Current user object (null if not authenticated)
- `isAuthenticated`: Boolean authentication status
- `loading`: Boolean loading state
- `login(userData)`: Function to set user as logged in
- `logout()`: Function to log out user
- `updateUser(userData)`: Function to update user data
- `checkAuthStatus()`: Function to manually check auth status

## 🎯 Benefits of This Structure

1. **Separation of Concerns**: Context, provider, and hooks are separate
2. **Reusability**: Easy to import and use across components
3. **Maintainability**: Clear structure makes debugging easier
4. **Performance**: Optimized with React hooks for minimal re-renders
5. **Type Safety**: Ready for TypeScript migration
6. **Testing**: Easy to mock and test individual parts

## 🔄 Authentication Flow

1. **App Load**: AuthProvider checks authentication status
2. **Login**: User logs in via email/password or Google OAuth
3. **State Update**: Auth state is updated in context
4. **Route Protection**: ProtectedRoute checks auth status
5. **Logout**: User logs out, state is cleared

## 🛠 Development Tips

- Always use `useAuth()` hook instead of directly accessing context
- Wrap your app with AuthProvider at the highest level
- Use ProtectedRoute for pages that require authentication
- The auth state automatically persists across page refreshes
- All API calls include proper error handling
