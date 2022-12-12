import React from "react";
// css tailwind
import "./styles/tailwind.css";
// css components
import "./styles/index.min.css";
// pages
import Logins from "./pages/logins/Logins";
// react query
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  // react query
  const client = new QueryClient();

  return (
    <>
      <QueryClientProvider client={client}>
        <Logins />
      </QueryClientProvider>
    </>
  );
};

export default App;
