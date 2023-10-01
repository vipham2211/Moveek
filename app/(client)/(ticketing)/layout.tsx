import TicketingSteps from "@/app/(client)/(ticketing)/_components/TicketingSteps";
import { Fragment } from "react";
import BookingInfo from "@/app/(client)/(ticketing)/_components/BookingInfo";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <section className="flex flex-col space-y-3 items-center justify-center">
        <TicketingSteps />

        <div className="max-w-6xl w-full mx-auto flex flex-col lg:flex-row">
          {children}

          <BookingInfo />
        </div>
      </section>
    </Fragment>
  );    
}
