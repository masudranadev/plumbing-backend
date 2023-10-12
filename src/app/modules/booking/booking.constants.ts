export const bookingFilterableFields = ['search', 'id', 'status'];

export const bookingSearchableFields = ['id', 'status'];

export const bookingRelationalFields: string[] = ['userId'];

export const bookingRelationalFieldsMapper: { [key: string]: string } = {
  userId: 'user',
};
