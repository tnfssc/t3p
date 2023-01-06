import { Router, Route } from "wouter";
import Home from "@pages/index";

const Root = () => (
  <Router>
    <Route path="/" component={Home} />
  </Router>
);

export default Root;
