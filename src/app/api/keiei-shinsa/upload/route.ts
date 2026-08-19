import { createUploadRouteHandlers } from "@/lib/upload-route-handlers";

export const dynamic = "force-dynamic";

export const { POST, DELETE } = createUploadRouteHandlers(
  "state/keiei-shinsa-state.json",
  "uploads/keiei-shinsa/",
);
