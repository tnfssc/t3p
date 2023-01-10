import { useQuery } from "react-query";
import { FcGoogle } from "react-icons/fc";
import { pb } from "@lib";
import { authCallbackUrl } from "@constants/config";
import { AuthProviderInfo } from "pocketbase";
import { useAuthStore } from "@store/authStore";
import { Redirect } from "wouter";

const LoginPage = () => {
  const user = useAuthStore((s) => s.user);
  let { data: authProviders } = useQuery("fetch_auth_providers", async () => {
    const { authProviders } = await pb.collection("users").listAuthMethods();
    return authProviders;
  });
  if (!authProviders) throw new Error("fetch_auth_providers failed");
  const googleAuthProvider = authProviders.find((p) => p.name === "google");
  if (!googleAuthProvider) throw new Error("googleAuthProvider not found");
  authProviders = authProviders.filter((p) => p.name !== "google");

  const handleLogin =
    (authProvider: AuthProviderInfo) =>
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      localStorage.setItem("authProvider", JSON.stringify(authProvider));
      window.location.href = authProvider.authUrl + authCallbackUrl;
    };

  if (user) return <Redirect to="/" />;

  return (
    <div className="flex flex-col place-items-center">
      <h1 className="text-4xl mb-4">Login</h1>
      <a
        href={googleAuthProvider.authUrl + authCallbackUrl}
        onClick={handleLogin(googleAuthProvider)}
        onContextMenu={(e) => e.preventDefault()}
        className="btn outline-blue-500 outline-4 bg-white text-black normal-case hover:bg-blue-300"
      >
        <FcGoogle className="inline-block w-6 h-6 mr-2" />
        Login with Google
      </a>
      {authProviders?.map((provider) => (
        <a
          href={provider.authUrl + authCallbackUrl}
          onClick={handleLogin(provider)}
          onContextMenu={(e) => e.preventDefault()}
          className="btn"
        >
          Login with {provider.name}
        </a>
      ))}
    </div>
  );
};

export default LoginPage;
