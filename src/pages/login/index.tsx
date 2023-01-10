import { useQuery } from "react-query";
import { FcGoogle } from "react-icons/fc";
import { pb } from "@lib";
import { authCallbackUrl } from "@constants/config";

const LoginPage = () => {
  let { data: authProviders } = useQuery("fetch_auth_providers", async () => {
    const { authProviders } = await pb.collection("users").listAuthMethods();
    return authProviders;
  });
  if (!authProviders) throw new Error("fetch_auth_providers failed");
  const googleAuthProvider = authProviders.find((p) => p.name === "google");
  if (!googleAuthProvider) throw new Error("googleAuthProvider not found");
  authProviders = authProviders.filter((p) => p.name !== "google");
  return (
    <div className="flex flex-col place-items-center">
      <h1 className="text-4xl mb-4">Login</h1>
      <a
        href={googleAuthProvider.authUrl + authCallbackUrl}
        className="btn outline-blue-500 outline-4 bg-white text-black normal-case hover:bg-blue-300"
      >
        <FcGoogle className="inline-block w-6 h-6 mr-2" />
        Login with Google
      </a>
      {authProviders?.map((provider) => (
        <button className="btn" key={provider.name}>
          {provider.name}
        </button>
      ))}
    </div>
  );
};

export default LoginPage;
