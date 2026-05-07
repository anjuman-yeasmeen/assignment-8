import { auth } from "@/lib/auth"; // আপনার তৈরি করা lib/auth.js ফাইলটি ইমপোর্ট করুন
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);





