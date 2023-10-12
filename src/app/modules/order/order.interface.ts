export type IOrderBookData = {
  bookId: string;
  quantity: number;
};

export type IOrderData = {
  userId: string;
  orderedBooks: IOrderBookData[];
}


export type IOrderFilterRequest = {
  search?: string;
  id?: string;
  status?: string;
}
