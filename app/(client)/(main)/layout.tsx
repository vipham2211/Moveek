import { fetchCinemaSystems } from "@/app/lib/actions/cinemasAction";
import Footer from "@/components/shared/Footer";
import { Fragment } from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const listCinemaSystems= await fetchCinemaSystems();
  return (
    <Fragment>
      <div className="flex-1">{children}</div>

      <Footer listCinemaSystems={listCinemaSystems} />
    </Fragment>
  );
}
