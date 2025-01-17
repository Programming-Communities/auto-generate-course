import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY || "",
  privateKey: process.env.PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT || "",
});

export async function GET(request) {
  try {
    const authParams = imagekit.getAuthenticationParameters();
    return NextResponse.json(authParams);
  } catch (error) {
    console.error("Error generating authentication parameters:", error);
    return NextResponse.json({ error: "Failed to generate authentication parameters" }, { status: 500 });
  }
}


