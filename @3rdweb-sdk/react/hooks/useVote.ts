import { useWeb3 } from "@3rdweb/hooks";
import { VoteType } from "@3rdweb/sdk";
import { useMemo } from "react";
import { ProposalTokenInput } from "schema/tokens";
import { VoteSettingsInput } from "schema/vote";
import invariant from "ts-invariant";
import { voteKeys } from "../cache-keys";
import {
  useMutationWithInvalidate,
  useQueryWithNetwork,
} from "./query/useQueryWithNetwork";
import { useModuleMetadata } from "./useModule";
import { useSDK } from "./useSDK";
import { useTokenModule } from "./useToken";

export function useVoteModule(moduleAddress?: string) {
  const sdk = useSDK();
  return useMemo(() => {
    if (!sdk || !moduleAddress) {
      return undefined;
    }
    return sdk.getVoteModule(moduleAddress);
  }, [sdk, moduleAddress]);
}

export function useVoteModuleMetadata(moduleAddress?: string) {
  return useModuleMetadata(useVoteModule(moduleAddress));
}

export function useVoteProposalList(moduleAddress?: string) {
  const voteModule = useVoteModule(moduleAddress);
  return useQueryWithNetwork(
    voteKeys.proposals(moduleAddress),
    () => voteModule?.getAll(),
    {
      enabled: !!voteModule && !!moduleAddress,
    },
  );
}

export function useHasVotedOnProposal(
  proposalId: string,
  moduleAddress?: string,
) {
  const { address } = useWeb3();
  const voteModule = useVoteModule(moduleAddress);
  return useQueryWithNetwork(
    voteKeys.userHasVotedOnProposal(proposalId, moduleAddress, address),
    () => voteModule?.hasVoted(proposalId, address),
    {
      enabled: !!voteModule && !!moduleAddress,
    },
  );
}

export function useCanExecuteProposal(
  proposalId: string,
  moduleAddress?: string,
) {
  const voteModule = useVoteModule(moduleAddress);
  return useQueryWithNetwork(
    voteKeys.canExecuteProposal(proposalId, moduleAddress),
    () => voteModule?.canExecute(proposalId),
    {
      enabled: !!voteModule && !!moduleAddress,
    },
  );
}

export function useTokensDelegated(moduleAddress?: string) {
  const sdk = useSDK();
  const { address } = useWeb3();
  const voteModule = useVoteModule(moduleAddress);
  return useQueryWithNetwork(
    voteKeys.delegation(moduleAddress, address),
    async () => {
      invariant(address, "address is required");
      invariant(voteModule, "vote module is required");

      const metadata = await voteModule?.getMetadata();
      const tokenAddress = metadata?.metadata?.voting_token_address;
      const tokenModule = sdk?.getTokenModule(tokenAddress);
      const delegation = await tokenModule?.getDelegationOf(address);
      return delegation?.toLowerCase() === address.toLowerCase();
    },
    {
      enabled: !!voteModule && !!address,
    },
  );
}

export function useVoteTokenBalances(
  moduleAddress?: string,
  addresses?: string[],
) {
  const { data } = useVoteModuleMetadata(moduleAddress);
  const tokenModule = useTokenModule(data?.metadata?.voting_token_address);

  return useQueryWithNetwork(
    voteKeys.balances(moduleAddress, addresses),
    async () => {
      invariant(data, "module metadata is required");
      invariant(tokenModule, "voting module is required");
      invariant(addresses, "addresses are required");

      const balances = addresses.map(async (address) => {
        return {
          address,
          balance: (await tokenModule.balanceOf(address)).displayValue,
        };
      });

      return await Promise.all(balances);
    },
    {
      enabled: !!data && !!moduleAddress && !!addresses?.length,
    },
  );
}

export function useProposalCreateMutation(moduleAddress?: string) {
  const voteModule = useVoteModule(moduleAddress);
  return useMutationWithInvalidate(
    (proposal: ProposalTokenInput) => {
      invariant(voteModule, "module is required");
      const { description } = proposal;
      return voteModule.propose(description);
    },
    {
      onSuccess: (_data, _options, _variables, invalidate) => {
        return invalidate([voteKeys.proposals(moduleAddress)]);
      },
    },
  );
}

export function useDelegateMutation(moduleAddress?: string) {
  const sdk = useSDK();
  const { address } = useWeb3();
  const voteModule = useVoteModule(moduleAddress);
  return useMutationWithInvalidate(
    async () => {
      invariant(address, "address is required");
      invariant(moduleAddress, "module address is required");
      invariant(voteModule, "vote module is required");

      const metadata = await voteModule?.getMetadata();
      const tokenAddress = metadata?.metadata?.voting_token_address;
      const tokenModule = sdk?.getTokenModule(tokenAddress);
      return tokenModule?.delegateTo(address);
    },
    {
      onSuccess: (_data, _options, _variables, invalidate) => {
        return invalidate([voteKeys.delegation(moduleAddress, address)]);
      },
    },
  );
}

interface IVoteCast {
  voteType: VoteType;
  reason?: string;
}

export function useCastVoteMutation(
  proposalId: string,
  moduleAddress?: string,
) {
  const { address } = useWeb3();
  const voteModule = useVoteModule(moduleAddress);
  return useMutationWithInvalidate(
    async (vote: IVoteCast) => {
      invariant(voteModule, "module is required");
      invariant(address, "address is required");
      const { voteType, reason } = vote;
      return voteModule.vote(proposalId, voteType, reason);
    },
    {
      onSuccess: (_data, _options, _variables, invalidate) => {
        return invalidate([
          voteKeys.proposals(moduleAddress),
          voteKeys.userHasVotedOnProposal(proposalId, moduleAddress, address),
          voteKeys.canExecuteProposal(proposalId, moduleAddress),
        ]);
      },
    },
  );
}

export function useExecuteProposalMutation(
  proposalId: string,
  moduleAddress?: string,
) {
  const voteModule = useVoteModule(moduleAddress);
  return useMutationWithInvalidate(
    async () => {
      invariant(voteModule, "module is required");
      return voteModule.execute(proposalId);
    },
    {
      onSuccess: (_data, _options, _variables, invalidate) => {
        return invalidate([
          voteKeys.proposals(moduleAddress),
          voteKeys.canExecuteProposal(proposalId, moduleAddress),
        ]);
      },
    },
  );
}

export function useVoteSettingsMutation(moduleAddress?: string) {
  const voteModule = useVoteModule(moduleAddress);
  const { data: moduleData } = useVoteModuleMetadata(moduleAddress);

  return useMutationWithInvalidate(
    (data: VoteSettingsInput) => {
      invariant(voteModule, "module is required");
      invariant(moduleData?.metadata, "module metadata is required");

      const { metadata } = moduleData;
      const settings = { ...metadata, ...data };
      return voteModule.setModuleMetadata(settings);
    },
    {
      onSuccess: (_data, _options, _variables, invalidate) => {
        return invalidate([voteKeys.proposals(moduleAddress)]);
      },
    },
  );
}
