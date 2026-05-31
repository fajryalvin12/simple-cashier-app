const BASE_URL = "http://localhost:3000/v1";

export async function getTransactionsList() {
  const response = await fetch(`${BASE_URL}/transactions`);
  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }

  const data = await response.json();
  return data.data;
}

export async function getTransactionDetails(id) {
  const response = await fetch(`${BASE_URL}/transactions/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch transaction details");
  }

  const data = await response.json();
  return data.data;
}
