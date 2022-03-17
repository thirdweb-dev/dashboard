import {
  useVoteModuleMetadata,
  useVoteSettingsMutation,
} from "@3rdweb-sdk/react/hooks/useVote";
import { VoteModule } from "@3rdweb/sdk";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Card } from "components/layout/Card";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { VoteSettingsInput, VoteSettingsSchema } from "schema/vote";
import { zodResolver } from "schema/zodResolver";
import { parseErrorToMessage } from "utils/errorParser";

interface IVoteConfiguration {
  module?: VoteModule;
}

export const VoteConfiguration: React.FC<IVoteConfiguration> = ({ module }) => {
  const toast = useToast();
  const { data, isLoading } = useVoteModuleMetadata(module?.address);
  const { mutate: update } = useVoteSettingsMutation(module?.address);
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<VoteSettingsInput>({
    resolver: zodResolver(VoteSettingsSchema),
  });

  useEffect(() => {
    if (data?.metadata && !isLoading) {
      const { metadata } = data;

      setValue(
        "minimumNumberOfTokensNeededToPropose",
        metadata.proposal_token_threshold,
      );
      setValue(
        "proposalStartWaitTimeInSeconds",
        metadata.proposal_start_time_in_seconds,
      );
      setValue(
        "proposalVotingTimeInSeconds",
        metadata.proposal_voting_time_in_seconds,
      );
      setValue("votingQuorumFraction", metadata.voting_quorum_fraction);
      setValue("votingTokenAddress", metadata.voting_token_address);
    }
  }, [data, isLoading, setValue]);

  const isDisabled =
    isLoading ||
    (watch("minimumNumberOfTokensNeededToPropose") ===
      data?.metadata?.proposal_token_threshold &&
      watch("proposalStartWaitTimeInSeconds") ===
        data?.metadata?.proposal_start_time_in_seconds &&
      watch("proposalVotingTimeInSeconds") ===
        data?.metadata?.proposal_voting_time_in_seconds &&
      watch("votingQuorumFraction") ===
        data?.metadata?.voting_quorum_fraction &&
      watch("votingTokenAddress") === data?.metadata?.voting_token_address);

  const onSubmit = (metadata: VoteSettingsInput) => {
    if (isDisabled) {
      return;
    }

    update(metadata, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Vote settings updated successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: parseErrorToMessage(error),
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });
  };

  return (
    <Stack
      as="form"
      id="vote-settings-form"
      spacing={4}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card position="relative" pb="72px">
        <Stack spacing={4}>
          <Stack spacing={1} mb="12px">
            <Heading size="heading.sm">Vote Settings</Heading>
            <Text>
              These are the vote settings of your module. They can only be
              changed through a voting process.
            </Text>
          </Stack>
          <FormControl
            isRequired
            isDisabled
            isInvalid={!!errors.minimumNumberOfTokensNeededToPropose}
          >
            <FormLabel>Minimum Tokens To Propose</FormLabel>
            <Input
              type="number"
              {...register("minimumNumberOfTokensNeededToPropose")}
            />
            <FormErrorMessage>
              {errors.minimumNumberOfTokensNeededToPropose?.message}
            </FormErrorMessage>
          </FormControl>

          <Stack direction="row" spacing={2}>
            <FormControl
              isRequired
              isDisabled
              isInvalid={!!errors.proposalStartWaitTimeInSeconds}
            >
              <FormLabel>Proposal Start Wait Time</FormLabel>
              <Input
                type="number"
                value={watch("proposalStartWaitTimeInSeconds")}
                onChange={(e) =>
                  setValue(
                    "proposalStartWaitTimeInSeconds",
                    parseInt(e.target.value || "0"),
                  )
                }
                onFocus={(e) => e.target.select()}
              />
              <FormErrorMessage>
                {errors.proposalStartWaitTimeInSeconds?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isDisabled
              isInvalid={!!errors.proposalVotingTimeInSeconds}
            >
              <FormLabel>Proposal Voting Time</FormLabel>
              <Input
                type="number"
                value={watch("proposalVotingTimeInSeconds")}
                onChange={(e) =>
                  setValue(
                    "proposalVotingTimeInSeconds",
                    parseFloat(e.target.value || "0"),
                  )
                }
                onFocus={(e) => e.target.select()}
              />
              <FormErrorMessage>
                {errors.proposalVotingTimeInSeconds?.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={2}>
            <FormControl
              isRequired
              isDisabled
              isInvalid={!!errors.votingQuorumFraction}
            >
              <FormLabel>Voting Quorum Fraction</FormLabel>
              <Input
                type="number"
                value={watch("votingQuorumFraction")}
                onChange={(e) =>
                  setValue(
                    "votingQuorumFraction",
                    parseInt(e.target.value || "0"),
                  )
                }
                onFocus={(e) => e.target.select()}
              />
              <FormErrorMessage>
                {errors.votingQuorumFraction?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isDisabled
              isInvalid={!!errors.votingTokenAddress}
            >
              <FormLabel>Voting Token Address</FormLabel>
              <Input {...register("votingTokenAddress")} />
              <FormErrorMessage>
                {errors.votingTokenAddress?.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};
