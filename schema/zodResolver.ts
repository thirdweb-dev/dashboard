import type { zodResolver as zodResolverType } from "@hookform/resolvers/zod";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { zodResolver as _zodResolver } from "@hookform/resolvers/zod/dist/zod.js";

export const zodResolver: typeof zodResolverType = _zodResolver;
