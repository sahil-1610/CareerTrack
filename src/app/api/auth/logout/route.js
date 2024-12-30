import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      status: 200,
    });

    // Clear the auth cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/"
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to logout" }, 
      { status: 500 }
    );
  }
}
