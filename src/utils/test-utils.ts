import { render, RenderOptions } from "@testing-library/react";
import { createElement } from "react";

const customRender = (ui: () => JSX.Element, options: RenderOptions = {}) => {
  return render(createElement(ui), {
    wrapper: ({ children }) => children,
    ...options,
  });
};

// eslint-disable-next-line import/export
export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
// eslint-disable-next-line import/export
export { customRender as render };
