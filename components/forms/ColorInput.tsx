import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Popover,
  PopoverContent,
} from "@chakra-ui/react";
import { makeColorHexSafe, useSafeColorHex } from "hooks/useSafeColorHex";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useDebouncyEffect } from "use-debouncy";
import isHexColor from "validator/lib/isHexColor";

interface IColorInput {
  name: string;
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

export const ColorInput: React.FC<IColorInput> = ({
  name,
  watch,
  setValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  const _color = watch(name);
  const safeColor = useSafeColorHex(_color);

  const [localColor, setLocalColor] = useState(safeColor);

  const setterColor = useSafeColorHex(localColor, true);

  const [inputColor, setInputColor] = useState(setterColor);

  useDebouncyEffect(
    () => {
      setInputColor(setterColor);
      setValue(name, setterColor, { shouldValidate: true });
    },
    200,
    [setterColor],
  );

  return (
    <InputGroup>
      <InputLeftAddon>#</InputLeftAddon>
      <Input
        value={inputColor}
        maxLength={6}
        onChange={(e) => {
          const val = e.currentTarget.value;
          setInputColor(val);
          if (isHexColor(val)) {
            try {
              const safeVal = makeColorHexSafe(val);
              setLocalColor(safeVal);
              // eslint-disable-next-line no-empty
            } catch (err) {}
          }
        }}
      />
      <InputRightAddon px={0}>
        <Popover
          returnFocusOnClose={false}
          isOpen={isOpen}
          onClose={close}
          id="color-popover"
        >
          <Button variant="solid" onClick={open}>
            <Box
              background={localColor}
              flexShrink={0}
              h={7}
              w={7}
              borderRadius="full"
            />
          </Button>
          <PopoverContent
            w="initial"
            outline="none!important"
            outlineOffset="0!important"
          >
            <HexColorPicker color={localColor} onChange={setLocalColor} />
          </PopoverContent>
        </Popover>
      </InputRightAddon>
    </InputGroup>
  );
};
