import { useWeb3 } from "@3rdweb/hooks";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from "@chakra-ui/react";
import { isAddress } from "@ethersproject/address";
import { useNetworkUrl } from "hooks/useHref";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { shortenIfAddress } from "utils/usedapp-external";

export const Breadcrumbs: React.FC = () => {
  const { asPath, pathname } = useRouter();
  const { address } = useWeb3();

  const cleanAsPath = useMemo(() => {
    return asPath.split("?")[0];
  }, [asPath]);

  const crumbs = useMemo(() => {
    const asArray = cleanAsPath.split("/");

    const _crumbs: Array<{ name: JSX.Element; path: string }> = [];

    for (let i = 1; i < asArray.length; i = i + 2) {
      let title = i === 1 ? "Project" : asArray[i];
      title = title.split("-").join(" ");
      const _address = isAddress(asArray[i + 1])
        ? shortenIfAddress(asArray[i + 1])
        : "";
      if (_address) {
        _crumbs.push({
          name: (
            <>
              {title}{" "}
              <Text as="span" fontFamily="mono">
                {_address ? ` (${_address})` : ""}
              </Text>
            </>
          ),
          path: `${asArray.slice(0, i + 2).join("/")}`,
        });
      }
    }
    return _crumbs;
  }, [cleanAsPath]);

  const networkUrl = useNetworkUrl();

  if (crumbs.length === 0) {
    return null;
  }

  return (
    <Breadcrumb
      display={{ base: "none", md: "block" }}
      separator={<ChevronRightIcon color="gray.500" />}
      mb={8}
    >
      {address && (
        <BreadcrumbItem>
          <NextLink href={networkUrl} passHref>
            <BreadcrumbLink
              isCurrentPage={pathname === "/[network]"}
              _activeLink={{ fontWeight: "bold" }}
            >
              Dashboard
            </BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
      )}
      {crumbs.map((crumb) => (
        <BreadcrumbItem key={crumb.path}>
          <NextLink href={crumb.path} passHref>
            <BreadcrumbLink
              isCurrentPage={cleanAsPath === crumb.path}
              _activeLink={{ fontWeight: "bold" }}
              textTransform="capitalize"
            >
              {crumb.name}
            </BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};
