import { Router, Route } from "wouter";
import { ToastContainer } from "react-toastify";

import Home from "@pages/index";
import { ConfirmProvider } from "@components/Confirm";

const Root = () => (
  <>
    <ConfirmProvider>
      <Router>
        <Route path="/" component={Home} />
      </Router>
      <ToastContainer hideProgressBar theme="colored" />
    </ConfirmProvider>
  </>
);

export default Root;
