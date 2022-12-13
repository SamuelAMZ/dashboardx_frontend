import React from "react";
import { Routes, Route } from "react-router-dom";
// css tailwind
import "./styles/tailwind.css";
// css components
import "./styles/index.min.css";
// react query
import { QueryClient, QueryClientProvider } from "react-query";
// pages
import Logins from "./pages/logins/Logins";
import TwoFa from "./pages/2fa/TwoFa";
import NotFound from "./pages/404/NotFound";
import Dashboard from "./pages/dashboard/Dashboard";

const App = () => {
  // react query
  const client = new QueryClient();

  return (
    <>
      <QueryClientProvider client={client}>
        <Routes>
          {/* auth pages */}
          <Route path="/" exact element={<Logins />} />
          <Route path="/fa/:id" element={<TwoFa />} />
          {/* dashboad pages */}
          <Route path="home" element={<Dashboard />} />
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
};

export default App;
