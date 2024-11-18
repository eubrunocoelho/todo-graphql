import { join } from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

const allResolvers = loadFilesSync(join(__dirname, 'modules', '**', 'resolvers.ts'));
const allTypes = loadFilesSync(join(__dirname, 'modules', '**', '*.gql'));

const resolvers = mergeResolvers(allResolvers);
const typeDefs = mergeTypeDefs(allTypes);

export { resolvers, typeDefs };
