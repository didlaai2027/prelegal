export interface NdaData {
  party1Name: string;
  party2Name: string;
  effectiveDate: string;
  governingState: string;
  durationYears: string;
  purpose: string;
}

export const EMPTY_NDA: NdaData = {
  party1Name: "",
  party2Name: "",
  effectiveDate: "",
  governingState: "",
  durationYears: "2",
  purpose: "",
};
