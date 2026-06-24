import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // যদি আপনার প্রজেক্টের বেইস URL আলাদা হয়, তবে এখানে সেটি দিতে পারেন। 
    // সাধারণত এটি এনভায়রনমেন্ট ভ্যারিয়েবল থেকে নেয়।
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000" 
});