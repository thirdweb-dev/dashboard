import {
  useDelegateMutation,
  useTokensDelegated,
  useVoteModule,
  useVoteModuleMetadata,
  useVoteProposalList,
  useVoteTokenBalances,
} from "@3rdweb-sdk/react/hooks/useVote";
import { useWeb3 } from "@3rdweb/hooks";
import {
  Spinner,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { Card } from "components/layout/Card";
import {
  DelegateButton,
  ProposalButton,
} from "components/module-pages/action-buttons/VoteButtons";
import { ModuleLayout } from "components/module-pages/module-layout";
import { Proposal } from "components/module-pages/vote/Proposal";
import { ModulePageNotice } from "components/notices/ModulePageNotice";
import { useTrack } from "hooks/analytics/useTrack";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { ConsolePage } from "pages/_app";
import React, { useMemo } from "react";

const VotePage: ConsolePage = () => {
  const { address } = useWeb3();
  const voteAddress = useSingleQueryParam("vote");
  const module = useVoteModule(voteAddress);
  const metadata = useVoteModuleMetadata(voteAddress);
  const data = useVoteProposalList(voteAddress);
  const { data: delegated, isLoading: isDelegatedLoading } = useTokensDelegated(
    module?.address,
  );

  const balanceAddresses: string[] = useMemo(() => {
    return [address, voteAddress].filter((a) => !!a) as string[];
  }, [address, voteAddress]);

  const { data: balances, isLoading } = useVoteTokenBalances(
    voteAddress,
    balanceAddresses,
  );
  const { mutate: delegate } = useDelegateMutation(module?.address);

  const { Track } = useTrack({
    page: "token",
    token: voteAddress,
  });

  const proposals = useMemo(() => {
    if (!data.data || data.data.length < 1) {
      return [];
    }

    /**
     * Hello Jonas or Nacho,
     * I've been waiting for you.
     *
     * I know you see this .map being used instead of a .reverse, idk why reverse wasn't working but
     * it wasn't.
     *
     * I did this on the return line and it didn't work (line 69):
     * return allProposals.reverse()
     */

    const allProposals = data.data;
    return allProposals.map(
      (p, index) => allProposals[allProposals.length - 1 - index],
    );
  }, [data]);

  return (
    <Track>
      <ModuleLayout
        module={module}
        metadata={metadata}
        data={data}
        primaryAction={delegated ? ProposalButton : DelegateButton}
      >
        <Stack spacing={4}>
          {!isDelegatedLoading && !delegated && (
            <ModulePageNotice
              color="orange"
              action="Delegate Tokens"
              message={`
                You need to delegate voting tokens to this module in order to create your own proposals or vote on others proposals. 
              `}
              onClick={() => delegate()}
            />
          )}
          <Card>
            <Text size="label.lg" mb="8px">
              Voting Token Balances
            </Text>
            {isLoading ? (
              <Stack align="center">
                <Spinner mb="12px" />
              </Stack>
            ) : (
              <Stack direction="row">
                {balances?.map((balance) => (
                  <Card as={Stat} key={balance.address} maxWidth="240px">
                    <StatLabel>
                      {balance.address?.toLowerCase() === address?.toLowerCase()
                        ? "Your Balance"
                        : "Module Balance"}
                    </StatLabel>
                    <StatNumber>{balance.balance}</StatNumber>
                  </Card>
                ))}
              </Stack>
            )}
          </Card>
          {proposals.map((proposal) => (
            <Proposal key={proposal.proposalId} proposal={proposal} />
          ))}
        </Stack>
      </ModuleLayout>
    </Track>
  );
};

VotePage.Layout = AppLayout;

export default VotePage;
