import Navbar from "@/components/shared/Navbar";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="flex-1 flex flex-col">{children}</section>

    </div>
  );
}
