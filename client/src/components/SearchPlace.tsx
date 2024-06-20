import { IPlace } from '../@types';
import { placeServices } from '../services';
import { ISearchGenericProps, SearchGeneric } from './SearchGeneric';

interface Props
  extends Omit<
    ISearchGenericProps<IPlace, 'id'>,
    'label' | 'idKey' | 'searchKey' | 'defaultSelected' | 'getList'
  > {}

export const SearchPlace = ({ ...rest }: Props) => {
  const getList = async (
    param?: string,
    id?: number,
  ): Promise<IPlace[]> => {
    const result = await placeServices.getAll({
      limit: 10,
      page: 1,
      searchTerm: param || null,
      orderBy: 'name',
      id: id ? id : undefined,
    });
    return result ? result.records : [];
  };

  return (
    <SearchGeneric<IPlace, 'id'>
      {...rest}
      label='Local'
      idKey='id'
      searchKey='name'
      defaultSelected={-1}
      getList={getList}
    />
  );
};
