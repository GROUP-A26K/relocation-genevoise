export async function getPropertyDetail(id: string, locale: string = "en") {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const res = await fetch(`${baseUrl}/api/properties/${id}`, {
    headers: { "Accept-Language": locale },
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch property detail");
  }

  const { data } = await res.json();
  return data;
}