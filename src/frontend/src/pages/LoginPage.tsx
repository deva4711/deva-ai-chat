import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BrainCircuit,
  GraduationCap,
  Shield,
  Sparkles,
  Trophy,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";

const FEATURES = [
  {
    icon: BrainCircuit,
    title: "AI-powered coaching",
    desc: "Ask anything — coding, resume, behavioral rounds.",
  },
  {
    icon: Trophy,
    title: "Google-ready prep",
    desc: "Tailored advice based on how Google actually hires.",
  },
  {
    icon: Shield,
    title: "Private & persistent",
    desc: "All chats saved securely on the Internet Computer.",
  },
];

const TESTIMONIALS = [
  { quote: "Helped me crack my L3 interview in 3 weeks!", name: "Sofia T." },
  {
    quote: "Finally understood system design through conversation.",
    name: "Ravi K.",
  },
  { quote: "The mock interviews felt scarily real.", name: "Mia P." },
];

export function LoginPage() {
  const { login, isAuthenticated, loginStatus } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, navigate]);

  const isLoggingIn = loginStatus === "logging-in";
  const hasError = loginStatus === "loginError";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Ambient background blobs */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 size-[700px] rounded-full bg-accent/6 blur-[100px]" />
        <div className="absolute top-2/3 -right-32 size-[500px] rounded-full bg-primary/5 blur-[80px]" />
        <div className="absolute bottom-0 left-0 size-[400px] rounded-full bg-accent/4 blur-[80px]" />
      </div>

      <div className="relative flex flex-1 flex-col lg:flex-row">
        {/* ─── Left / hero panel ─── */}
        <motion.div
          className="flex flex-col justify-center px-8 py-12 lg:w-1/2 lg:px-16 xl:px-24"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Brand mark */}
          <div className="flex items-center gap-3 mb-12">
            <div className="flex items-center justify-center size-10 rounded-xl bg-accent/15 border border-accent/30">
              <GraduationCap className="size-5 text-accent" />
            </div>
            <span className="font-display font-bold text-lg text-foreground tracking-tight">
              Deva AI
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold text-4xl lg:text-5xl text-foreground leading-tight tracking-tight mb-4">
            Land your{" "}
            <span className="text-accent">Google&nbsp;internship</span>
            <br />
            with an AI coach
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-md">
            Practice interviews, review your resume, and get personalized
            guidance — all in one private, persistent chat.
          </p>

          {/* Feature list */}
          <ul className="flex flex-col gap-5 mb-12">
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <motion.li
                key={title}
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
              >
                <span className="flex items-center justify-center size-9 rounded-lg bg-accent/10 border border-accent/20 flex-shrink-0 mt-0.5">
                  <Icon className="size-4 text-accent" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {title}
                  </p>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>

          {/* Mini testimonials — desktop only */}
          <div className="hidden lg:flex flex-col gap-3">
            {TESTIMONIALS.map(({ quote, name }) => (
              <div key={name} className="flex items-start gap-3">
                <Sparkles className="size-3.5 text-accent flex-shrink-0 mt-1" />
                <p className="text-xs text-muted-foreground">
                  <span className="text-foreground/80 italic">"{quote}"</span> —{" "}
                  {name}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─── Right / login card ─── */}
        <motion.div
          className="flex flex-col items-center justify-center px-6 py-12 lg:w-1/2 lg:px-16"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <div className="w-full max-w-sm">
            {/* Card */}
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <div className="mb-6 text-center">
                <div className="flex items-center justify-center size-14 rounded-2xl bg-accent/15 border border-accent/30 mx-auto mb-4">
                  <GraduationCap className="size-7 text-accent" />
                </div>
                <h2 className="font-display font-bold text-xl text-foreground tracking-tight mb-1">
                  Sign in to start coaching
                </h2>
                <p className="text-sm text-muted-foreground">
                  No passwords or email — just a secure, anonymous identity.
                </p>
              </div>

              {/* CTA button */}
              <Button
                onClick={login}
                disabled={isLoggingIn}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-11 text-base transition-smooth gap-2"
                data-ocid="login.submit_button"
                aria-label="Sign in with Internet Identity"
              >
                {isLoggingIn ? (
                  <>
                    <span className="size-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    Connecting…
                  </>
                ) : (
                  <>
                    Sign in with Internet Identity
                    <ArrowRight className="size-4" />
                  </>
                )}
              </Button>

              {/* Loading hint */}
              <AnimatePresence>
                {isLoggingIn && (
                  <motion.p
                    className="mt-3 text-xs text-muted-foreground text-center"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    data-ocid="login.loading_state"
                  >
                    A pop-up window will open — please allow it in your browser.
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Error state */}
              <AnimatePresence>
                {hasError && (
                  <motion.p
                    className="mt-3 text-xs text-destructive text-center"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    data-ocid="login.error_state"
                  >
                    Login failed or was cancelled. Please try again.
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="mt-5 pt-5 border-t border-border text-center">
                <p className="text-xs text-muted-foreground/70 leading-relaxed">
                  Internet Identity is a privacy-first login system on the
                  Internet Computer. No tracking, no data collection.
                </p>
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground/50">
              Your chat history is encrypted and stored on-chain.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
