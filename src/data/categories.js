import {
    FaChair,
    FaHeadphones,
    FaPumpSoap,
} from "react-icons/fa";
import { GiHoneyJar } from "react-icons/gi";

const categories = [
    {
        id: 1,
        category: "honey",
        title: "Pure Forest Honey",
        sectionTitle: "Honey Products",
        subtitle: "Pure and Natural",
        description:
            "Discover our natural Berry Honey and Acacia Honey, carefully selected for rich taste and premium quality.",
        cardDescription: "Berry Honey, Acacia Honey and more",
        image: "/images/b1.webp",
        imageClass: "bg-[url('/images/p1Honey.webp')]",
        href: "/collection/honey",
        icon: GiHoneyJar,
    },
    {
        id: 2,
        category: "mehak",
        title: "Mehak Collection",
        sectionTitle: "Mehak Products",
        subtitle: "Fresh and Fragrant",
        description:
            "Explore our collection of body sprays, perfumes and pen perfumes designed for everyday freshness and long-lasting fragrance.",
        cardDescription: "Body Spray, Perfumes and Pen Perfume",
        image: "/images/b1.webp",
        imageClass: "bg-[url('/images/mehak-page-banner.webp')]",
        href: "/collection/mehak",
        icon: FaPumpSoap,
    },
    {
        id: 3,
        category: "mobile",
        title: "Mobile Accessories",
        sectionTitle: "Mobile Accessories",
        subtitle: "Smart and Reliable",
        description:
            "Explore useful mobile accessories including chargers, Air Pods, headphones, storage devices, power banks and phone holders.",
        cardDescription: "Chargers, Headphones, Power Bank and more",
        image: "/images/b1.webp",
        imageClass: "bg-[url('/images/mobile-page-banner.webp')]",
        href: "/collection/mobile",
        icon: FaHeadphones,
    },
    {
        id: 4,
        category: "furniture",
        title: "Best Furniture",
        sectionTitle: "Furniture Products",
        subtitle: "Comfortable and Reliable",
        description:
            "Explore practical and comfortable furniture for offices, classrooms and study spaces.",
        cardDescription: "Office Table, Chairs, Sofa and more",
        image: "/images/b1.webp",
        imageClass: "bg-[url('/images/furniture-page-banner.webp')]",
        href: "/collection/furniture",
        icon: FaChair,
    },
];

export default categories;