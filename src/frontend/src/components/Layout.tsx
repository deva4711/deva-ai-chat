import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
  conversationTitle?: string;
  /** Optional rich node to replace the plain conversationTitle string */
  conversationTitleNode?: ReactNode;
}

export function Layout({
  children,
  conversationTitle,
  conversationTitleNode,
}: LayoutProps) {
  const { isAuthenticated, principal } = useAuth();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const shortPrincipal = principal
    ? `${principal.slice(0, 5)}...${principal.slice(-3)}`
    : null;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar — desktop always visible, mobile drawer */}
      {isMobile ? (
        <>
          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
              onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
              role="button"
              tabIndex={-1}
              aria-label="Close sidebar"
            />
          )}
          <aside
            className={cn(
              "fixed inset-y-0 left-0 z-40 w-72 flex-shrink-0 transition-transform duration-300 ease-in-out",
              sidebarOpen ? "translate-x-0" : "-translate-x-full",
            )}
          >
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </aside>
        </>
      ) : (
        <aside className="w-72 flex-shrink-0 border-r border-border">
          <Sidebar />
        </aside>
      )}

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-14 items-center gap-3 border-b border-border bg-card px-4 shadow-sm">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
              data-ocid="layout.sidebar_toggle"
            >
              {sidebarOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </Button>
          )}

          <div className="flex flex-1 items-center gap-2 min-w-0">
            {!isMobile && (
              <Link to="/" className="flex items-center gap-2 mr-3">
                <span className="text-accent font-display font-semibold text-base tracking-tight whitespace-nowrap">
                  Google Internship Coach
                </span>
              </Link>
            )}
            {(conversationTitleNode ?? conversationTitle) && (
              <div className="flex items-center min-w-0">
                {!isMobile && <span className="mx-2 opacity-30">•</span>}
                {conversationTitleNode ?? (
                  <span className="text-sm text-muted-foreground truncate min-w-0">
                    {conversationTitle}
                  </span>
                )}
              </div>
            )}
          </div>

          {isAuthenticated && shortPrincipal && (
            <div
              className="flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground border border-border"
              data-ocid="layout.user_badge"
            >
              <span className="size-2 rounded-full bg-accent inline-block" />
              <span className="font-mono">{shortPrincipal}</span>
            </div>
          )}
        </header>

        {/* Page content */}
        <main className="flex flex-1 flex-col overflow-hidden bg-background">
          {children}
        </main>

        {/* Attribution footer */}
        <footer className="border-t border-border bg-muted/40 px-4 py-2 text-center">
          <p className="text-[11px] text-muted-foreground/50">
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-muted-foreground transition-colors"
            >
              Built with love using caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
