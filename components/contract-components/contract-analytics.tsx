import { useContractAnalytics } from "@3rdweb-sdk/react";
import { Skeleton, Stack, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { ValidContractClass } from "@thirdweb-dev/sdk";
import { PropsWithChildren } from "react";
import { C } from "ts-toolbelt";
import { Card } from "tw-components";

interface IContractAnalytics<TContract extends ValidContractClass> {
  contract?: C.Instance<TContract>;
}

export const ContractAnalytics = <TContract extends ValidContractClass>({
  contract,
}: PropsWithChildren<IContractAnalytics<TContract>>) => {
  const { data, isLoading } = useContractAnalytics(contract);

  if (!isLoading && data?.length === 0) {
    return null;
  }

  return (
    <Skeleton isLoaded={!isLoading} height="100px">
      <Stack direction="row" spacing={4} mt="8px">
        {data?.map((event, index) => (
          <Card key={index} flexGrow={1} width="200px">
            <Stat>
              <StatLabel>{event.name}</StatLabel>
              <StatNumber>{event.value}</StatNumber>
            </Stat>
          </Card>
        ))}
      </Stack>
    </Skeleton>
  );
};
