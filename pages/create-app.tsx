import {
  Button,
  Container,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { File } from "@web-std/file";
import { Card } from "components/layout/Card";
import { DeployingModal, DeployMode } from "components/web3/DeployingModal";
import { useAppContext } from "context/sdk/modules/app-context";
import { useImageFileOrUrl } from "hooks/useImageFileOrUrl";
import { useUpload, wrapIPFS } from "hooks/useUpload";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosRocket } from "react-icons/io";
import {
  ProtocolContractInput,
  ProtocolContractSchema,
} from "schema/contracts";

const CreateApp: NextPage = () => {
  const { isDeploying, deploy } = useAppContext((c) => ({
    isDeploying: c.isDeploying,
    deploy: c.deploy,
  }));
  const router = useRouter();

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ProtocolContractSchema),
  });

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const imageUrl = useImageFileOrUrl(watch("image"));
  const upload = useUpload();

  const onSubmit = useCallback(
    async (data: ProtocolContractInput) => {
      try {
        const uploadData = { ...data };
        const keys = Object.keys(uploadData);

        setIsUploading(true);
        for (const key of keys) {
          const item = (uploadData as Record<string, unknown>)[key];
          if (item instanceof File) {
            const ipfsMedia = await upload(item);

            (uploadData as Record<string, unknown>)[key] = wrapIPFS(
              ipfsMedia.IpfsHash,
            );
          }
        }

        const metadataURI = wrapIPFS(
          (await upload(JSON.stringify(uploadData))).IpfsHash,
        );

        setIsUploading(false);
        const receipt = await deploy(metadataURI);

        const event = receipt?.events?.find(
          (e: any) => e.event === "DeployedProtocol",
        );

        // TODO clean this shit up
        const address = event?.args?.protocolControl;
        if (address) {
          // push to the new app dashboard
          // hard refresh b/c data needs to refresh
          window.location.href = `/dashboard/${address}`;
        } else {
          // if we for some reason do not have an address just go back to the main dashboard?
          window.location.href = `/dashboard`;
        }
        // close after successful deploy
      } catch (err) {
        console.error("failed to submit", err);
        setError(err as Error);
      } finally {
        setIsUploading(false);
      }
    },
    [deploy, upload],
  );

  return (
    <>
      <DeployingModal
        isUploading={isUploading}
        isDeploying={isDeploying}
        error={error}
        clearError={() => setError(null)}
        deployMode={DeployMode.APP}
      />
      <Container py={8}>
        <Stack spacing={8}>
          <Heading>Create new app</Heading>
          <Text size="sm">
            An app is a smart contract that gets deployed into your wallet. This
            is where you setup access controls and deploy modules into.
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

                <Button
                  isLoading={isDeploying}
                  type="submit"
                  colorScheme="teal"
                  rightIcon={<Icon as={IoIosRocket} />}
                >
                  Create
                </Button>
              </Stack>
            </form>
          </Card>
        </Stack>
      </Container>
    </>
  );
};

export default CreateApp;
