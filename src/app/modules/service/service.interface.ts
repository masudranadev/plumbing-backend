export type IBookFilterRequest = {
    search?: string;
    title?: string;
    author?: string;
    genre?: string;
    publicationDate?: string;
    categoryId?: string;
    minPrice?: string;
    maxPrice?: string
}