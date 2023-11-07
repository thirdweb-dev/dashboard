import {
  usePaymentsCheckoutsByContract,
  usePaymentsRemoveCheckout,
} from "@3rdweb-sdk/react/hooks/usePayments";
import {
  ButtonGroup,
  Flex,
  Icon,
  IconButton,
  useClipboard,
} from "@chakra-ui/react";
import { CreateCheckoutButton } from "./create-checkout-button";
import { Text, Heading, Link, LinkButton } from "tw-components";
import { THIRDWEB_PAYMENTS_API_HOST } from "constants/urls";
import { useTrack } from "hooks/analytics/useTrack";
import { IoMdCheckmark } from "react-icons/io";
import { FiCopy, FiTrash2 } from "react-icons/fi";
import { BiPencil } from "react-icons/bi";
import { AiOutlineQrcode } from "react-icons/ai";

interface PaymentCheckoutsProps {
  contractId: string;
  contractAddress: string;
}

export const PaymentCheckouts: React.FC<PaymentCheckoutsProps> = ({
  contractId,
  contractAddress,
}) => {
  const { data: checkouts } = usePaymentsCheckoutsByContract(contractAddress);
  const { mutate: removeCheckout } = usePaymentsRemoveCheckout(contractAddress);

  console.log({ checkouts });

  return (
    <Flex flexDir="column" gap={6}>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading size="title.md">Checkout Links</Heading>
        <CreateCheckoutButton
          contractAddress={contractAddress}
          contractId={contractId}
        />
      </Flex>
      <Flex flexDir="column" gap={4}>
        {(checkouts || [])?.map((checkout) => {
          const checkoutLink = `${THIRDWEB_PAYMENTS_API_HOST}/checkout/${checkout.id}`;
          return (
            <Flex
              key={checkout.id}
              as={Flex}
              flexDir="column"
              borderBottom="1px solid"
              borderColor="borderColor"
              _last={{ borderBottom: "none" }}
              pb={4}
            >
              <Text>{checkout.collection_title || "Checkout"}</Text>
              <Flex justifyContent="space-between">
                <Flex gap={1} alignItems="center">
                  <Text fontFamily="mono">
                    <Link href={checkoutLink} isExternal color="primary.500">
                      {checkoutLink}
                    </Link>
                  </Text>
                  <CopyCheckoutButton text={checkoutLink} />
                </Flex>
                <ButtonGroup>
                  <IconButton
                    variant="outline"
                    icon={<Icon as={BiPencil} />}
                    aria-label="Edit checkout"
                  />
                  <IconButton
                    as={LinkButton}
                    variant="outline"
                    icon={<Icon as={AiOutlineQrcode} />}
                    aria-label="Generate QR Code"
                    href={`${THIRDWEB_PAYMENTS_API_HOST}/dashboard/checkout/qr-code?url=${encodeURIComponent(
                      checkoutLink,
                    )}`}
                    isExternal
                    noIcon
                    bg="none"
                  />
                  <IconButton
                    variant="outline"
                    icon={<Icon as={FiTrash2} />}
                    aria-label="Remove checkout"
                    onClick={() => removeCheckout({ checkoutId: checkout.id })}
                  />
                </ButtonGroup>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export const CopyCheckoutButton: React.FC<{ text: string }> = ({ text }) => {
  const { onCopy, hasCopied } = useClipboard(text);
  const trackEvent = useTrack();
  return (
    <IconButton
      borderRadius="md"
      variant="ghost"
      colorScheme="whiteAlpha"
      size="sm"
      aria-label="Copy checkout link"
      onClick={() => {
        onCopy();
        trackEvent({
          category: "payments",
          action: "click",
          label: "copy-checkout-link",
          text,
        });
      }}
      icon={
        <Icon
          as={hasCopied ? IoMdCheckmark : FiCopy}
          fill={hasCopied ? "green.500" : undefined}
        />
      }
    />
  );
};
