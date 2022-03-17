import { AppLayout } from "components/app-layouts/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { ConsolePage } from "../_app";

const DashboardPage: ConsolePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return null;
};

export default DashboardPage;

DashboardPage.Layout = AppLayout;
