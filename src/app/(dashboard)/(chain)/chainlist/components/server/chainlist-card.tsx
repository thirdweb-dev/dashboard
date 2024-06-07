import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleAlertIcon } from "lucide-react";
import Link from "next/link";
import { ChainSupportedService } from "../../../types/chain";

type ChainListCardProps = {
  favoriteButton: JSX.Element;
  chainId: number;
  chainSlug: string;
  chainName: string;
  enabledServices: ChainSupportedService[];
  currencySymbol: string;
  isDeprecated: boolean;
};

export const ChainListCard: React.FC<ChainListCardProps> = ({
  isDeprecated,
  chainId,
  chainName,
  chainSlug,
  currencySymbol,
  enabledServices,
  favoriteButton,
}) => {
  return (
    <div className="relative h-full">
      <Card className="h-full w-full hover:bg-muted">
        <CardHeader className="flex flex-row justify-between justify-items-center p-4">
          <div className="flex flex-row items-center gap-2.5">
            <Link
              className="static group before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:z-0"
              href={`/${chainSlug}`}
            >
              <CardTitle className="text-xl">{chainName}</CardTitle>
            </Link>
          </div>

          {favoriteButton}
        </CardHeader>

        <CardContent className="pt-0 px-4 pb-4">
          {/* table of `chain id` `native token` `managed support`, header row on left value row on right */}
          <table className="w-full">
            <tbody className="[&_td]:py-0.5 text-sm">
              <tr>
                <th className="text-left font-normal text-secondary-foreground">
                  Chain ID
                </th>
                <td>{chainId}</td>
              </tr>
              <tr>
                <th className="text-left font-normal text-secondary-foreground">
                  Native Token
                </th>
                <td>{currencySymbol}</td>
              </tr>
              <tr>
                <th className="text-left font-normal text-secondary-foreground">
                  Available Services
                </th>

                <td>
                  <span>{enabledServices.length}</span>
                </td>
              </tr>
            </tbody>
          </table>

          {isDeprecated && (
            <div className="mt-5 flex gap-5 border-t pt-4">
              {/* {!isDeprecated && (
                <>
                  {isVerified && (
                    <div className="gap-1.5 flex items-center">
                      <Verified className="text-primary-foreground size-5" />
                      <p className="text-sm">Verified</p>
                    </div>
                  )}

                  {isGasSponsored && (
                    <div className="gap-1.5 flex items-center">
                      <FuelIcon className="text-primary-foreground size-5" />
                      <p className="text-sm">Gas Sponsored</p>
                    </div>
                  )}
                </>
              )} */}

              {isDeprecated && (
                <div className="gap-1.5 flex items-center">
                  <CircleAlertIcon className="text-destructive-foreground size-5" />
                  <p className="text-sm">Deprecated</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
