import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../hooks/use-cart";
import { Toaster } from "react-hot-toast";
import { ShopProvider } from "../hooks/use-shop";
import { ProductProvider } from "@/hooks/use-product";
import { CategoryProvider } from "@/hooks/use-categories";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-lora",
});

export const metadata = {
  title: "Bazar-e-Pak",
  description:
    "Bazar-e-Pak is intended to become a professional Pakistani business discovery, promotion, and digital marketplace platform.",
  authors: [
    {
      name: "Aysha Akter Saima",
      url: "https://github.com/ayshaaktersaima1",
    },
    {
      name: "Abdur Rahman Adil",
      url: "https://github.com/SyntaxAdil",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <main className="flex-1">
          <CategoryProvider>
            <ShopProvider>
              <CartProvider>
                <ProductProvider>
                  {children}
                </ProductProvider>
              </CartProvider>
            </ShopProvider>
          </CategoryProvider>

          <Toaster position="top-center" />
        </main>
      </body>
    </html>
  );
}