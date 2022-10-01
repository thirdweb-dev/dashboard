import { FormControl, Input, Spinner, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Button } from "tw-components";

export const FormComponent: React.FC = () => {
  const [address, setAddress] = useState("");
  const toast = useToast();
  const { mutate, isLoading } = useMutation(
    async () => {
      console.log("mutate");
      return await axios.post("/api/faucet/solana", {
        address,
      });
    },
    {
      onSuccess: (res) =>
        toast({
          title: "Success",
          description: res.data.message || "Funds sent",
          status: "success",
          duration: 9000,
          isClosable: true,
        }),
      onError: (error) =>
        toast({
          title: "Error",
          description:
            (error as any).response.data.message || "Something went wrong",
          status: "error",
          duration: 9000,
          isClosable: true,
        }),
    },
  );

  return (
    <FormControl
      alignItems="center"
      display="flex"
      gap="4"
      justifyContent="center"
      onSubmit={() => mutate()}
    >
      <Input
        bg="#0F1318"
        borderColor="#0F1318"
        color="#F2F2F7"
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter your address"
        value={address}
      />

      <Button
        bg="#0098EE"
        borderColor="#0098EE"
        color="#F2F2F7"
        disabled={isLoading}
        w="175px"
        onClick={() => {
          mutate();
        }}
      >
        {isLoading ? <Spinner /> : "Request Funds"}
      </Button>
    </FormControl>
  );
};
export default FormComponent;
