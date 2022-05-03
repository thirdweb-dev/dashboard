import {
  ButtonGroup,
  Flex,
  FormControl,
  IconButton,
  Textarea,
} from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useForm } from "react-hook-form";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Button, FormErrorMessage, FormLabel, Heading } from "tw-components";

const FEEDBACK_PRODUCT_MAP = {
  "thirdweb-deploy": "thirdweb deploy",
} as const;

export interface FeedbackFormProps {
  wallet?: string;
  scope: keyof typeof FEEDBACK_PRODUCT_MAP;
  onClose?: () => void;
}
export const FeedbackForm: React.VFC<FeedbackFormProps> = ({
  scope,
  wallet,
  onClose,
}) => {
  const { trackEvent } = useTrack();
  const productName = FEEDBACK_PRODUCT_MAP[scope];

  const { register, watch, handleSubmit, setValue, setError, formState } =
    useForm<{
      rating: Rating;
      feedback: string;
    }>({
      defaultValues: { rating: 0, feedback: "" },
    });

  const { onSuccess } = useTxNotifications(
    "Thank you for your feedback!",
    "Failed to submit feedback.",
  );

  return (
    <Flex
      onSubmit={handleSubmit(async (data) => {
        if (!wallet) {
          // cannot submit feedback without an address, just close the form
          if (onClose) {
            onClose();
          }
          return;
        }
        if (!data.rating) {
          setError("rating", {
            type: "required",
            message: "Please select a rating.",
          });
          return;
        }
        trackEvent({
          category: "feedback",
          action: "submit",
          label: scope,
          data,
        });
        try {
          await fetch("/api/feedback", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              scope,
              address: wallet,
              ...data,
            }),
          });
          onSuccess();
        } catch (e) {
          console.error("failed to send product feedback", e);
        } finally {
          if (onClose) {
            onClose();
          }
        }
      })}
      as="form"
      direction="column"
      gap={6}
    >
      <Heading size="subtitle.md" fontWeight={400}>
        Provide feedback for <strong>{productName}</strong>
      </Heading>
      <FormControl
        as={Flex}
        flexDirection="column"
        gap={0.5}
        isInvalid={!!formState.errors.rating}
      >
        <FormLabel>Rating</FormLabel>
        <StartRating
          rating={watch("rating")}
          onRating={(rating) => setValue("rating", rating)}
        />
        <FormErrorMessage>{formState.errors.rating?.message}</FormErrorMessage>
      </FormControl>
      <FormControl as={Flex} flexDirection="column" gap={0.5}>
        <FormLabel>Feedback</FormLabel>
        <Textarea
          {...register("feedback")}
          placeholder={`What's your biggest pain point using ${productName}?
What's your favorite thing about ${productName}?
What features would you like us to add next?`}
        />
      </FormControl>
      <Button
        isDisabled={watch("rating") === 0}
        isLoading={formState.isSubmitting}
        type="submit"
        colorScheme="blue"
      >
        Submit Feedback
      </Button>
    </Flex>
  );
};

type Rating = 0 | 1 | 2 | 3 | 4 | 5;

interface StartRatingProps {
  rating: Rating;
  onRating: (rating: Rating) => void;
}

const StartRating: React.VFC<StartRatingProps> = ({ rating, onRating }) => {
  return (
    <ButtonGroup cursor="pointer" gap={0} size="md" variant="ghost">
      {([1, 2, 3, 4, 5] as Rating[]).map((index) => {
        return (
          <IconButton
            aria-label={`rate ${index + 1} star`}
            p={0}
            color="gold"
            key={`rating_${index}`}
            filter={`contrast(${rating >= index ? index * 0.1 + 0.5 : "0"})`}
            onMouseEnter={() => onRating(index)}
            icon={rating >= index ? <AiFillStar /> : <AiOutlineStar />}
          />
        );
      })}
    </ButtonGroup>
  );
};
