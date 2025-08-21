# Courier & Parcel Management System (MERN) — স্টার্টার প্যাক

এটা একটি **MERN স্টার্টার প্রজেক্ট** (MongoDB, Express, React, Node) যেখানে কুরিয়ার/পার্সেল সিস্টেমের বেসিক ফিচার, রোল-ভিত্তিক অ্যাক্সেস, সকেট-ভিত্তিক রিয়েলটাইম আপডেট, গুগল ম্যাপস ইন্টিগ্রেশন (ফ্রন্টএন্ডে) এবং রিপোর্ট এক্সপোর্টের স্ক্যাফোল্ড তৈরি আছে।

## কী কী আছে
- **Roles:** Admin, Agent, Customer
- **Auth:** JWT, Role-based Middleware
- **APIs:** Auth, Parcel CRUD, Agent Assignment, Status Update, Analytics/Reports
- **Realtime:** Socket.IO (স্ট্যাটাস/লোকেশন আপডেট)
- **Tracking:** গুগল ম্যাপস ফ্রন্টএন্ড কম্পোনেন্ট (API key লাগবে)
- **Reports:** CSV/PDF জেনারেটর (PDFKit)
- **Extras:** QR Code জেনারেশন (qrcode), i18n (বাংলা/English), Postman collection

## লোকাল রান করার ধাপ
1) **MongoDB** লোকালি চালু রাখুন অথবা MongoDB Atlas কানেকশন স্ট্রিং নিন।  
2) সার্ভারে `.env` তৈরি করুন (নিচে উদাহরণ আছে), এরপর:
```bash
cd server
npm i
npm run dev
```
3) ফ্রন্টএন্ডে:
```bash
cd client
npm i
npm run dev
```
4) ব্রাউজার: http://localhost:5173

### `server/.env.example`
```
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/courier_db
JWT_SECRET=supersecret
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
EMAIL_FROM=noreply@example.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=demo
SMTP_PASS=demo
```
এটা কপি করে `.env` নামে সেভ করুন এবং মানগুলো নিজের মতো দিন।

### `client/.env.example`
```
VITE_API_BASE=http://localhost:4000/api
VITE_SOCKET_URL=http://localhost:4000
VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
VITE_DEFAULT_LANG=bn
```

## স্ক্রিপ্টস
- **server**: `npm run dev` (nodemon), `npm run start` (prod)
- **client**: `npm run dev`, `npm run build`, `npm run preview`

## Postman
`postman/Courier-Parcel.postman_collection.json` ফাইলটা ইম্পর্ট করুন।

## কাভার্ড ইউজ-ফ্লো (MVP)
- Customer রেজিস্টার/লগইন → Parcel বুকিং → রিয়েলটাইম স্ট্যাটাস দেখা/ট্র্যাকিং
- Admin ড্যাশবোর্ড → এজেন্ট অ্যাসাইন/সব বুকিং/ইউজার দেখা → রিপোর্ট এক্সপোর্ট
- Agent লগইন → Assigned পার্সেল দেখা → স্ট্যাটাস আপডেট + লোকেশন আপডেট (Socket)

> **নোট:** এটা স্টার্টার কোড—প্রোডাকশনে নেওয়ার আগে সিকিউরিটি, ভ্যালিডেশন, রেট-লিমিটিং, ইমেল/SMS প্রোভাইডার, ফাইল স্টোরেজ, ডিপ্লয়মেন্ট কনফিগ ইত্যাদি শক্ত করে নিন।
