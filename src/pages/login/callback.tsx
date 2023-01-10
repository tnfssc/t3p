import { useMemo } from "react";
import { useQuery } from "react-query";
import { Redirect } from "wouter";
import { AuthProviderInfo } from "pocketbase";

import { pb } from "@lib";
import { authCallbackUrl } from "@constants/config";

const AuthCallback = () => {
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  if (!code || !state) throw new Error("code/state not found");
  const authProvider = useMemo<AuthProviderInfo>(
    () => JSON.parse(localStorage.getItem("authProvider") ?? "null"),
    []
  );
  if (!authProvider) throw new Error("authProvider not found");
  if (authProvider.state !== state) throw new Error("state mismatch");

  const { data, error } = useQuery(
    "authWithOAuth2",
    async () =>
      await pb
        .collection("users")
        .authWithOAuth2(
          authProvider.name,
          code,
          authProvider.codeVerifier,
          authCallbackUrl
        )
  );

  if (error) throw error;
  if (!data) throw new Error("authWithOAuth2 failed");
  return <Redirect to="/" />;
};

export default AuthCallback;
