import type { NextPage } from "next";
import type { PageId } from "page-id";
import type { ReactElement, ReactNode } from "react";

export type ThirdwebNextPage = NextPage<any> & {
	getLayout?: (page: ReactElement, pageProps?: any) => ReactNode;
	pageId: PageId | ((pageProps: any) => PageId);
	fallback?: React.ReactNode;
};
