import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || "admin";

    if (password === adminPassword) {
      // Return a successful response and a session identifier
      return NextResponse.json({ 
        success: true, 
        token: "sai_portfolio_admin_authorized_token" 
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid credentials. Access denied." },
      { status: 401 }
    );
  } catch (error: any) {
    console.error("Auth API Error:", error);
    return NextResponse.json(
      { success: false, error: "Server authentication error." },
      { status: 500 }
    );
  }
}
