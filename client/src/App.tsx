import React from "react";
import { UserFormPage } from "./scenes/userForm";

import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppRoutes } from "./types/routes";
import { WithUserResultContextProvider } from "./store/userResult";
import { UserResultPage } from "./scenes/userResult";

import "./styles/common.scss";

function App() {
  return (
    <WithUserResultContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoutes.USER_FORM} element={<UserFormPage />} />
          <Route path={AppRoutes.USER_RESULT} element={<UserResultPage />} />
          <Route path="*" element={<Navigate to={AppRoutes.USER_FORM} />} />
        </Routes>
      </BrowserRouter>
    </WithUserResultContextProvider>
  );
}

export default App;
