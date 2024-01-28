import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";

import './driver'
import './index.css'
import AuthProvider from "./context/AuthContext.jsx";
import router from "./routes.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
      <AuthProvider>
          <RouterProvider router={router} />
      </AuthProvider>
  // </React.StrictMode>,
)
