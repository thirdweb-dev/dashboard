import { Card } from "tw-components";

interface CodeOverviewProps {
  contractAddress?: string;
}

export const CodeOverview: React.FC<CodeOverviewProps> = ({
  contractAddress,
}) => {
  return (
    <Card p={0} overflow="hidden">
      Test
    </Card>
  );
};
