# Job Applicant Management System

ระบบจัดการผู้สมัครงาน พัฒนาด้วย Astro, React และ Google Apps Script (GAS) โดยใช้ Google Sheets เป็นฐานข้อมูล

## Tech Stack
- **Frontend:** Astro, React (TypeScript)
- **Backend:** Google Apps Script (API)
- **Database:** Google Sheets
- **Styling:** Tailwind CSS (Responsive Design)

## Features
- [x] **Applicant List:** แสดงรายการผู้สมัคร พร้อมสถานะ
- [x] **Create Applicant:** เพิ่มผู้สมัครใหม่ (พร้อม Validation และ Duplicate Check)
- [x] **Update Applicant:** แก้ไขข้อมูลและสถานะ (พร้อม Status Flow Logic)
- [x] **Delete Applicant:** ลบข้อมูลผู้สมัคร (พร้อมการยืนยัน)
- [x] **Search/Filter/Sort:** ค้นหาตามชื่อ, กรองตามสถานะ, เรียงตามวันที่ล่าสุด
- [x] **Pagination:** แบ่งหน้าเพื่อการจัดการข้อมูลที่มีประสิทธิภาพ
- [x] **Responsive:** รองรับทั้ง Desktop และ Mobile

## วิธีการติดตั้งและรันระบบ

### 1. ส่วนของ Backend (Google Apps Script)
1. สร้าง **Google Sheets** ใหม่
2. ไปที่เมนู **Extensions > Apps Script**
3. คัดลอกโค้ดจากไฟล์ `backend/code.js` ในโปรเจกต์นี้ไปวางใน Script Editor
4. กดปุ่ม **Deploy > New Deployment**
5. เลือกประเภทเป็น **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. คัดลอก **Web App URL** ที่ได้ไว้

### 2. ส่วนของ Frontend (Astro + React)
1. Clone repository นี้ลงเครื่อง
2. ติดตั้ง dependencies:
   ```bash
   npm install
   ```
3. สร้างไฟล์ `.env` ที่ root directory และเพิ่ม URL ของ GAS:
   ```env
   PUBLIC_GAS_API_URL=คัดลอก_URL_จากขั้นตอนที่แล้ว_มาวางที่นี่
   ```
4. รันโปรเจกต์ในโหมด development:
   ```bash
   npm run dev
   ```
5. เปิดเบราว์เซอร์ไปที่ `http://localhost:4321`

## การเชื่อมต่อ Google Sheets
ระบบจะสร้าง Sheet ชื่อ `Applicants` ให้อัตโนมัติเมื่อมีการเรียกใช้งานครั้งแรก โดยมีโครงสร้างดังนี้:
`id | name | phone | email | position | status | note | created_at`

## การ Deployment
สามารถนำ Frontend ไป Deploy ได้ที่:
- **Vercel:** เชื่อมต่อ GitHub และตั้งค่า Environment Variable `PUBLIC_GAS_API_URL`
- **Netlify:** เช่นเดียวกับ Vercel
- **GitHub Pages:** ต้องตั้งค่า build script ให้ถูกต้อง

---
*หมายเหตุ: เนื่องจาก Google Apps Script มีข้อจำกัดเรื่อง CORS หากทดสอบใน Local แล้วติดปัญหา ให้ลองใช้ Web App URL ที่ Deploy แล้วจริงๆ หรือตั้งค่า Headers ใน GAS ให้ถูกต้อง*
