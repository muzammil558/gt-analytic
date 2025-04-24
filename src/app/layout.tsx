// import type { Metadata } from "next";
// import { ThemeProvider } from "@mui/material/styles";
// import { Inter } from "next/font/google";

// import { darkTheme } from "@/theme/darkTheme";

// import "./globals.scss";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "GT Analytics",
//   description: "GT Analytics for Admin",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import { Poppins } from "next/font/google";

import classNames from "classnames";

import Footer from "@/components/Footer";
import { darkTheme } from "@/theme/darkTheme";

import "./globals.scss";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["800", "600", "500", "400"],
});

export const metadata: Metadata = {
  title: "GT Analytics",
  description: "GT Analytics for Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={classNames(poppins.className, "playerStatsBody")}>
        <ThemeProvider theme={darkTheme}>
          {children}
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
