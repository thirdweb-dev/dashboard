import { Progress } from "@chakra-ui/react";
import { UploadProgressEvent } from "@thirdweb-dev/storage";
import { useEffect, useState } from "react";
import { Text, TrackedLink } from "tw-components";

interface ProgressBoxProps {
  progress: UploadProgressEvent;
}

export const ProgressBox: React.FC<ProgressBoxProps> = ({ progress }) => {
  const isFinished = progress.progress >= progress.total;
  const [takingLong, setTakingLong] = useState(false);

  useEffect(() => {
    if (isFinished) {
      const t = setTimeout(() => {
        setTakingLong(true);
      }, 10000);

      return () => {
        clearTimeout(t);
      };
    }
  }, [isFinished]);

  return (
    <>
      {takingLong && (
        <Text size="body.sm" textAlign="center">
          This may take a while.
        </Text>
      )}
      {progress.progress !== 0 && (
        <Progress
          borderRadius="md"
          mt="12px"
          size="lg"
          hasStripe
          colorScheme="blue"
          value={(progress.progress / progress.total) * 100}
        />
      )}
      <Text size="body.sm" mt={2}>
        <TrackedLink
          href="https://thirdweb.notion.site/Batch-Upload-Troubleshooting-dbfc0d3afa6e4d1b98b6199b449c1596"
          isExternal
          category="batch-upload"
          label="issues"
        >
          Experiencing issues uploading your files?
        </TrackedLink>
      </Text>
    </>
  );
};
