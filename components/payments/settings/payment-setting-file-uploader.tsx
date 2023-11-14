import { Image } from "@chakra-ui/react";
import { FileInput } from "components/shared/FileInput";
import { useTxNotifications } from "hooks/useTxNotifications";
import React, { useEffect, useState } from "react";
import { Accept } from "react-dropzone";

// Max file size is 10 MB.
const maxFileSizeBytes = 10 * 1024 * 1024;

interface IPaymentsSettingsFileUploader {
  value: string;
  accept: Accept;
  onUpdate: (fileUrl: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}
export const PaymentsSettingsFileUploader: React.FC<
  IPaymentsSettingsFileUploader
> = ({ accept, value, onUpdate, setIsLoading: _setIsLoading }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(value);

  useEffect(() => {
    setImageUrl(value);
  }, [value]);

  const { onSuccess, onError } = useTxNotifications(
    "File uploaded successfully.",
    "Failed to upload file.",
  );

  const handleFileUpload = (file: File) => {
    if (file.size > maxFileSizeBytes) {
      const message = `File size must be less than ${maxFileSizeBytes} bytes.`;
      onError(new Error(message));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target) {
        const upload = async (url: string) => {
          try {
            setIsLoading(true);
            _setIsLoading(true);
            const { variants } = await uploadToCloudflare(url);
            onSuccess();
            onUpdate(variants.public);
            setImageUrl(variants.public);
          } catch (error) {
            onError(error);
            console.error({ error });
          } finally {
            setIsLoading(false);
            _setIsLoading(false);
          }
        };
        upload(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <FileInput
      accept={accept}
      value={value}
      setValue={handleFileUpload}
      isDisabled={isLoading}
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      transition="all 200ms ease"
      _hover={{ shadow: "sm" }}
      renderPreview={() => (
        <Image alt="" w="100%" h="100%" src={imageUrl} borderRadius="full" />
      )}
      helperText="Image"
    />
  );
};

/**
 * Uploads an image to Cloudflare Images.
 * @param dataBase64 Base64-encoded image.
 */
interface uploadLinkResponse {
  uploadLink: string;
  imageId: string;
}

interface uploadImageResponse {
  result: {
    id: string;
    meta: { [field: string]: string };
    variants: string[];
  };
  success: boolean;
  errors: any;
  messages: any;
}

interface IUploadResponse {
  variants: { [variant: string]: string };
}

/**
 * Takes a base64-encoded image, uploads to Cloudflare Images, and returns a promise with the resulting URL in the expected variant.
 */
const uploadToCloudflare = async (
  dataBase64: string,
): Promise<IUploadResponse> => {
  const file = await getBlobFromBase64Image(dataBase64);

  // Get the cloudflare upload link from the server.
  const url = `${process.env.NEXT_PUBLIC_THIRDWEB_EWS_API_HOST}/api/storage/get-image-upload-link`;
  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();
  if (!res.ok || !result.success) {
    throw new Error("Failed to get upload link.");
  }
  const { uploadLink, imageId } = result.data as uploadLinkResponse;
  if (!uploadLink || uploadLink === "") {
    throw new Error("Unable to get upload link.");
  }

  // Append the data to the form and upload to cloudflare.
  const uploadForm = new FormData();
  uploadForm.append("file", file, imageId);

  // Upload the image to cloudflare.
  const response = await fetch(uploadLink, {
    method: "POST",
    body: uploadForm,
  });
  if (response.status !== 200) {
    throw new Error("Failed to upload image.");
  }
  const responseData = (await response.json()) as uploadImageResponse;
  const imageUrl =
    responseData.result.variants[1] || responseData.result.variants[0] || "";
  if (imageUrl === "") {
    throw new Error("Unable to generate image URL.");
  }

  // Return the string URL.
  return { variants: { public: imageUrl } };
};

const getBlobFromBase64Image = async (strBase64: string): Promise<Blob> => {
  // Validate string is a base64 image.
  const tokens = strBase64.split(",");
  if (tokens.length !== 2 || !tokens[0].startsWith("data:image/")) {
    return Promise.reject("invalid base64 image format");
  }

  // Convert base64 to a file format.
  const imageBase64Response = await fetch(strBase64);
  return imageBase64Response.blob();
};
