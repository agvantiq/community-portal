import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { RoleProvider } from "@/components/shell/role-provider";
import { SavedItemsProvider } from "@/lib/saved-items";
import { RegisteredCoursesProvider } from "@/lib/registered-courses";
import { AppShell } from "@/components/shell/app-shell";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vantiq Community Portal",
  description:
    "Training hub, developer resources, sales enablement, documentation, and community Q&A for the Vantiq ecosystem.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <RoleProvider>
            <SavedItemsProvider>
              <RegisteredCoursesProvider>
                <AppShell>{children}</AppShell>
                <Toaster />
              </RegisteredCoursesProvider>
            </SavedItemsProvider>
          </RoleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
