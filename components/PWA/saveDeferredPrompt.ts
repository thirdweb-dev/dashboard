import { BeforeInstallPromptEvent } from "./types";

let installPrompt: BeforeInstallPromptEvent | undefined;

type OnCaptureCallback = (event: BeforeInstallPromptEvent) => void;

export function saveInstallPrompt(onCapture?: OnCaptureCallback) {
  // noop on server
  if (typeof window === "undefined") {
    return;
  }

  function handleInstallPrompt(event: Event) {
    // Prevent the mini-info bar from appearing on mobile
    event.preventDefault();
    // Stash the event so it can be triggered later.
    installPrompt = event as BeforeInstallPromptEvent;
    if (onCapture) {
      onCapture(installPrompt);
    }

    // Optionally, send analytics event that PWA install promo was shown.
  }

  window.addEventListener("beforeinstallprompt", handleInstallPrompt);
}

export function getInstallPrompt() {
  return installPrompt;
}

export function askInstallation() {
  if (!installPrompt) {
    return;
  }

  installPrompt.prompt();
  // Optionally, send analytics event with outcome of user choice
  // Wait for the user to respond to the prompt
  // const { outcome } = await deferredPrompt.userChoice;

  // We've used the prompt, and can't use it again, throw it away
  installPrompt = undefined;
}
