export interface PremiereEntry {
  premiereId: string;
  title: string;
  approvedAt: string;
  amount: boolean;
}

export interface PremiereEntryResponse {
  message: string;
  data: {
    entry: PremiereEntry[];
  };
}

export interface PremieresResponse {
  message: string;
  data: {
      premieres: Premieres[];
  };
}

export interface Premieres {
  premiereId: number;
  title: string;
  thumbnail: string;
  startAt: string;
}

export interface PremieresDetailDataResponse {
  message: string;
  data: PremieresDetailData;
}

export interface PremieresDetailData {
  title: string;
  startAt: string;
  endAt: string;
  price: number;
  isPaymentRequired: boolean;
  eventImage: string;
  thumbnail: string;
}

export interface PaymentsFormData {
  amount: number;
  quantity: number;
}

export interface EntryFormData {
  orderId: string;
}

export interface PaymentsFormDataResponse {
  message: string;
  data: {
      orderId: string;
  };
}