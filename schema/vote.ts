import * as z from "zod";
import { MakeInputOutput } from "./shared";

export const VoteSettingsSchema = z.object({
  minimumNumberOfTokensNeededToPropose: z.string(),
  proposalStartWaitTimeInSeconds: z.number(),
  proposalVotingTimeInSeconds: z.number(),
  votingQuorumFraction: z.number(),
  votingTokenAddress: z.string(),
  votingDelay: z.number().optional(),
  votingPeriod: z.number().optional(),
});

export type VoteSettingsInput = z.infer<typeof VoteSettingsSchema>;
export type VoteSettingsOutput = MakeInputOutput<VoteSettingsInput>;
