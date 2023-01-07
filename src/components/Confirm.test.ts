import { describe, expect, it, beforeEach } from "vitest";

import { renderHook, getByText } from "@utils/test-utils";
import useConfirm, { ConfirmProvider } from "@components/Confirm";

describe("confirm dialog", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  it("should resolve when proceed is pressed", async () => {
    const { result } = renderHook(() => useConfirm(), {
      wrapper: ConfirmProvider,
    });
    const promise = result.current();
    setImmediate(() => getByText(document.body, "Proceed").click());
    await expect(promise).resolves.toBeUndefined();
  });

  it("should reject when cancel is pressed", async () => {
    const { result } = renderHook(() => useConfirm(), {
      wrapper: ConfirmProvider,
    });
    const promise = result.current();
    setImmediate(() => getByText(document.body, "Cancel").click());
    await expect(promise).rejects.toBeUndefined();
  });
});
