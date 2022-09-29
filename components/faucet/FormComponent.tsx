import { Input, InputGroup, Spinner, chakra, useToast } from "@chakra-ui/react";
import axios from "axios";
import { FC, useState } from "react";
import { Button } from "tw-components";

const FormComponent: FC = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");

  const sendFunds = async () => {
    try {
      setLoading(true);

      const res = await axios.post("/api/faucet/solana", {
        address,
      });
      toast({
        title: "Success",
        description: res.data.message || "Funds sent",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setAddress("");
    } catch (err) {
      toast({
        title: "Error",
        description:
          (err as any).response.data.message || "Something went wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <chakra.form
      alignItems="center"
      display="flex"
      gap="4"
      justifyContent="center"
    >
      <InputGroup>
        <Input
          bg="#0F1318"
          borderColor="#0F1318"
          color="#F2F2F7"
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
          value={address}
        />
      </InputGroup>

      <Button
        bg="#0098EE"
        borderColor="#0098EE"
        color="#F2F2F7"
        disabled={loading}
        onClick={sendFunds}
        w="175px"
      >
        {loading ? <Spinner /> : "Request Funds"}
      </Button>
    </chakra.form>
  );
};
export default FormComponent;
