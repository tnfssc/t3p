import "@/wdyr";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "react-contexify/ReactContexify.css";
import "./style.css";

import Root from "@/root";

createRoot(document.getElementById("root")!).render(createElement(Root));
