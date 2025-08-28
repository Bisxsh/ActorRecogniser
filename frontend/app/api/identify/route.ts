import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const res = await fetch(`${process.env.SERVICE_API_URL}/identify-actor`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.error || `Service responded with status: ${res.status}`
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to process API request:", error);
    return NextResponse.json(
      { error: "Could not process the request. Please try again." },
      { status: 500 }
    );
  }
}
