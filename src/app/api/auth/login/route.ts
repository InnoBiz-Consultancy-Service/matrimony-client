// app/api/auth/login/route.ts
export async function POST(req: Request) {
  const body = await req.json();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include", // cookie forwarding
  });
  
  const data = await res.json();
  return new Response(JSON.stringify(data), { status: res.status });
}
