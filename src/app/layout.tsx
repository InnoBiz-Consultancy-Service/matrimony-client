import { AuthProvider } from "./(auth)/context/auth-context";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import CheckProfileProgress from "@/components/features/public/Home/check-profile-progress/CheckProfileProgress";
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
            {/* <CheckProfileProgress /> */}
            {children}
            <Toaster />
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
