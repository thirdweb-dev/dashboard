import { pipeFunctionExecutor } from "./helper";
import { removeEmptyValues } from "./parseAttributes";
import type { NFTMetadataInput } from "@thirdweb-dev/sdk";
import Papa from "papaparse";

export interface CSVData extends Record<string, string | undefined> {
  name: string;
  description?: string;
  external_url?: string;
  background_color?: string;
  youtube_url?: string;
}

export const csvMimeTypes = [
  "text/csv",
  "text/plain",
  "text/x-csv",
  "application/vnd.ms-excel",
  "application/csv",
  "application/x-csv",
  "text/comma-separated-values",
  "text/x-comma-separated-values",
  "text/tab-separated-values",
];

export const jsonMimeTypes = [
  "application/json",
  "application/x-json",
  "application/ld+json",
  "application/json-ld",
  "application/x-json-ld",
];

export const transformHeader = (h: string) => {
  const headersToTransform = [
    "name",
    "description",
    "image",
    "animation_url",
    "external_url",
    "background_color",
    "youtube_url",
  ];

  if (headersToTransform.includes(h.trim().toLowerCase())) {
    return h.trim().toLowerCase();
  }
  return h.trim();
};

function removeSpecialCharacters(str: string) {
  return str.replace(/[^a-zA-Z0-9 ]/g, "");
}

function sortAscending(a: File, b: File) {
  return (
    parseInt(removeSpecialCharacters(a.name)) -
    parseInt(removeSpecialCharacters(b.name))
  );
}

const getAcceptedFiles = async (acceptedFiles: File[]) => {
  const jsonFiles = acceptedFiles
    .filter((f) => jsonMimeTypes.includes(f.type) || f.name.endsWith(".json"))
    .sort(sortAscending);

  const jsonFilesText = await Promise.all(jsonFiles.map((f) => f.text()));
  const json = jsonFilesText.reduce((result, text) => {
    try {
      return [...result, JSON.parse(text)];
    } catch (error) {
      console.error(error);
      return result;
    }
  }, [] as unknown[]);

  const csv = acceptedFiles.find(
    (f) => csvMimeTypes.includes(f.type) || f.name.endsWith(".csv"),
  );
  const images = acceptedFiles
    .filter((f) => f.type.includes("image/"))
    .sort(sortAscending);
  const videos = acceptedFiles
    .filter(
      (f) =>
        f.type.includes("video/") ||
        f.type.includes("audio") ||
        f.type.includes("model") ||
        f.type.includes("pdf") ||
        f.type.includes("text") ||
        f.name.endsWith(".glb") ||
        f.name.endsWith(".usdz"),
    )
    .filter((f) => f.name !== csv?.name)
    .sort(sortAscending);

  return { csv, json, images, videos };
};

export const removeEmptyKeysFromObject = (obj: any) =>
  Object.keys(obj).reduce((result, key) => {
    if (!obj(key) || obj(key).length === 0) return result;
    return { ...result, [key]: obj[key] };
  }, {} as any);

export const convertToOsStandard = (obj: NFTMetadataInput["attributes"]) => {
  const constructAttributesFromObj = (
    obj: NFTMetadataInput["attributes"] = {},
  ) =>
    Object.entries(obj || {}).map(([trait_type, value]) => ({
      trait_type,
      value,
    }));
  return pipeFunctionExecutor(
    constructAttributesFromObj,
    removeEmptyValues,
  )(obj);
};

const getMergedData = (
  csvData: Papa.ParseResult<CSVData> | undefined,
  jsonData: any,
  imageFiles: File[],
  videoFiles: File[],
): NFTMetadataInput[] => {
  if (csvData?.data) {
    const isImageMapped = csvData.data.some((row) =>
      imageFiles.find((img) => img?.name === row.image),
    );
    const isAnimationUrlMapped = csvData.data.some((row) =>
      videoFiles.find((video) => video?.name === row.animation_url),
    );

    return csvData.data.map((row, index) => {
      const {
        name,
        description,
        image,
        animation_url,
        external_url,
        background_color,
        youtube_url,
        ...properties
      } = row;

      return removeEmptyKeysFromObject({
        name: name.toString(),
        description: description?.toString(),
        external_url,
        background_color,
        youtube_url,
        attributes: pipeFunctionExecutor(
          removeEmptyKeysFromObject,
          convertToOsStandard,
        )(properties),
        image:
          imageFiles.find((img) => img?.name === image) ||
          (!isImageMapped && imageFiles[index]) ||
          image ||
          undefined,
        animation_url:
          videoFiles.find((video) => video?.name === animation_url) ||
          (!isAnimationUrlMapped && videoFiles[index]) ||
          animation_url ||
          undefined,
      });
    });
  } else if (Array.isArray(jsonData)) {
    const isImageMapped = jsonData.some((row) =>
      imageFiles.find((img) => img?.name === row.image),
    );
    const isAnimationUrlMapped = jsonData.some((row) =>
      videoFiles.find((video) => video?.name === row.animation_url),
    );

    return jsonData.map((nft: any, index: number) => ({
      ...nft,
      image:
        imageFiles.find((img) => img?.name === nft?.image) ||
        (!isImageMapped && imageFiles[index]) ||
        nft.image ||
        nft.file_url ||
        undefined,
      animation_url:
        videoFiles.find((video) => video?.name === nft?.animation_url) ||
        (!isAnimationUrlMapped && videoFiles[index]) ||
        nft.animation_url ||
        undefined,
    }));
  } else {
    return [];
  }
};

export async function processInputData(
  files: File[],
  setData: (data: NFTMetadataInput[]) => void,
) {
  const { csv, json, images, videos } = await getAcceptedFiles(files);
  if (json.length > 0) {
    setData(getMergedData(undefined, json, images, videos));
  } else if (csv) {
    Papa.parse<CSVData>(csv, {
      header: true,
      transformHeader,
      complete: (results) => {
        const { data, errors } = results;
        const validResults = data.reduce(
          (acc, _, index) => {
            if (errors.find(({ row }) => row === index)) {
              if (data[index] && data[index].name) {
                return { ...acc, data: [...acc.data, data[index]] };
              }
            }
            return acc;
          },
          {
            ...results,
            data: [],
          } as Papa.ParseResult<CSVData>,
        );
        pipeFunctionExecutor(getMergedData, setData)(
          validResults,
          undefined,
          images,
          videos,
        );
      },
    });
  } else {
    throw new Error(
      'No valid files found. Please upload a ".csv" or ".json" file.',
    );
  }
}

export const shuffleData = (array: NFTMetadataInput[]) =>
  array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
