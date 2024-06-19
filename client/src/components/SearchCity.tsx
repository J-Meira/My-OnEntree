import { ICity } from '../@types';
import { locationServices } from '../services';
import { ISearchGenericProps, SearchGeneric } from './SearchGeneric';

interface Props
  extends Omit<
    ISearchGenericProps<ICity, 'id'>,
    'label' | 'idKey' | 'searchKey' | 'defaultSelected' | 'getList'
  > {}

export const SearchCity = ({ ...rest }: Props) => {
  const getList = async (
    param?: string,
    id?: number,
  ): Promise<ICity[]> => {
    const result = await locationServices.getAllCities({
      limit: 10,
      page: 1,
      searchTerm: param || null,
      orderBy: 'name',
      id: id ? id : undefined,
    });
    return result ? result.records : [];
  };

  return (
    <SearchGeneric<ICity, 'id'>
      {...rest}
      label='Cidade'
      idKey='id'
      searchKey='name'
      defaultSelected={-1}
      getList={getList}
    />
  );
};
