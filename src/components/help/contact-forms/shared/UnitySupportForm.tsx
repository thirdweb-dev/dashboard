import { useFormContext } from "react-hook-form";
import { SdkVersionInput } from "./SdkVersionInput";
import DescriptionInput from "./DescriptionInput";
import { FormControl, Input, Select } from "@chakra-ui/react";
import { FormLabel } from "tw-components";

const OPERATING_SYSTEMS = ["Windows", "MacOS", "Linux", "Other"];
const TARGET_PLATFORMS = [
  "Windows Standalone",
  "MacOS Standalone",
  "Linux Standalone",
  "WebGL",
  "Android",
  "iOS",
  "Other",
];

export const UnitySupportForm = () => {
  const { register } = useFormContext();
  return (
    <>
      <FormControl isRequired>
        <FormLabel>OS</FormLabel>
        <Select {...register("extraInfo_OS", { required: true })}>
          <option value="">Select an operating system</option>
          {OPERATING_SYSTEMS.map((os) => (
            <option key={os} value={os}>
              {os}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Target platform</FormLabel>
        <Select {...register("extraInfo_Target_Platform", { required: true })}>
          <option value="">Select a target platform</option>
          {TARGET_PLATFORMS.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Unity version</FormLabel>
        <Input
          autoComplete="off"
          {...register("extraInfo_Unity_Version", {
            required: true,
          })}
        ></Input>
      </FormControl>

      <SdkVersionInput />
      <DescriptionInput />
    </>
  );
};
