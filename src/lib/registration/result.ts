export type RegistrationType = "student" | "umkm";

export type RegistrationActionStatus =
  | "idle"
  | "success"
  | "validation_error"
  | "duplicate"
  | "unavailable"
  | "error";

export type RegistrationActionState = {
  status: RegistrationActionStatus;
  message: string;
  fieldErrors?: Record<string, string[]>;
  formErrors?: string[];
  submissionCode?: string;
  registrationType?: RegistrationType;
};

export const initialRegistrationActionState: RegistrationActionState = {
  status: "idle",
  message: "",
};
