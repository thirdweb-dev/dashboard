import { ModuleType } from "@3rdweb/sdk";
import {
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import useAddModuleContext from "contexts/AddModuleContext";
import React, { useMemo } from "react";
import { ConfigureImage } from "./ConfigureImage";
import { ConfigureBundle } from "./modules/ConfigureBundle";
import { ConfigureBundleDrop } from "./modules/ConfigureBundleDrop";
import { ConfigureDrop } from "./modules/ConfigureDrop";
import { ConfigureMarketplace } from "./modules/ConfigureMarketplace";
import { ConfigureNFT } from "./modules/ConfigureNFT";
import { ConfigurePack } from "./modules/ConfigurePack";
import { ConfigureSplits } from "./modules/ConfigureSplits";
import { ConfigureToken } from "./modules/ConfigureToken";
import { ConfigureVote } from "./modules/ConfigureVote";

export const ConfigureModule: React.FC = () => {
  const { selectedModule, register, errors, handleSubmit, onSubmit } =
    useAddModuleContext();

  const moduleConfiguration: Partial<Record<ModuleType, React.FC | null>> =
    useMemo(
      () => ({
        [ModuleType.NFT]: ConfigureNFT,
        [ModuleType.BUNDLE]: ConfigureBundle,
        [ModuleType.DROP]: ConfigureDrop,
        [ModuleType.BUNDLE_DROP]: ConfigureBundleDrop,
        [ModuleType.BUNDLE_SIGNATURE]: null,
        [ModuleType.MARKETPLACE]: ConfigureMarketplace,
        [ModuleType.CURRENCY]: ConfigureToken,
        [ModuleType.PACK]: ConfigurePack,
        [ModuleType.SPLITS]: ConfigureSplits,
        [ModuleType.VOTE]: ConfigureVote,
      }),
      [],
    );

  return (
    <form id="add-module-form" onSubmit={handleSubmit(onSubmit)}>
      <Heading size="title.sm">Customize</Heading>
      <Text mt="4px">
        These settings will help you to organize and distinguish between your
        different modules.
      </Text>

      <Flex mt="24px">
        <Stack flexShrink={1}>
          <ConfigureImage />
        </Stack>

        <Stack spacing={4} flexGrow={1} width="100%">
          <FormControl isRequired isInvalid={!!errors.name}>
            <FormLabel>Name</FormLabel>
            <Input {...register("name")} />
            <FormErrorMessage>
              {(errors?.name as any)?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.name}>
            <FormLabel>Description</FormLabel>
            <Textarea {...register("description")} />
            <FormErrorMessage>
              {(errors?.description as any)?.message}
            </FormErrorMessage>
          </FormControl>
        </Stack>
      </Flex>

      {(!!selectedModule || selectedModule === 0) &&
        moduleConfiguration[selectedModule] && (
          <>
            <Divider width="100%" marginY="32px" />

            {selectedModule === ModuleType.VOTE ? (
              <>
                <Heading size="title.sm">Vote Settings</Heading>
                <Text mt="4px" mb="24px">
                  In this section, you can configure the settings for your
                  voting module which will determine the nature of how proposals
                  are voted on and passed.
                  <br />
                  Keep in mind that once you deploy this module, you will only
                  be able to update these settings in a decentralized manner by
                  passing a proposal to change the settings that token holders
                  vote on.
                </Text>
              </>
            ) : (
              <>
                <Heading size="title.sm">Configure</Heading>
                <Text mt="4px" mb="24px">
                  These settings will determine the functionality of your
                  module.
                </Text>
              </>
            )}

            {(moduleConfiguration[selectedModule] as React.FC)({})}
          </>
        )}
    </form>
  );
};
