// src/lib/auth.js
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    // এখানে আপনার ডাটাবেস কনফিগারেশন থাকবে (আপাতত বেসিক রাখছি)
    emailAndPassword: {  
        enabled: true
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
    },
    plugins: [nextCookies()]
});