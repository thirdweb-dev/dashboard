import { useReleasedContractInfo } from "../hooks";
import { PublishedContract } from "@thirdweb-dev/sdk";
import { Card } from "tw-components";

interface ReleasedContractProps {
  release: PublishedContract;
}

export const ReleasedContract: React.FC<ReleasedContractProps> = ({
  release,
}) => {
  const releasedContractInfo = useReleasedContractInfo(release);
  console.log({ releasedContractInfo });

  return <Card>hi</Card>;
};
