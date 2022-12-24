import {
  askInstallation,
  getInstallPrompt,
  saveInstallPrompt,
} from "./saveDeferredPrompt";
import { useEffect, useState } from "react";
import { BsDownload } from "react-icons/bs";
import { Button } from "tw-components";

export function PWAInstallButton() {
  const [show, setShow] = useState(() => getInstallPrompt() !== undefined);

  useEffect(() => {
    if (!show) {
      saveInstallPrompt(() => {
        setShow(true);
      });
    }
  }, [show]);

  async function handleClick() {
    setShow(false);
    askInstallation();
  }

  return (
    <Button
      variant="link"
      onClick={handleClick}
      display={{ base: "none", md: show ? "flex" : "none" }}
      leftIcon={<BsDownload />}
    >
      Install
    </Button>
  );
}
