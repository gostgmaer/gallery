import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string().url("NEXT_PUBLIC_BASE_URL must be a valid URL"),
  NEXT_PUBLIC_IMAGE_URL: z.string().url("NEXT_PUBLIC_IMAGE_URL must be a valid URL"),
  NEXT_PUBLIC_IMAGE_API_TOKEN: z.string().min(5, "NEXT_PUBLIC_IMAGE_API_TOKEN is required"),
});

type Env = z.infer<typeof envSchema>;

let cachedEnv: Env | null = null;

export function getEnv(): Env {
  if (cachedEnv) {
    return cachedEnv;
  }

  const env = {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_IMAGE_URL: process.env.NEXT_PUBLIC_IMAGE_URL,
    NEXT_PUBLIC_IMAGE_API_TOKEN: process.env.NEXT_PUBLIC_IMAGE_API_TOKEN,
  };

  const result = envSchema.safeParse(env);
  if (!result.success) {
    console.error(
      "❌ Invalid environment variables:",
      result.error.flatten().fieldErrors
    );
    throw new Error(
      "Missing or invalid environment variables. Check your .env file."
    );
  }

  cachedEnv = result.data;
  return cachedEnv;
}
