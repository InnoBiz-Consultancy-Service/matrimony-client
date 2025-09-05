// import { Toaster } from "sonner";
// import { AuthProvider } from "./(auth)/context/auth-context";
// import "./globals.css";
// import { Noto_Serif_Bengali } from "next/font/google";
// import { ThemeProvider } from "next-themes";
// export const metadata = {
//   title: "Nikah",
//   description:
//     "Nikah is a platform that connects individuals seeking marriage, providing a space for them to find potential partners and build meaningful relationships.",
//   icons: {
//     icon: "https://i.ibb.co/BHMGGW7z/ontonim.png",
//   },
// };

// const notoBengali = Noto_Serif_Bengali({
//   subsets: ["bengali"],
//   weight: ["400", "500", "700"],
// });

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html >
//       <body className={notoBengali.className}>
//         <main>
//           <AuthProvider>
//             <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//               {children}
//             </ThemeProvider>
//             <Toaster />
//           </AuthProvider>
//         </main>
//       </body>
//     </html>
//   );
// }

import { Toaster } from "sonner";
import { AuthProvider } from "./(auth)/context/auth-context";
import "./globals.css";
import { Noto_Serif_Bengali } from "next/font/google";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "Nikah",
  description:
    "Nikah is a platform that connects individuals seeking marriage, providing a space for them to find potential partners and build meaningful relationships.",
  icons: {
    icon: "https://i.ibb.co/BHMGGW7z/ontonim.png",
  },
};

const notoBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className={notoBengali.className}>
        <main>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
            <Toaster
              position="top-right"
              richColors
              closeButton
              toastOptions={{
                style: {
                  borderRadius: "12px",
                  fontSize: "14px",
                  padding: "12px 16px",
                },
                classNames: {
                  toast: "shadow-lg", // সব টোস্টে shadow থাকবে
                },
              }}
            />
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
