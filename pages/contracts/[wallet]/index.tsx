import { AppLayout } from "components/app-layouts/app";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";

export default function UserPage() {
  const wallet = useSingleQueryParam("wallet");
  const router = useRouter()

  // We do this so it doesn't break for users that haven't updated their CLI
  useEffect(() => {
    const previousPath = router.asPath.split("/")[2]
    if(!wallet?.startsWith("0x") && previousPath !== "[wallet]") {
      router.replace(`/contracts/deploy/${previousPath}`)
    }

  }, [wallet]);

  return null;
}

UserPage.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;
