import { BoxProps, Center } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form";

interface IFileInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  boxProps?: BoxProps;
}

export const FileInput: React.FC<IFileInputProps> = ({
  name,
  children,
  setValue,
  accept,
  boxProps,
}) => {
  const onDrop = useCallback<
    <T extends File>(
      acceptedFiles: T[],
      fileRejections: FileRejection[],
      event: DropEvent,
    ) => void
  >(
    (droppedFiles) => {
      setValue(name, droppedFiles[0], { shouldValidate: false });
    },
    [setValue, name],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });

  return (
    <Center {...boxProps} cursor="pointer" {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
    </Center>
  );
};
