import useDelayedDisplay from "hooks/useDelayedDisplay";
import type { ComponentWithChildren } from "types/component-with-children";

interface DelayedDisplayProps {
	delay: number;
}

export const DelayedDisplay: ComponentWithChildren<DelayedDisplayProps> = ({
	delay,
	children,
}) => {
	const displayContent = useDelayedDisplay(delay);

	if (!displayContent) {
		return null;
	}

	return <>{children}</>;
};
