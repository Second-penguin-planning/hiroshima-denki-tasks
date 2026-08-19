export const SESSION_COOKIE = "hde_session";

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function getSessionToken(): Promise<string> {
  const password = process.env.APP_PASSWORD ?? "";
  return sha256Hex(`hiroshima-denki-tasks:${password}`);
}

export async function isValidSession(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const expected = await getSessionToken();
  return token === expected;
}
