const BASE_URL = "http://localhost:4000/v1";

export async function getProducts({ page = 1, limit = 10, name = "", status = "" } = {}) {
  const params = new URLSearchParams({ page, limit });
  if (name) params.append("name", name);
  if (status) params.append("status", status);

  const response = await fetch(`${BASE_URL}/products?${params}`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return await response.json();
}

export async function createProduct(data) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create product");
  return await response.json();
}

export async function updateProduct(id, data) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update product");
  return await response.json();
}

export async function deleteProduct(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to delete product");
  return await response.json();
}
