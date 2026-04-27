import { createActor } from "@/backend";
import type { Backend } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";

/**
 * Returns the authenticated backend actor.
 * The actor is ready when isFetching is false and actor is not null.
 */
export function useBackend() {
  const { actor, isFetching } = useActor<Backend>(createActor);
  return { actor, isReady: !!actor && !isFetching };
}
