import "./design-system.css";
import "./globals.css";
import localFont from "next/font/local";
import Navbar from "@/components/ui/navbar/navbar";
import Footer from "@/components/ui/footer/footer";

const aeonik = localFont({
  src: [
    {
      path: "./fonts/AeonikTRIAL-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  adjustFontFallback: "Arial",
  preload: true,
  display: "swap",
  variable: "--aeonik",
});
const nbgrotesk = localFont({
  src: [
    {
      path: "./fonts/NBGroteskPro55MNormal-TRIAL.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/NBGroteskPro75MFett-TRIAL.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  adjustFontFallback: "Arial",
  preload: true,
  display: "swap",
  variable: "--nbgrotesk",
});

export const metadata = {
  title: "Endex Website",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${aeonik.variable} ${nbgrotesk.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
