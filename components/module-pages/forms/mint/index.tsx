import { EitherBaseModuleType } from "@3rdweb-sdk/react/types";
import {
  BundleDropModule,
  BundleModule,
  DropModule,
  NFTModule,
  PackModule,
  TokenModule,
  VoteModule,
} from "@3rdweb/sdk";
import { DrawerHeader, Heading } from "@chakra-ui/react";
import React from "react";
import { BundleDropMintForm } from "./mint.bundledrop";
import { CollectionMintForm } from "./mint.collection";
import { DropMintForm } from "./mint.drop";
import { NFTMintForm } from "./mint.nft";
import { PackMintForm } from "./mint.pack";
import { TokenMintForm } from "./mint.token";
import { ProposalMintForm } from "./mint.vote";
import { WrappedNFTMintForm } from "./mint.wrapped-nft";
import { WrappedTokenMintForm } from "./mint.wrapped-token";

export interface IMintFormProps {
  module?: EitherBaseModuleType;
  wrapType?: "token" | "nft";
}

export const MintForm: React.FC<IMintFormProps> = ({ module, wrapType }) => {
  // if its an nft collection module
  if (module instanceof NFTModule) {
    return (
      <>
        <DrawerHeader>
          <Heading>Mint new NFT</Heading>
        </DrawerHeader>
        <NFTMintForm module={module} />
      </>
    );
  }
  // if its a drop module
  if (module instanceof DropModule) {
    return (
      <>
        <DrawerHeader>
          <Heading>Create new Drop</Heading>
        </DrawerHeader>
        <DropMintForm module={module} />
      </>
    );
  }
  // if its a bundle drop module
  if (module instanceof BundleDropModule) {
    return (
      <>
        <DrawerHeader>
          <Heading>Create new Bundle Drop</Heading>
        </DrawerHeader>
        <BundleDropMintForm module={module} />
      </>
    );
  }
  // if its a bundle module
  if (module instanceof BundleModule) {
    if (wrapType === "nft") {
      return (
        <>
          <DrawerHeader>
            <Heading>Wrap an NFT</Heading>
          </DrawerHeader>
          <WrappedNFTMintForm module={module} />
        </>
      );
    } else if (wrapType === "token") {
      return (
        <>
          <DrawerHeader>
            <Heading>Wrap a token</Heading>
          </DrawerHeader>
          <WrappedTokenMintForm module={module} />
        </>
      );
    }

    return (
      <>
        <DrawerHeader>
          <Heading>Mint new NFT</Heading>
        </DrawerHeader>
        <CollectionMintForm module={module} />
      </>
    );
  }

  // if its a token module
  if (module instanceof TokenModule) {
    return (
      <>
        <DrawerHeader>
          <Heading>Mint additional tokens</Heading>
        </DrawerHeader>
        <TokenMintForm module={module} />
      </>
    );
  }

  // if its a pack module
  if (module instanceof PackModule) {
    return (
      <>
        <DrawerHeader>
          <Heading>Create new pack</Heading>
        </DrawerHeader>
        <PackMintForm module={module} />
      </>
    );
  }

  if (module instanceof VoteModule) {
    return (
      <>
        <DrawerHeader>
          <Heading>Create new proposal</Heading>
        </DrawerHeader>
        <ProposalMintForm module={module} />
      </>
    );
  }

  return null;
};
