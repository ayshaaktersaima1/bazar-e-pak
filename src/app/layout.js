import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../hooks/use-cart";
import { Toaster } from "react-hot-toast";
import { ShopProvider } from "../hooks/use-shop";

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
          <ShopProvider>
            <CartProvider>{children}</CartProvider>
          </ShopProvider>

          <Toaster position="bottom-right" />
        </main>
      </body>
    </html>
  );
}