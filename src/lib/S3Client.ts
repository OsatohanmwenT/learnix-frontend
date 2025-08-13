import "server-only"

import { S3Client } from "@aws-sdk/client-s3"
import { config } from "dotenv"

config();

export const S3 = new S3Client({
    region: "auto",
    endpoint: process.env.AWS_ENDPOINT_URL_S3,
    forcePathStyle: false
})