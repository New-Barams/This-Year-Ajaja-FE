export type RemindOptionObjectType = {
  value: number;
  name: string;
};

export type RemindOptionType = {
  TotalPeriod: number;
  Term: number;
  Date: number;
  Time: number;
};

export interface RemindItemType {
  date: {
    month: number;
    day: number;
  };
  message: string;
}

export interface ReadOnlyRemindItemData {
  feedbackId: number;
  remindMessage: string;
  remindMonth: number;
  remindDate: number;
  rate: number;
  isFeedback: boolean;
  isExpired: boolean;
  isReminded: boolean;
  endMonth: number;
  endDate: number;
}

export interface ReadOnlyRemindData {
  isRemindable: boolean;
  remindTime: number;
  remindDate: number;
  remindTerm: number;
  remindTotalPeriod: number;
  remindMessageList: ReadOnlyRemindItemData[];
}
