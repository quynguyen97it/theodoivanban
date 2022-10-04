export interface IncomingOfficialDispatch {
  DocumentID: number;
  LevelDispatch: string;
  locality: string;
  IncomingTextNumberNotation: string;
  ReleaseDate: Date;
  TextExcerpt: string;
  AgencyIssued: string;
  DateOfReceiptOfDispatch: Date;
  summary: string;
  ExpirationDate: Date;
  ExecutionStatus: number;
  CausesSolutions: string;
  ImplementationDate: Date;
  CompletionDate: Date;
  note: string;
  nameF1: string;
  pathF1: string;
  nameF2: string;
  pathF2: string;
  nameF3: string;
  pathF3: string;
  nameF4: string;
  pathF4: string;
  nameF5: string;
  pathF5: string;
  updated_at: Date;
}
