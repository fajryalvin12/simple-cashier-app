const BASE_URL = "http://localhost:3000/v1";

export async function getDashboardSummary() {
  const response = await fetch(`${BASE_URL}/dashboard/summary`);
  if (!response.ok) {
    throw new Error("Failed to fetch dashboard summary");
  }

  const data = await response.json();
  return data.data;
}
