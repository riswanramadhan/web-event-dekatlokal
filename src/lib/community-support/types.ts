import type { CommunitySupportDestinationBank } from "./constants";

export type CommunitySupportSubmissionSuccess = {
  submission_code: string;
  amount: number;
  destination_bank: CommunitySupportDestinationBank;
};

export type CommunitySupportApiError = {
  error: string;
  field_errors?: Record<string, string[]>;
  reference?: string;
};

export type CommunitySupporterSummary = {
  name: string;
  amount: number;
};

export type CommunitySupportSocialProof = {
  latest_supporters: CommunitySupporterSummary[];
};
