import { CircleAlertIcon } from "lucide-react";
import Link from "next/link";
import { ToolTipLabel } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { products } from "../../../components/server/products";
import { ChainSupportedService } from "../../../types/chain";
import { ChainIcon } from "../../../components/server/chain-icon";

type ChainListRowProps = {
  favoriteButton: JSX.Element;
  chainId: number;
  chainSlug: string;
  chainName: string;
  enabledServices: ChainSupportedService[];
  currencySymbol: string;
  isDeprecated: boolean;
  iconUrl?: string;
};

export const ChainListRow: React.FC<ChainListRowProps> = ({
  isDeprecated,
  chainId,
  chainName,
  chainSlug,
  currencySymbol,
  enabledServices,
  favoriteButton,
  iconUrl,
}) => {
  return (
    <tr className="border-b relative hover:bg-secondary">
      <TableData>{favoriteButton}</TableData>
      {/* Name */}
      <TableData>
        <div className="flex flex-row items-center gap-4 w-[370px]">
          <div className="flex items-center gap-2">
            <ChainIcon iconUrl={iconUrl} className="size-6" />
            <Link
              href={`/${chainSlug}`}
              className="static group before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:z-0"
            >
              {chainName}
            </Link>

            {/* {isVerified && (
              <ToolTipLabel label="Verified">
                <Verified className="text-primary-foreground size-5 z-10 " />
              </ToolTipLabel>
            )}

            {isGasSponsored && (
              <ToolTipLabel label="Gas Sponsored">
                <FuelIcon className="text-primary-foreground size-5 z-10 " />
              </ToolTipLabel>
            )} */}

            {isDeprecated && (
              <ToolTipLabel label="Deprecated">
                <CircleAlertIcon className="text-destructive-foreground size-5 z-10 " />
              </ToolTipLabel>
            )}
          </div>
        </div>
      </TableData>

      <TableData>{chainId}</TableData>

      <TableData>{currencySymbol}</TableData>

      <TableData>
        <div className="flex flex-row gap-14 items-center w-[520px] ">
          <div className="flex items-center gap-7 z-10">
            {products
              .filter((p) => enabledServices.includes(p.id))
              .map((p) => {
                return (
                  <ProductIcon
                    key={p.name}
                    icon={p.icon}
                    label={p.name}
                    // TODO: this href should lead to the sub-page on the chainpage
                    href={p.href}
                  />
                );
              })}
          </div>
        </div>
      </TableData>
    </tr>
  );
};

function TableData({ children }: { children: React.ReactNode }) {
  return <td className="p-4">{children}</td>;
}

function ProductIcon(props: {
  icon: React.FC<{ className?: string }>;
  label: string;
  href: string;
}) {
  return (
    <ToolTipLabel label={props.label}>
      <Link href={props.href} target="_blank">
        <props.icon className={cn("size-8 grayscale hover:grayscale-0")} />
      </Link>
    </ToolTipLabel>
  );
}
