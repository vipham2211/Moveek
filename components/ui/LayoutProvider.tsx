"use client";
import { usePathname } from "next/navigation";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
interface LayoutProviderProps {
  children: React.ReactNode;
}

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const pathname = usePathname();
  if (pathname === "/dashboard" || pathname === "/login")
    return <> {children}</>;
  if (
    pathname.includes("/chon-ghe/") ||
    pathname.includes("/chon-combo/") ||
    pathname.includes("/thanh-toan/")||
    pathname.includes("/thong-tin-ve/")
  )
    return (
      <>
        <Navbar />
        <main>{children}</main>
      </>
    );
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  );
};
