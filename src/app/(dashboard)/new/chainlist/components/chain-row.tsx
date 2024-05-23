/* eslint-disable @next/next/no-img-element */
"use client";

import { FuelIcon, Verified } from "lucide-react";
import { ChainMetadata } from "thirdweb/chains";
import Link from "next/link";
import icon1 from "./icons/icon-1.svg";
import icon2 from "./icons/icon-2.svg";
import icon3 from "./icons/icon-3.svg";
import icon4 from "./icons/icon-4.svg";
import icon5 from "./icons/icon-5.svg";
import icon6 from "./icons/icon-6.svg";
import Image from "next/image";
import { StarButton } from "./star-button";
import { ToolTipLabel } from "../../../../../@/components/ui/tooltip";

// TODO: save the preferred chains to db

type ChainRowProps = {
  chain: ChainMetadata;
  isPreferred: boolean;
  isVerified: boolean;
  isGasSponsored: boolean;
};

export const fallbackChainIcon =
  "data:image/svg+xml;charset=UTF-8,%3csvg width='15' height='14' viewBox='0 0 15 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M7 8.04238e-07C5.1435 8.04238e-07 3.36301 0.737501 2.05025 2.05025C0.7375 3.36301 0 5.1435 0 7C0 7.225 -1.52737e-07 7.445 0.0349998 7.665C0.16385 9.0151 0.68213 10.2988 1.52686 11.3598C2.37158 12.4209 3.50637 13.2137 4.79326 13.642C6.0801 14.0702 7.4637 14.1153 8.7758 13.7719C10.0879 13.4285 11.2719 12.7113 12.184 11.7075C13.0961 10.7038 13.6969 9.4567 13.9135 8.1178C14.1301 6.7789 13.9531 5.406 13.4039 4.16587C12.8548 2.92574 11.9573 1.87184 10.8204 1.13228C9.6835 0.392721 8.3563 -0.000649196 7 8.04238e-07ZM7 1C8.581 1.00137 10.0975 1.62668 11.22 2.74V3.24C9.2438 2.55991 7.0956 2.56872 5.125 3.265C4.96758 3.1116 4.76997 3.00586 4.555 2.96H4.43C4.37 2.75 4.315 2.54 4.27 2.325C4.225 2.11 4.2 1.92 4.175 1.715C5.043 1.24658 6.0137 1.00091 7 1ZM5.5 3.935C7.3158 3.32693 9.2838 3.34984 11.085 4C10.8414 5.2703 10.3094 6.4677 9.53 7.5C9.312 7.4077 9.0707 7.3855 8.8395 7.4366C8.6083 7.4877 8.3988 7.6094 8.24 7.785C8.065 7.685 7.89 7.585 7.74 7.47C6.7307 6.7966 5.8877 5.9023 5.275 4.855C5.374 4.73221 5.4461 4.58996 5.4866 4.43749C5.5271 4.28502 5.5351 4.12575 5.51 3.97L5.5 3.935ZM3.5 2.135C3.5 2.24 3.53 2.35 3.55 2.455C3.595 2.675 3.655 2.89 3.715 3.105C3.52353 3.21838 3.36943 3.38531 3.2717 3.58522C3.17397 3.78513 3.13688 4.00927 3.165 4.23C2.37575 4.7454 1.67078 5.3795 1.075 6.11C1.19455 5.3189 1.47112 4.55966 1.88843 3.87701C2.30575 3.19437 2.85539 2.60208 3.505 2.135H3.5ZM3.5 9.99C3.30481 10.0555 3.13037 10.1714 2.9943 10.3259C2.85822 10.4804 2.76533 10.6681 2.725 10.87H2.405C1.59754 9.9069 1.1146 8.7136 1.025 7.46L1.08 7.365C1.70611 6.3942 2.52463 5.562 3.485 4.92C3.62899 5.0704 3.81094 5.179 4.01162 5.2345C4.2123 5.2899 4.42423 5.2901 4.625 5.235C5.2938 6.3652 6.208 7.3306 7.3 8.06C7.505 8.195 7.715 8.32 7.925 8.44C7.9082 8.6312 7.9391 8.8237 8.015 9C7.1 9.7266 6.0445 10.256 4.915 10.555C4.78401 10.3103 4.57028 10.1201 4.31199 10.0184C4.05369 9.9167 3.76766 9.9102 3.505 10L3.5 9.99ZM7 12.99C5.9831 12.9903 4.98307 12.7304 4.095 12.235L4.235 12.205C4.43397 12.1397 4.61176 12.0222 4.74984 11.8648C4.88792 11.7074 4.98122 11.5158 5.02 11.31C6.2985 10.984 7.4921 10.3872 8.52 9.56C8.7642 9.7027 9.0525 9.75 9.3295 9.6927C9.6064 9.6355 9.8524 9.4778 10.02 9.25C10.7254 9.4334 11.4511 9.5275 12.18 9.53H12.445C11.9626 10.5673 11.1938 11.4451 10.2291 12.0599C9.2643 12.6747 8.144 13.0009 7 13V12.99ZM10.255 8.54C10.2545 8.3304 10.1975 8.1249 10.09 7.945C10.9221 6.8581 11.5012 5.5991 11.785 4.26C12.035 4.37667 12.2817 4.50667 12.525 4.65C13.0749 5.9495 13.1493 7.4012 12.735 8.75C11.9049 8.8142 11.0698 8.7484 10.26 8.555L10.255 8.54Z' fill='%23646D7A'/%3e%3c/svg%3e";

export const ChainRowContent: React.FC<ChainRowProps> = (props) => {
  const { chain, isPreferred, isVerified, isGasSponsored } = props;

  return (
    <tr className="border-b relative hover:bg-secondary">
      {/* Icon + Name */}
      <TableData>
        <div className="flex flex-row items-center gap-4 w-[370px]">
          <StarButton
            chainName={chain.name}
            initialPreferred={isPreferred}
            className="relative z-10"
          />

          <div className="flex items-center gap-3">
            <Link
              href={`/new/${chain.slug}`}
              className="static group before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:z-0"
            >
              {chain.name}
            </Link>

            {isVerified && (
              <ToolTipLabel label="Verified">
                <Verified
                  strokeWidth={1.5}
                  className="text-primary size-5 z-10"
                />
              </ToolTipLabel>
            )}

            {isGasSponsored && (
              <ToolTipLabel label="Gas Sponsored">
                <FuelIcon className="text-primary size-5 block z-10" />
              </ToolTipLabel>
            )}
          </div>
        </div>
      </TableData>

      <TableData>{chain.chainId}</TableData>

      <TableData>{chain.nativeCurrency?.symbol}</TableData>

      <TableData>
        {/* TODO - use real data */}
        <div className="flex flex-row gap-14 items-center grayscale w-[520px]">
          <span> 5 out of 6 </span>
          <div className="flex items-center gap-8">
            <Image src={icon1} alt="" className="size-8" />
            <Image src={icon2} alt="" className="size-8" />
            <Image src={icon3} alt="" className="size-8" />
            <Image src={icon4} alt="" className="size-8" />
            <Image src={icon5} alt="" className="size-8" />
            <Image src={icon6} alt="" className="size-8 opacity-40" />
          </div>
        </div>
      </TableData>
    </tr>
  );
};

function TableData({ children }: { children: React.ReactNode }) {
  return <td className="p-4">{children}</td>;
}
