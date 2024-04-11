import type { FC, PropsWithChildren } from "react";

export type ComponentWithChildren<P extends {} = object> = FC<
	PropsWithChildren<P>
>;
