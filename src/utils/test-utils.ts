import { render, RenderOptions } from "@testing-library/react";
import React from "react";

const customRender = (ui: () => JSX.Element, options: RenderOptions = {}) => {
  return render(React.createElement(ui), {
    wrapper: ({ children }) => children,
    ...options,
  });
};

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
export { customRender as render };
