import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

import MainLayout from "./layout/MainLayout";
import { routes } from "./routers";
import OrderStatusComponent from "./components/custom/OrderStatus";
import PrivateRoute from "./auth/PrivateRoute";
import ErrorBoundary from "./auth/ErrorBoundary";
import { AuthProvider } from "./auth/AuthContext";

function App() {
  return (
    <>
      <ErrorBoundary>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {routes.map((route, index) => {
                const Page = route.component;
                let Layout = MainLayout;
                let Private = PrivateRoute;
                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = React.Fragment;
                }
                if (!route.isAuth) {
                  Private = React.Fragment;
                }

                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                );
              })}
            </Routes>
          </AuthProvider>
          <OrderStatusComponent />
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;
