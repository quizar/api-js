
import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLInputObjectType, GraphQLEnumType } from 'graphql';
import { _ } from '../utils';


export const ValueType = new GraphQLEnumType({
  name: 'ValueType',
  values: {
    STRING: { value: 'STRING' },
    NUMBER: { value: 'NUMBER' },
    ENTITY: { value: 'ENTITY' }
  }
});

export const QuizTargetType = new GraphQLEnumType({
  name: 'QuizTargetType',
  values: {
    PVALUE: { value: 'PVALUE' },
    QVALUE: { value: 'QVALUE' }
  }
});

export const WikiEntityType = new GraphQLEnumType({
  name: 'WikiEntityType',
  values: {
    PERSON: { value: 'PERSON' },
    PRODUCT: { value: 'PRODUCT' },
    ORG: { value: 'ORG' },
    PLACE: { value: 'PLACE' },
    EVENT: { value: 'EVENT' }
  }
});

export function getSelectFields(selectionSet: { selections: {}[] }, required?: string[]): string[] {
  return null;
  // console.log(JSON.stringify(selectionSet.selections));
  // const fields = _.uniq(formatSelectFields(selectionSet).concat(required || []));
  // return fields.join(' ');
}

function formatSelectFields(selectionSet): string[] {
  let result = [];
  selectionSet.selections.forEach(item => {
    if (item.selectionSet) {
      result = result.concat(formatSelectFields(item.selectionSet).map(name => item.name.value + '.' + name));
    } else {
      result.push(item.name.value);
    }
  });

  return result;
}
