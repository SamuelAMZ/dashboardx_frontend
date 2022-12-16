import React from "react";
import { Routes, Route } from "react-router-dom";
// css tailwind
import "./styles/tailwind.css";
// css components
import "./styles/index.min.css";
// react query
import { QueryClient, QueryClientProvider } from "react-query";
// auths
import Auth from "./components/auth/Auth";
// components
import Sidebar from "./components/SideBar.jsx/Sidebar";
// pages
import Logins from "./pages/logins/Logins";
import TwoFa from "./pages/2fa/TwoFa";
import NotFound from "./pages/404/NotFound";
import Dashboard from "./pages/dashboard/Dashboard";
// sms
import SmsAnalytics from "./pages/sms/analytics/SmsAnalytics";
import SmsContexts from "./pages/sms/contexts/SmsContexts";
import SmsLogs from "./pages/sms/logs/SmsLogs";
import SmsSettings from "./pages/sms/settings/SmsSettings";

const App = () => {
  // react query
  const client = new QueryClient();

  return (
    <>
      <QueryClientProvider client={client}>
        <>
          {/* auth */}
          <Auth />

          {/* component code */}
          <div className="site-container">
            {/* sidebar */}
            <Sidebar />
            {/* main */}
            <div className="main">
              <Routes>
                {/* auth pages */}
                <Route path="/" exact element={<Logins />} />
                <Route path="/fa/:id" element={<TwoFa />} />

                {/* dashboad pages */}
                <Route path="home" element={<Dashboard />} />
                {/* sms */}
                <Route path="sms/analytics" element={<SmsAnalytics />} />
                <Route path="sms/contexts" element={<SmsContexts />} />
                <Route path="sms/logs" element={<SmsLogs />} />
                <Route path="sms/settings" element={<SmsSettings />} />
                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </>
      </QueryClientProvider>
    </>
  );
};

export default App;
