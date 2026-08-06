const products = [
    {
        id: 1,
        name: "Berry Honey",
        price: "PKR 1,200",
        image: "/images/berry-honey.webp",
        category: "honey",
        description:
            "Pure and natural Berry Honey with a rich taste and smooth texture. A delicious choice for breakfast, drinks and everyday use.",
    },
    {
        id: 2,
        name: "Acacia Honey",
        price: "PKR 1,350",
        image: "/images/acacia-honey.webp",
        category: "honey",
        description:
            "Natural Acacia Honey with a light color and mild taste. Perfect for tea, toast and daily use.",
    },
    {
        id: 3,
        name: "Body Spray",
        price: "PKR 1,150",
        image: "/images/body-spray.webp",
        category: "mehak",
        description:
            "A refreshing body spray with a pleasant fragrance that helps you stay fresh and confident throughout the day.",
    },
    {
        id: 4,
        name: "Mehak Perfume",
        price: "PKR 950",
        image: "/images/mehak-perfume.webp",
        category: "mehak",
        description:
            "A stylish perfume with a smooth and long-lasting fragrance. Suitable for daily wear and special occasions.",
    },
    {
        id: 5,
        name: "Pen Perfume",
        price: "PKR 650",
        image: "/images/pen-perfume.webp",
        category: "mehak",
        description:
            "A compact and easy-to-carry pen perfume that lets you refresh your fragrance anytime and anywhere.",
    },
    {
        id: 6,
        name: "C Type Mobile Charger",
        price: "PKR 1,000",
        image: "/images/c-type-charger.webp",
        category: "mobile",
        description:
            "A reliable C Type mobile charger designed for safe and efficient charging of compatible smartphones and devices.",
    },
    {
        id: 7,
        name: "Air Pods Pro",
        price: "PKR 2,850",
        image: "/images/air-pods-pro.webp",
        category: "mobile",
        description:
            "Wireless Air Pods Pro with clear sound and a comfortable fit. Ideal for music, calls and everyday use.",
    },
    {
        id: 8,
        name: "Woofer Hands Free",
        price: "PKR 850",
        image: "/images/woofer-hands-free.webp",
        category: "mobile",
        description:
            "A wired hands-free headset with powerful sound and clear voice quality for music, calls and entertainment.",
    },
    {
        id: 9,
        name: "Car USB Charger",
        price: "PKR 750",
        image: "/images/car-usb-charger.webp",
        category: "mobile",
        description:
            "A compact car USB charger that keeps your mobile devices powered while you travel.",
    },
    {
        id: 10,
        name: "Wireless Headphones",
        price: "PKR 3,200",
        image: "/images/wireless-headphones.webp",
        category: "mobile",
        description:
            "Comfortable wireless headphones with clear audio and an easy connection for music, gaming and calls.",
    },
    {
        id: 11,
        name: "SSD USB Drive",
        price: "PKR 2,500",
        image: "/images/ssd-usb-drive.webp",
        category: "mobile",
        description:
            "A portable SSD USB drive for storing and transferring important files, documents, photos and videos.",
    },
    {
        id: 12,
        name: "Power Bank",
        price: "PKR 2,200",
        image: "/images/power-bank.webp",
        category: "mobile",
        description:
            "A portable power bank that provides backup charging for your mobile devices when you are away from a power source.",
    },
    {
        id: 13,
        name: "Phone Holder",
        price: "PKR 650",
        image: "/images/phone-holder.webp",
        category: "mobile",
        description:
            "A practical phone holder that keeps your device stable and easily visible while working, watching videos or travelling.",
    },
    {
        id: 14,
        name: "Office Table",
        price: "PKR 12,500",
        image: "/images/office-table.webp",
        category: "furniture",
        description:
            "A spacious and practical office table designed to provide a comfortable and organized workspace.",
    },
    {
        id: 15,
        name: "Class Room Dice",
        price: "PKR 4,500",
        image: "/images/class-room-dice.webp",
        category: "furniture",
        description:
            "A strong classroom desk designed for comfortable study and regular use in schools, colleges and training centres.",
    },
    {
        id: 16,
        name: "Student Chair",
        price: "PKR 3,800",
        image: "/images/student-chair.webp",
        category: "furniture",
        description:
            "A comfortable and durable student chair designed for classrooms, study rooms and learning spaces.",
    },
    {
        id: 17,
        name: "Office Chair",
        price: "PKR 8,500",
        image: "/images/office-chair.webp",
        category: "furniture",
        description:
            "A comfortable office chair that provides useful support during long working and sitting hours.",
    },
    {
        id: 18,
        name: "Student Sofa Chair",
        price: "PKR 6,500",
        image: "/images/student-sofa-chair.webp",
        category: "furniture",
        description:
            "A soft and comfortable student sofa chair suitable for reading, studying and relaxing in educational spaces.",
    },
];

export default products;