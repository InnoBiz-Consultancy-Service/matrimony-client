import { Toaster } from "sonner";
import { AuthProvider } from "./(auth)/context/auth-context";
import "./globals.css";
import { ThemeProvider } from "next-themes";
export const metadata = {
  title: "Nikah",
  description:
    "Nikah is a platform that connects individuals seeking marriage, providing a space for them to find potential partners and build meaningful relationships.",
  icons: {
    icon: "https://i.ibb.co/BHMGGW7z/ontonim.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <main>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
            <Toaster />
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
