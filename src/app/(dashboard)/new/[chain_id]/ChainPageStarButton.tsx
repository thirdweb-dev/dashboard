"use client";

import { useQuery } from "@tanstack/react-query";
import { StarButton } from "../chainlist/components/star-button";
import { isChainToFavorites } from "../chainlist/components/favorites";
import { Skeleton } from "../../../../@/components/ui/skeleton";

export function ChainPageStarButton(props: {
  chainId: number;
  className?: string;
  iconClassName?: string;
}) {
  const isFavouriteQuery = useQuery({
    queryKey: ["isFavourite", props.chainId],
    queryFn: async () => {
      return isChainToFavorites(props.chainId);
    },
  });

  if (isFavouriteQuery.isLoading) {
    return <Skeleton className={props.iconClassName} />;
  }

  return (
    <StarButton {...props} initialPreferred={isFavouriteQuery.data || false} />
  );
}
