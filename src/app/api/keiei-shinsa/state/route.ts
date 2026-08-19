import { createStateRouteHandlers } from "@/lib/state-route-handlers";

export const dynamic = "force-dynamic";

export const { GET, POST } = createStateRouteHandlers("state/keiei-shinsa-state.json");
