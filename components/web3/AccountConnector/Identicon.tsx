import Icon, { IconProps } from "@chakra-ui/icon";
import { Box } from "@chakra-ui/layout";
import jazzicon from "@metamask/jazzicon";
import { useEthers } from "@usedapp/core";
import React, { useEffect, useRef } from "react";

export const Identicon: React.FC<IconProps> = ({ ...iconProps }) => {
  const ref = useRef<HTMLDivElement>();
  const { account } = useEthers();

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = "";
      ref.current.appendChild(
        jazzicon(ref.current.scrollHeight, parseInt(account.slice(2, 10), 16)),
      );
    }
  }, [account]);

  return <Icon mt="-1px" {...iconProps} as={Box} ref={ref as any} />;
};
