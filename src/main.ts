import React from "react";
import { createRoot } from "react-dom/client";

import "./style.css";
import Root from "./root";

createRoot(document.getElementById("root")!).render(React.createElement(Root));
