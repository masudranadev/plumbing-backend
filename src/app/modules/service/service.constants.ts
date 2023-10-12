export const serviceFilterableFields = [
  'search',
  'title',
  'minPrice',
  'maxPrice'
];

export const serviceSearchableFields = [
  'title',
];

export const serviceRelationalFields: string[] = ['category'];
export const serviceRelationalFieldsMapper: { [key: string]: string } = {
  category: 'category',
};
