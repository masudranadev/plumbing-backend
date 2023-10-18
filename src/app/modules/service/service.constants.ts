export const serviceFilterableFields = [
  'searchTerm',
  'minPrice',
  'maxPrice',
];

export const serviceSearchableFields = [
  'title',
  'description',
];

export const serviceRelationalFields: string[] = ['category'];
export const serviceRelationalFieldsMapper: { [key: string]: string } = {
  category: 'category',
};
