test("GET to /api/v1/status returns 200 and correct message", async () => {
  const res = await fetch("http://localhost:3000/api/v1/status");
  const data = await res.json();

  expect(res.status).toBe(200);
  expect(data).toEqual({ data: "São acima da média" });
});
