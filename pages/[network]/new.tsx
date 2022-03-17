import { useDeployApp } from "@3rdweb-sdk/react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { Card } from "components/layout/Card";
import { MismatchButton } from "components/shared/MismatchButton";
import { DeployingModal, DeployMode } from "components/web3/DeployingModal";
import { useTrack } from "hooks/analytics/useTrack";
import { useNetworkUrl } from "hooks/useHref";
import { useRouter } from "next/router";
import { ConsolePage } from "pages/_app";
import React from "react";
import { useForm } from "react-hook-form";
import { IoIosRocket } from "react-icons/io";
import { ProtocolContractSchema } from "schema/contracts";
import { zodResolver } from "schema/zodResolver";

const CreateApp: ConsolePage = () => {
  const { Track } = useTrack({ page: "new_app" });
  const { push } = useRouter();
  const { isLoading, mutateAsync, error, reset } = useDeployApp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ProtocolContractSchema),
  });

  const network = useNetworkUrl();

  const onSubmit = async (values: any) => {
    const newAddress = await mutateAsync(values);
    if (newAddress) {
      push(`${network}/${newAddress}`);
    }
  };

  return (
    <Track>
      <DeployingModal
        isUploading={false}
        isDeploying={isLoading}
        error={error as Error | undefined | null}
        clearError={() => reset()}
        deployMode={DeployMode.APP}
      />

      <Stack spacing={8}>
        <Heading>Create new project</Heading>
        <Text size="sm">
          A project is a smart contract that gets deployed with your wallet.
          This project has a multi-sig wallet, permission control and ability to
          contain other contracts. Think of this as the top level container for
          your entire project.
        </Text>
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={6}>
              <FormControl isRequired isInvalid={!!errors.name}>
                <FormLabel>Name</FormLabel>
                <Input {...register("name")} />
                <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.description}>
                <FormLabel>Description</FormLabel>
                <Textarea {...register("description")} />
                <FormErrorMessage>
                  {errors?.description?.message}
                </FormErrorMessage>
              </FormControl>

              <MismatchButton
                isLoading={isLoading}
                type="submit"
                colorScheme="primary"
                rightIcon={<Icon as={IoIosRocket} />}
              >
                Create
              </MismatchButton>
            </Stack>
          </form>
        </Card>
      </Stack>
    </Track>
  );
};

CreateApp.Layout = AppLayout;

export default CreateApp;
