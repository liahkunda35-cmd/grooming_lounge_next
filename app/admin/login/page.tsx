import { redirect } from "next/navigation";

type SearchParams = Record<string, string | string[] | undefined>;

/** Legacy URL — always send visitors to /login */
export default async function AdminLoginRedirectPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") query.set(key, value);
    else if (Array.isArray(value) && value[0]) query.set(key, value[0]);
  }

  const qs = query.toString();
  redirect(qs ? `/login?${qs}` : "/login");
}
