import { distinctVideoTagsResolver } from './create-schema-customization/resolvers/archive'

export const createResolvers = ({ cache, createNodeId, createResolvers, store, reporter }) => {
  const resolvers = {
    Query: {
      distinctVideoTags: distinctVideoTagsResolver,
    },
  }

  createResolvers(resolvers)
}
