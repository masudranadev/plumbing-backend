export const orderFilterableFields = ['search', 'id', 'status'];

export const orderSearchableFields = ['id', 'status'];

export const orderRelationalFields: string[] = ['userId'];

export const orderRelationalFieldsMapper: { [key: string]: string } = {
  userId: 'user',
};
