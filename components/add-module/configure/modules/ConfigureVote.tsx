import { useModuleMetadataList } from "@3rdweb-sdk/react";
import { ModuleType } from "@3rdweb/sdk";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
  Stack,
} from "@chakra-ui/react";
import { ModulePageNotice } from "components/notices/ModulePageNotice";
import useAddModuleContext from "contexts/AddModuleContext";
import { useSingleQueryParam } from "hooks/useQueryParam";

export const ConfigureVote: React.FC = () => {
  const { register, watch, setValue, errors } = useAddModuleContext();

  return (
    <Stack spacing={4}>
      <Currencies />

      <Stack direction="row" spacing={2}>
        <FormControl
          isRequired
          isInvalid={!!errors.proposalStartWaitTimeInSeconds}
        >
          <FormLabel>Proposal Start Wait Time (Seconds)</FormLabel>
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
          <FormHelperText>
            The time that must pass after a proposal is created before token
            holders can start voting (in seconds).
          </FormHelperText>
          <FormErrorMessage>
            {errors.proposalStartWaitTimeInSeconds?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
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
          <FormHelperText>
            The amount of time that token holders have to vote on a proposal
            once the proposal voting period starts.
          </FormHelperText>
          <FormErrorMessage>
            {errors.proposalVotingTimeInSeconds?.message}
          </FormErrorMessage>
        </FormControl>
      </Stack>

      <FormControl
        isRequired
        isInvalid={!!errors.minimumNumberOfTokensNeededToPropose}
      >
        <FormLabel>Minimum Tokens To Propose</FormLabel>
        <Input
          type="number"
          {...register("minimumNumberOfTokensNeededToPropose")}
        />
        <FormHelperText>
          The minimum number of tokens someone needs to make a proposal for
          others to vote on.
        </FormHelperText>
        <FormErrorMessage>
          {errors.minimumNumberOfTokensNeededToPropose?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.votingQuorumFraction}>
        <FormLabel>Voting Quorum Fraction</FormLabel>
        <InputGroup width="240px">
          <Input
            type="number"
            step="0.01"
            value={watch("votingQuorumFraction")}
            onChange={(e) =>
              setValue(
                "votingQuorumFraction",
                parseFloat(e.target.value || "0"),
              )
            }
            onFocus={(e) => e.target.select()}
          />
          <InputRightAddon children="%" />
        </InputGroup>
        <FormHelperText>
          The minimum percentage of token holders that must vote on a proposal
          for the proposal to pass 0 = 0% and 100 = 100%. Note that this is not
          the same as the percentage of &quot;for&quot; votes necessary for a
          proposal to pass.
        </FormHelperText>
        <FormErrorMessage>
          {errors.votingQuorumFraction?.message}
        </FormErrorMessage>
      </FormControl>
    </Stack>
  );
};

const Currencies: React.FC = () => {
  const network = useSingleQueryParam("network");
  const { watch, setValue, errors } = useAddModuleContext();
  const appAddress = useSingleQueryParam("app");
  const { data: currencies, isLoading: currencyLoading } =
    useModuleMetadataList(appAddress, [ModuleType.CURRENCY]);

  return (
    <>
      {!currencyLoading && !currencies?.length && (
        <ModulePageNotice
          color="orange"
          action="Add Token Module"
          message={`
            You need to add a token module before you can add a vote module as you need to use a token to enable casting votes in the vote module.
          `}
          onClick={() => window.open(`/${network}/${appAddress}/new`, "_blank")}
        />
      )}

      <FormControl isRequired isInvalid={!!errors.votingTokenAddress}>
        <FormLabel>Voting Token</FormLabel>
        <Select
          placeholder="Select Token"
          value={watch("votingTokenAddress")}
          onChange={(e) => setValue("votingTokenAddress", e.target.value)}
        >
          {currencies?.map((token) => (
            <option key={token.address} value={token.address}>
              {token.metadata?.name}
            </option>
          ))}
        </Select>
        <FormHelperText>
          The token that holders will use to vote on proposals.
        </FormHelperText>
        <FormErrorMessage>
          {errors.votingTokenAddress?.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};
