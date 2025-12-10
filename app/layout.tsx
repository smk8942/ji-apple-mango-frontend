import { Inter } from "next/font/google";
import "./globals.css";
import Aoscompo from "../utils/aos";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "@/contexts/AuthContext";
const font = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" >
      <body className={`${font.className} `}>
        <AuthProvider>
          <Aoscompo>
            <Header />
            <main className="flex-1 w-full">
              {children}
            </main>
            <Footer />
          </Aoscompo>
          <ScrollToTop />
        </AuthProvider>
      </body>
    </html>
  );
}
