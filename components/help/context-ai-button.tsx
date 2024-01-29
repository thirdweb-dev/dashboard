import { Input } from "@chakra-ui/react";
import Script from "next/script";
import posthog from "posthog-js";

const contextBotId = "SV3HwtSN0";

export function ContextAIBotButton() {
  const handleClick = () => {
    posthog.capture("ai-bot.click");
  };

  return (
    <>
      <ContextAIBotScript />
      <div context-launcher="true" context-bot-id={contextBotId}>
        <Input
          bgColor="backgroundBody"
          _hover={{
            bgColor: "backgroundBody",
          }}
          onClick={handleClick}
        />
      </div>
    </>
  );
}

export function ContextAIBotScript() {
  return (
    <Script
      // defer
      id="__CONTEXT_BUBBLE__"
      src="https://portal.usecontext.io/portal/portal.js"
      data-theme="dark"
      data-type="attribute"
    ></Script>
  );
}
