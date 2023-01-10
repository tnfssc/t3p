/// <reference types="@welldone-software/why-did-you-render" />

import React from "react";

if (import.meta.env.DEV) {
  const { default: wdyr } = await import(
    "@welldone-software/why-did-you-render"
  );
  wdyr(React, {
    trackAllPureComponents: true,
    trackHooks: true,
  });
}
