import { Flex } from "@chakra-ui/react";

export const Layout: React.FC = ({ children }) => {
  return (
    <Flex
      direction="column"
      mt="24px"
      alignSelf="center"
      border="1px solid #E5E5EA"
      padding={{ base: "20px", md: "64px" }}
      width="min(720px, 90vw)"
      borderRadius="20px"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.05)"
    >
      {children}
    </Flex>
  );
};
