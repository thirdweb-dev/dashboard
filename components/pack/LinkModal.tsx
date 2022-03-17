import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Radio,
  RadioGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useId } from "react-id-generator";
import { useEthers } from "@usedapp/core";
import { useActivePackModule } from "context/sdk/modules/pack-context";
import { parseUnits } from "@ethersproject/units";

interface IMintModal {
  isOpen: boolean;
  onClose: () => void;
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const LinkModal: React.FC<IMintModal> = ({ isOpen, onClose }) => {
  const { account } = useEthers();
  const [currentBalance, setCurrentBalance] = useState("");
  const [linkDecimals, setLinkDecimals] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const [isWithdrawing, setIsMinting] = useState(false);
  const [linkFuncType, setLinkFuncType] = useState<
    "deposit" | "withdraw" | undefined
  >();
  const [formId] = useId(1, "currency-mint-form");

  const { module, refresh } = useActivePackModule((c) => c);

  const onSubmit: (data: { amount: string }) => Promise<void> = useCallback(
    async (data) => {
      if (!module || !account) {
        return;
      }

      setIsMinting(true);

      const amount = parseUnits(data.amount, linkDecimals);

      try {
        if (linkFuncType === "deposit") {
          await module.depositLink(amount);
        } else if (linkFuncType === "withdraw") {
          await module.withdrawLink(account, amount);
        }
        await refresh();
      } catch (err) {
        console.error("minting failed!", err);
      } finally {
        setIsMinting(false);

        onClose();
      }
    },
    [module, onClose, refresh, account, linkFuncType, linkDecimals],
  );

  React.useEffect(() => {
    if (!module) {
      return;
    }

    (async () => {
      const linkBal = await module.getLinkBalance();
      setCurrentBalance(linkBal.displayValue);
      setLinkDecimals(linkBal.decimals);
    })();
  }, [module, setCurrentBalance]);

  return (
    <Modal isCentered size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader as={Heading}>
          {linkFuncType
            ? capitalizeFirstLetter(linkFuncType)
            : "Deposit/Withdraw"}{" "}
          $LINK
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack spacing={8}>
            <Center flexGrow={1}>
              <Stack spacing={2}>
                <Heading size="sm">Current Balance</Heading>
                <Text>{currentBalance}</Text>
              </Stack>
            </Center>

            <Stack width="50%">
              <form id={formId} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                  <RadioGroup
                    onChange={(val) => {
                      if (val === "withdraw" || val === "deposit") {
                        setLinkFuncType(val);
                      }
                    }}
                    value={linkFuncType}
                  >
                    <Stack direction="row">
                      <Radio value="withdraw">Withdraw</Radio>
                      <Radio value="deposit">Deposit</Radio>
                    </Stack>
                  </RadioGroup>

                  <FormControl isRequired isInvalid={!!errors.amount}>
                    <FormLabel>Amount</FormLabel>
                    <Input step="any" type="number" {...register("amount")} />
                    <FormErrorMessage>
                      {errors?.amount?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
              </form>
            </Stack>
          </HStack>
        </ModalBody>

        <ModalFooter>
          {linkFuncType ? (
            <Button
              isLoading={isWithdrawing}
              type="submit"
              form={formId}
              colorScheme="teal"
              mr={3}
            >
              {capitalizeFirstLetter(linkFuncType)}
            </Button>
          ) : (
            ""
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
