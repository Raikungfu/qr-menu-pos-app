import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

import MainLayout from "./layout/MainLayout";
import { routes } from "./routers";
import OrderStatusComponent from "./components/custom/OrderStatus";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => {
            const Page = route.component;
            let Layout = MainLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = React.Fragment;
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
      </BrowserRouter>
      <OrderStatusComponent />
    </>
  );
}

export default App;
