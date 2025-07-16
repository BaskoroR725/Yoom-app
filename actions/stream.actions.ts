"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

// test
console.log("--- START tokenProvider FILE LOADING ---");
console.log("API Key (file scope):", process.env.NEXT_PUBLIC_STREAM_API_KEY);
console.log("API Secret (file scope):", process.env.STREAM_API_SECRET);
console.log("--- END tokenProvider FILE LOADING ---");

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

const tokenProvider = async () => {
  const user = await currentUser();

  if (!user) throw new Error("User is not logged in");
  if (!apiKey) throw new Error("No API key");
  if (!apiSecret) throw new Error("No API secret");

  /*   const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
  const issued = Math.floor(Date.now() / 1000) - 60;  this is deprecated */
  const client = new StreamClient(apiKey, apiSecret);
  const validity = 60 * 60;
  const token = client.generateUserToken({
    user_id: user.id,
    validity_in_seconds: validity,
  });

  return token;
};

export default tokenProvider;
