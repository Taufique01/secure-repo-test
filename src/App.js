import React from "react";
import "./App.scss";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

import LoadingIndicator from "./buyer-dashboard/layouts/LoadingIndicator";
import Main from "./buyer-dashboard/Main";
import { AuthProvider } from "./auth-provider/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <>
              <React.Fragment>
                <LoadingIndicator />
              </React.Fragment>
              <AuthProvider>
                <Main />
              </AuthProvider>
              <React.Fragment>
                <NotificationContainer />
              </React.Fragment>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
