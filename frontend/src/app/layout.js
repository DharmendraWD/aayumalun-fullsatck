
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastProvider from "../components/toast/ToastProvider";

import localFont from "next/font/local";
import AOSInit from "../components/AOSInit";


const myFont = localFont({
  src: "../../src/font/SatoshiRegular.otf",
  variable: "--font-myfont",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aayumalun",
  description: "  Aayumalun is a company that constructs hydropower structures and creates projects that inspire confidence, stand strong against time, and deliver reliable clean energy to the people who live and work in the region.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={myFont.variable}>
      <body
        className={`${myFont.variable}`}
      >
        {/* <Navbar></Navbar> */}
        <ToastProvider />
        <AOSInit />
        {children}
        {/* <Footer></Footer> */}
      </body>
    </html>
  );
}
