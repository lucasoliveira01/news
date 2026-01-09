test("GET to /api/v1/status returns 200 and correct message", async () => {
  const res = await fetch("http://localhost:3000/api/v1/status");
  expect(res.status).toBe(200);

  const responseBody = await res.json();

  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(parsedUpdatedAt).toBe(responseBody.updated_at);

  expect(responseBody.dependencies.postgres_version).toBeDefined();
  expect(responseBody.dependencies.postgres_version).toBe("17.7");

  expect(responseBody.dependencies.postgres_max_connections).toBeDefined();
  expect(responseBody.dependencies.postgres_max_connections).toEqual(
    expect.any(Number),
  );

  expect(responseBody.dependencies.postgres_used_connections).toBeDefined();
  expect(responseBody.dependencies.postgres_used_connections).toEqual(0);
});
