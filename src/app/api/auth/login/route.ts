// // app/api/auth/login/route.ts
// export async function POST(req: Request) {
//   const body = await req.json();
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//     credentials: "include", // cookie forwarding
//   });

//   const data = await res.json();
//   return new Response(JSON.stringify(data), { status: res.status });
// }

// app/api/auth/login/route.ts

// app/api/auth/login/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // Login API call
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include", // cookie forwarding
  });

  const data = await res.json();
  console.log("this call from auth page:", data);

  // Create NextResponse
  const response = NextResponse.json(data, { status: res.status });

  // If login successful, fetch profile status and set cookie
  if (data.token) {
    try {
      // Fetch profile/biodata status
      const profileResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/biodata/my-biodata`,
        {
          headers: {
            Authorization: `${data.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Set profileStatus based on response status
      let profileStatus;
      if (profileResponse.status === 404) {
        profileStatus = "false";
        console.log("Biodata not found - setting profileStatus: false");
      } else if (profileResponse.ok) {
        profileStatus = "true";
        console.log("Biodata found - setting profileStatus: true");
      } else {
        profileStatus = "false";
        console.log("Other error - setting profileStatus: false");
      }

      // Set cookie with profile status (true/false)
      response.cookies.set("profileStatus", profileStatus, {
        httpOnly: false,
        secure: false, //process.env.NODE_ENV === 'production',
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
        domain: undefined,
      });
    } catch (error) {
      console.error("Error fetching profile status during login:", error);
      // Set false if fetch fails
      response.cookies.set("profileStatus", "false", {
        httpOnly: false,
        secure: false, //process.env.NODE_ENV === 'production',
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
        domain: undefined,
      });
    }
  }

  return response;
}
