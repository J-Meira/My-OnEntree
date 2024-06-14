export interface IGetAllParams {
  limit: number;
  page: number;
  searchTerm: string | null;
  orderBy: string;
  id?: number;
}
