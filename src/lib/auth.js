import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  // Google সোশ্যাল লগইন — Google Cloud Console থেকে OAuth ক্রেডেনশিয়াল লাগবে।
  // ক্লায়েন্ট থেকে authClient.signIn.social({ provider: "google" }) কল করলে
  // BetterAuth ইউজারকে Google-এ পাঠায়, এরপর /api/auth/callback/google-এ ফিরিয়ে আনে।
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  // একই ইমেইলে আগে email/password দিয়ে অ্যাকাউন্ট থাকলে, Google দিয়ে লগইন করলে
  // ডিফল্টে "account_not_linked" এরর দেয়। Google-এর ইমেইল ভেরিফায়েড বলে এটিকে
  // trusted provider ধরে অটো-লিংক করতে দিই।
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
      // আমাদের অ্যাপে email verification নেই, তাই বিদ্যমান email/password অ্যাকাউন্টের
      // emailVerified সবসময় false থাকে। ডিফল্টে লিংক করতে লোকাল ইমেইল ভেরিফায়েড লাগে,
      // তাই এটিকে false করে দিই — না হলে "account_not_linked" এরর আসে।
      requireLocalEmailVerified: false,
    },
  },
});
