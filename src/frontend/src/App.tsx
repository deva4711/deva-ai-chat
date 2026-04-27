import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  Outlet,
  RouterProvider,
  createRootRouteWithContext,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy-loaded pages
const LoginPage = lazy(() =>
  import("@/pages/LoginPage").then((m) => ({ default: m.LoginPage })),
);
const HomePage = lazy(() =>
  import("@/pages/HomePage").then((m) => ({ default: m.HomePage })),
);
const ChatPage = lazy(() =>
  import("@/pages/ChatPage").then((m) => ({ default: m.ChatPage })),
);

// App context shape passed through router
interface RouterContext {
  isAuthenticated: boolean;
}

// Root route — wraps everything
const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: function Root() {
    return (
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center bg-background">
            <div className="size-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    );
  },
});

// Login route (public)
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => <LoginPage />,
});

// Home route (protected)
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: () => <HomePage />,
});

// Chat route (protected)
const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chat/$conversationId",
  validateSearch: (search: Record<string, unknown>) => ({
    initialMessage:
      typeof search.initialMessage === "string"
        ? search.initialMessage
        : undefined,
  }),
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: () => <ChatPage />,
});

const routeTree = rootRoute.addChildren([loginRoute, homeRoute, chatRoute]);

// Router created once; context is passed fresh on each render via RouterProvider
const router = createRouter({
  routeTree,
  context: { isAuthenticated: false } satisfies RouterContext,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const { isAuthenticated, isInitializing } = useInternetIdentity();

  // Show full-page spinner while Internet Identity is restoring from storage
  if (isInitializing) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground">Restoring session…</p>
        </div>
      </div>
    );
  }

  return <RouterProvider router={router} context={{ isAuthenticated }} />;
}
