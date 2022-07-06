import { AppLayout } from "components/app-layouts/app";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { ReactElement } from "react";

export default function UserPage() {
  const wallet = useSingleQueryParam("wallet");
  console.log(wallet);
  return "hi";
}

UserPage.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;
