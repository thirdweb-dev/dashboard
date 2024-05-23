import { ThirdwebProvider } from "thirdweb/react";
import { DashboardHeader } from "../components/DashboardHeader";
import { DashboardFooter } from "../components/DashboardFooter";

export default function DashboardLayout(props: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider>
      <div className="flex flex-col h-full">
        <DashboardHeader />
        <main className="grow">{props.children}</main>
        <DashboardFooter />
      </div>
    </ThirdwebProvider>
  );
}
