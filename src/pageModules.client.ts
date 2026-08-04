import type { ComponentType } from "react";

export type PageModule = { default: ComponentType };

export const pageModules = import.meta.glob<PageModule>("./pages/*.tsx");
