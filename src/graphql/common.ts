
import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLInputObjectType, GraphQLEnumType } from 'graphql';

export const ValueType = new GraphQLEnumType({
  name: 'ValueType',
  values: {
    STRING: { value: 'STRING' },
    NUMBER: { value: 'NUMBER' },
    ENTITY: { value: 'ENTITY' }
  }
});
