import "@common/styles/globals.scss";

import { Roboto } from "next/font/google";

import NavBar from "@common/components/NavBar.client";
import GTMProvider from "@common/contexts/GTMProvider.client";
import ThemeProvider from "@common/contexts/ThemeProvider.client";

import type { Metadata } from "next";

// If loading a variable font, you don't need to specify the font weight
const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio | 2023",
  description: "2023 Portfolio by cuttleman",
};

export default function RootLayout(props) {
  return (
    <html className={roboto.className} lang="ko">
      <body className="dark">
        <GTMProvider>
          <ThemeProvider>
            <NavBar />
            <main>
              {props.section01}
              {props.section02}
              {props.section03}
              {props.section04}
            </main>
          </ThemeProvider>
        </GTMProvider>
      </body>
    </html>
  );
}
