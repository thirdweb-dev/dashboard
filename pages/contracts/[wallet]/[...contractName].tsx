import { AppLayout } from "components/app-layouts/app";
import { ReactElement } from "react";

export function ContractNamePage() {
  return "contract name page";
}

ContractNamePage.getLayout = (page: ReactElement) => (
  <AppLayout>{page}</AppLayout>
);
