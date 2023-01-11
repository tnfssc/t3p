import { Suspense } from "react";
import { Router, Route } from "wouter";
import { ToastContainer } from "react-toastify";
import {
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from "react-query";
import { SlRefresh } from "react-icons/sl";
import { ErrorBoundary } from "react-error-boundary";

import Home from "@pages";
import LoginPage from "@pages/login";
import AuthCallback from "@pages/login/callback";
import { ConfirmProvider } from "@components/Confirm";
import CircularProgress from "@components/CircularProgress";
import NavFab from "@components/NavFab";
import { PageWrapper } from "@components/PageWrapper";

const queryClient = new QueryClient({
  defaultOptions: { queries: { suspense: true, retry: 0 } },
});

const Root = () => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={() => (
        <div className="flex flex-col">
          <span className="text-4xl mb-8 text-error">There was an error!</span>
          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="btn btn-error text-2xl"
          >
            <SlRefresh className="h-6 w-6 mr-4" />
            Try again
          </button>
        </div>
      )}
    >
      <Suspense fallback={<CircularProgress indeterminate />}>
        <QueryClientProvider client={queryClient}>
          <ConfirmProvider>
            <Router>
              <NavFab />
              <Route path="/" component={PageWrapper(Home)} />
              <Route path="/login" component={PageWrapper(LoginPage)} />
              <Route
                path="/login/callback"
                component={PageWrapper(AuthCallback)}
              />
            </Router>
            <ToastContainer hideProgressBar theme="colored" />
          </ConfirmProvider>
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Root;
