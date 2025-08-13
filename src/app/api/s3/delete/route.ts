import { S3 } from "@/lib/S3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { config } from "dotenv";
import { NextResponse } from "next/server";

config();

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const key = body.key;

    if (!key) {
      return NextResponse.json(
        {
          error: "Missing or invalid object key",
        },
        { status: 400 }
      );
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_NAME,
      Key: key,
    });

    await S3.send(command);

    return NextResponse.json(
      { message: "File deleted successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        error: "Missing or invalid object key",
      },
      { status: 500 }
    );
  }
}
