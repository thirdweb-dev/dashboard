import { AppLayout } from "components/app-layouts/app";
import { ReactElement } from "react";

export function ContractNamePage() {
  return null;
}

ContractNamePage.getLayout = (page: ReactElement) => (
  <AppLayout>{page}</AppLayout>
);
