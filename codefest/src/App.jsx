
// import {
//   Button,
//   FluentProvider,
//   makeStyles,
//   tokens,
//   webLightTheme
// } from "@fluentui/react-components";
// import * as React from "react";
// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";


// const useStyles = makeStyles({
//   button: {
//     marginTop: "5px",
//   },
//   provider: {
//     border: "1px",
//     borderRadius: "5px",
//     padding: "5px",
//   },
//   text: {
//     backgroundColor: tokens.colorBrandBackground2,
//     color: tokens.colorBrandForeground2,
//     fontSize: "20px",
//     border: "1px",
//     borderRadius: "5px",
//     padding: "5px",
//   },
// });

// function App() {
//   const styles = useStyles();
//   return (
//     <FluentProvider className={styles.provider} theme={webLightTheme}>
//         <div className={styles.text}>Web Light Theme</div>
//         <Button className={styles.button}>Web Light Theme</Button>
//     </FluentProvider>
//   )
// }

// export default App


// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import AdminPage from './components/AdminPage';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
