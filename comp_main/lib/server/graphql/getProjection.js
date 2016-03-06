// https://github.com/graphql/graphql-js/issues/96

/* Adapted for dynamodb */
export default function getProjection(context) {
  
  return (Array.isArray(context.fieldASTs) ? context.fieldASTs : [context.fieldASTs])
    .map(x => x.selectionSet.selections)
    .reduce((a, b) => a.concat(b), [])
    .map(({ kind, name }) => {
      switch (kind) {
        case 'Field' :
          return name.value;
          /* TO BE IMPLEMENTED */
          case 'InlineFragment':
            return;
          case 'FragmentSpread': // ! see issue
            return;
        default: 
          throw new Error('Unsuported query selection');
      }
    })
    .join(', ');
}
