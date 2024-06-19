import { IContact, IEntity, ISchedule, IScheduleForm, IType } from '..';

export interface IEvent extends IEntity {
  id: number;
  name: string;
  type: IType;
  schedule: ISchedule;
  contact: IContact;
}

export interface IEventForm {
  name: string;
  typeId: number;
  schedule: IScheduleForm;
  contact: IContact;
}
