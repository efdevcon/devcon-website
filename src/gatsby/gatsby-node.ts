import { GatsbyNode } from 'gatsby';
import { onCreateNode as onCreateNodePlugin } from './onCreateNode';
import { createPages as createPagesPlugin } from './createPages';

export const onCreateNode: GatsbyNode["onCreateNode"] = onCreateNodePlugin;
export const createPages: GatsbyNode["createPages"] = createPagesPlugin