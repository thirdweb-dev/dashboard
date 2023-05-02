import { Button } from "tw-components";

interface HighlightedButtonProps {
  title: string;
  onClick: () => void;
}

export const HighlightedButton: React.FC<HighlightedButtonProps> = ({
  title,
}) => {
  return (
    <Button
      variant="outline"
      colorScheme="purple"
      size="lg"
      fontWeight={700}
      borderRadius={100}
      px={8}
      py={6}
      _hover={{
        bg: "purple.500",
        color: "white",
      }}
    >
      {title}
    </Button>
  );
};
