import { useRouter } from "next/router";
import { useEffect } from "react";

export default function UserPage() {
  const router = useRouter();
  // redirect all /publish to /release
  // We do this so it doesn't break for users that haven't updated their CLI
  useEffect(() => {
    const newPath = router.asPath.replace("/publish", "/release");
    router.replace(newPath);
  }, [router]);

  return null;
}
