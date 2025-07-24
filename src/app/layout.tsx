import { AuthProvider } from "./(auth)/context/auth-context";
import "./globals.css";
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
          <AuthProvider>{children}</AuthProvider>
        </main>
      </body>
    </html>
  );
}