# Condo Ledger

ระบบบริหารคอนโดสำหรับผู้ใช้คนเดียว: หน้าเว็บเปิดออนไลน์ผ่าน GitHub Pages แต่ข้อมูล/เอกสารอยู่ใน browser และ PC ของผู้ใช้ GitHub เก็บเฉพาะโค้ด

## เริ่มใช้งาน

1. ติดตั้ง Node.js LTS หนึ่งครั้ง (ถ้ายังไม่มี)
2. เปิด PowerShell ในโฟลเดอร์นี้
3. รัน `node server.js`
4. เปิด `http://127.0.0.1:8787` ในเบราว์เซอร์

## การจัดเก็บในโหมด Local

- รายการรายรับ/รายจ่ายและทรัพย์สิน: `localStorage` ของเบราว์เซอร์
- ไฟล์ที่นำเข้า: `IndexedDB` ของเบราว์เซอร์ในเครื่องเดียวกัน
- ไฟล์ต้นฉบับในโฟลเดอร์คอนโดจะไม่ถูกอ่าน อัปโหลด เปลี่ยนชื่อ หรือย้ายโดยอัตโนมัติ

ข้อมูลจะอยู่ใน browser profile ที่ใช้งานอยู่เท่านั้น: อย่าล้าง browser data และควรทำ Export/Backup ก่อนเปลี่ยนเครื่องหรือรีเซ็ตเบราว์เซอร์

## GitHub policy

- สร้าง repository แบบ **Private** เพื่อ version control ของ source code เท่านั้น
- ห้าม commit โฟลเดอร์เอกสารคอนโด, ใบเสร็จ, สัญญา, ไฟล์ backup หรือข้อมูลการเงินที่ export แล้ว
- GitHub Pages publish เฉพาะ `dist/` ผ่าน workflow; หน้าเว็บออนไลน์จึงไม่มีไฟล์เอกสารหรือข้อมูลธุรกรรมของคุณ

## Online URL with local files

หลัง enable GitHub Pages และ push branch `main` หน้าเว็บจะอยู่ที่ `https://pongpol-ai.github.io/condo-ledger-rental-manager/` ข้อมูลที่คุณบันทึกในเว็บอยู่เฉพาะ browser + device นั้น และจะไม่แสดงเมื่อเปิด URL เดียวกันในเครื่องอื่น

Chrome/Edge รองรับปุ่ม “เลือกโฟลเดอร์” บนหน้า Document Vault ผ่าน File System Access API (ต้องเลือกโฟลเดอร์และอนุญาตด้วยตัวเอง); GitHub Pages ใช้ HTTPS ซึ่งจำเป็นสำหรับ API นี้. Firefox/Safari ใช้การเลือกไฟล์แบบปกติได้ แต่ยังไม่รองรับตัวเลือกโฟลเดอร์นี้ครบถ้วน

## Backup

ใช้ปุ่ม "Full Backup" ในแอปเพื่อ export ZIP ที่รวมรายการทั้งหมดและไฟล์แนบจาก IndexedDB เก็บไว้ในโฟลเดอร์ backup ที่คุณเลือกเอง ก่อนล้าง browser data หรือย้ายเครื่อง ให้สร้าง backup และใช้ Restore Backup ในปลายทาง

## Property & Lease Management

เวอร์ชันนี้เพิ่ม Contract Generator, Contract Archive, Property Photo Gallery และ Status Settings แล้ว ข้อมูลรวมถึงไฟล์แนบอยู่ใน IndexedDB และ Full Backup จะสร้าง ZIP ที่รวม metadata กับไฟล์แนบทั้งหมด ใช้ `npm run build` เพื่อตรวจ syntax และ `npm test` เพื่อตรวจ rule ป้องกันช่วงสัญญาทับซ้อน
