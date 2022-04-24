import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalHeaderProps,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ComponentWithChildren } from "types/component-with-children";

interface ThirdwebDrawerProps extends Omit<DrawerProps, "placement"> {
  header?: ModalHeaderProps;
  drawerBodyProps?: ModalBodyProps;
  footer?: ModalFooterProps;
}

export const ThirdwebDrawer: ComponentWithChildren<ThirdwebDrawerProps> = ({
  children,
  header,
  drawerBodyProps,
  footer,
  ...restDrawerProps
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Drawer {...restDrawerProps} placement={isMobile ? "bottom" : "right"}>
      <DrawerOverlay zIndex="modal" />
      <DrawerContent
        overflow="hidden"
        borderTopRadius={{ base: "lg", md: "none" }}
      >
        <DrawerCloseButton />
        {header && (
          <>
            <DrawerHeader {...header} />
            <Divider borderColor="borderColor" />
          </>
        )}
        <DrawerBody {...drawerBodyProps} py={4}>
          {children}
        </DrawerBody>
        {footer && (
          <>
            <Divider borderColor="borderColor" />
            <DrawerFooter {...footer} />
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
