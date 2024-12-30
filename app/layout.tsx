import type { Metadata } from "next";
import NavBar from "@/app/NavBar";
import "@radix-ui/themes/styles.css";
import './theme-config.css';
import "./globals.css";
import {Container, Theme} from "@radix-ui/themes";
import {Inter} from "next/font/google";
import AuthProvider from "@/app/auth/Provider";
import QueryClientProvider from "@/app/QueryClientProvider";

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter'
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
      <QueryClientProvider>
          <AuthProvider>
              <Theme appearance="light" accentColor="violet">
                  <NavBar />
                  <main className={"p-5"}>
                      <Container>
                          {children}
                      </Container>
                  </main>
              </Theme>
          </AuthProvider>
      </QueryClientProvider>
      </body>
    </html>
  );
}
