# 📝 Oddiy Quiz API (Node.js & SQLite3)

Ushbu loyiha o'quvchilar va dasturlashni o'rganayotganlar uchun mo'ljallangan oddiy test (quiz) tizimi backend qismidir. Adminlar test qo'shishi, foydalanuvchilar esa testlarni yechib, natijalarini o'zbek tilida olishlari mumkin.

## 🚀 Imkoniyatlar
* **Testlarni ko'rish:** Barcha mavjud savollarni olish (javoblarsiz).
* **Test qo'shish:** Yangi savollar va to'g'ri javoblarni kiritish.
* **Natijani hisoblash:** Foydalanuvchi javoblarini tekshirish va foizlarda natija qaytarish.
* **Swagger Docs:** API bilan tanishish va sinab ko'rish uchun qulay interfeys.
* **Tozalash:** Bazadagi barcha testlarni bir marta o'chirish.

## 🛠 Texnologiyalar
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** SQLite3 (Fayl ko'rinishida, o'rnatish shart emas)
* **Documentation:** Swagger UI

---

## 💻 O'rnatish va ishga tushirish

Loyiha kompyuteringizda ishlashi uchun quyidagi qadamlarni bajaring:

1.  **Loyihani yuklab oling (Clone):**
    ```bash
    git clone [https://github.com/sizning-profilingiz/quiz-api.git](https://github.com/sizning-profilingiz/quiz-api.git)
    cd quiz-api
    ```

2.  **Kerakli kutubxonalarni o'rnating:**
    ```bash
    npm install
    ```

3.  **Serverni ishga tushiring:**
    ```bash
    npm start
    ```
    *Agar kodni o'zgartirib turmoqchi bo'lsangiz:* `npm run dev` (nodemon o'rnatilgan bo'lsa).

---

## 📖 API Hujjatlari (Swagger)

Server ishga tushgandan so'ng, brauzerda quyidagi manzilga kiring:
👉 [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

U yerda siz har bir endpointni (GET, POST, DELETE) real vaqtda sinab ko'rishingiz mumkin.

---

## 📁 Loyiha strukturasi
```text
├── config/         # Baza va Swagger sozlamalari
├── controller/     # Logika va hisob-kitoblar
├── models/         # Ma'lumotlar bazasi so'rovlari
├── router/         # API yo'llari (Endpoints)
├── server.js       # Asosiy kirish fayli
└── quiz.db         # SQLite ma'lumotlar bazasi fayli