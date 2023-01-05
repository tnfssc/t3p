import { expect, test } from "vitest";

test('"Hi there!" is rendered properly', async () => {
  await import("./main");
  const element = document.querySelector<HTMLDivElement>("#app");
  expect(element).toBeDefined();
  expect(element!.innerHTML).toContain("Hi there!");
});
