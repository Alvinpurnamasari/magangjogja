import { Geist, Luckiest_Guy } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const luckiestGuy = Luckiest_Guy({
  variable: "--font-luckiest-guy",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Magang Jogja",
  description: "Tempat magang, PKL, dan praktik kerja di Yogyakarta",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={`${geist.variable} ${luckiestGuy.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}