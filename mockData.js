const mockQuizzes = [
    {
        id: 1,
        question: "JavaScript dasturlash tilining yaratuvchisi kim?",
        a: "Brendan Eich",
        b: "Douglas Crockford",
        c: "Ryan Dahl",
        d: "Linus Torvalds",
        correct_answer: "a"
    },
    {
        id: 2,
        question: "Node.js nima uchun ishlatiladi?",
        a: "Faqat frontend uchun",
        b: "Server-side JavaScript ishga tushirish uchun",
        c: "Faqat database bilan ishlash uchun",
        d: "Faqat mobil ilovalar uchun",
        correct_answer: "b"
    },
    {
        id: 3,
        question: "JSON ning to'liq nomi nima?",
        a: "Java Standard Object Notation",
        b: "JavaScript Object Notation",
        c: "Java Script Online Network",
        d: "JavaScript Oriented Network",
        correct_answer: "b"
    },
    {
        id: 4,
        question: "Express.js nima?",
        a: "Database",
        b: "Programming tili",
        c: "Node.js framework",
        d: "Browser",
        correct_answer: "c"
    },
    {
        id: 5,
        question: "HTTP 200 status code nimani bildiradi?",
        a: "Server xatosi",
        b: "Muvaffaqiyatli so'rov",
        c: "Sahifa topilmadi",
        d: "Ruxsat berilmagan",
        correct_answer: "b"
    },
    {
        id: 6,
        question: "REST API da GET metodi nima uchun ishlatiladi?",
        a: "Ma'lumot yaratish uchun",
        b: "Ma'lumot o'chirish uchun",
        c: "Ma'lumot olish uchun",
        d: "Ma'lumot yangilash uchun",
        correct_answer: "c"
    },
    {
        id: 7,
        question: "JWT ning to'liq nomi nima?",
        a: "Java Web Token",
        b: "JSON Web Token",
        c: "JavaScript Web Tool",
        d: "Java Web Tool",
        correct_answer: "b"
    },
    {
        id: 8,
        question: "MongoDB qanday turdagi database?",
        a: "Relational database",
        b: "Graph database", 
        c: "NoSQL document database",
        d: "Key-value database",
        correct_answer: "c"
    },
    {
        id: 9,
        question: "npm nima uchun ishlatiladi?",
        a: "Faqat kod yozish uchun",
        b: "Package management uchun",
        c: "Database yaratish uchun",
        d: "Server ishga tushirish uchun",
        correct_answer: "b"
    },
    {
        id: 10,
        question: "CORS nimani anglatadi?",
        a: "Cross-Origin Resource Sharing",
        b: "Cross-Object Resource System",
        c: "Core Object Resource Sharing",
        d: "Cross-Origin Request System",
        correct_answer: "a"
    }
];

// Test javoblari misoli
const mockAnswers = {
    "1": "a",
    "2": "b", 
    "3": "b",
    "4": "c",
    "5": "b",
    "6": "c",
    "7": "b",
    "8": "c",
    "9": "b",
    "10": "a"
};

module.exports = { mockQuizzes, mockAnswers };