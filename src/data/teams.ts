export type TeamStatus = "planned" | "forming" | "active" | "completed";
export type TeamRoleStatus = "open" | "assigned";
export type TeamPartnerStatus =
  | "unconfirmed"
  | "in_validation"
  | "confirmed";
export type TeamSolutionStatus =
  | "not_started"
  | "in_progress"
  | "tested"
  | "handed_over";

export type TeamRoleName =
  | "Problem Facilitator"
  | "AI Workflow Builder"
  | "Quality & Ethics Reviewer"
  | "Documentation & Trainer";

export interface TeamRoleSlot {
  readonly role: TeamRoleName;
  readonly responsibility: string;
  readonly status: TeamRoleStatus;
  readonly memberName: string | null;
}

export interface CollaborationTeam {
  readonly id: string;
  readonly slot: number;
  readonly temporaryName: string;
  readonly name: string | null;
  readonly displayName: string;
  readonly status: TeamStatus;
  readonly statusLabel: string;
  readonly roles: readonly TeamRoleSlot[];
  readonly challengeId: string | null;
  readonly challengePartnerName: string | null;
  readonly challengePartnerStatus: TeamPartnerStatus;
  readonly challengePartnerStatusLabel: string;
  readonly solutionName: string | null;
  readonly solutionStatus: TeamSolutionStatus;
  readonly solutionStatusLabel: string;
}

const openTeamRoles: readonly TeamRoleSlot[] = [
  {
    role: "Problem Facilitator",
    responsibility:
      "Memfasilitasi pemahaman konteks usaha dan perumusan masalah.",
    status: "open",
    memberName: null,
  },
  {
    role: "AI Workflow Builder",
    responsibility:
      "Menyusun dan mencoba workflow atau prototype berbantuan AI.",
    status: "open",
    memberName: null,
  },
  {
    role: "Quality & Ethics Reviewer",
    responsibility:
      "Memeriksa relevansi, akurasi, privasi, dan batas penggunaan hasil.",
    status: "open",
    memberName: null,
  },
  {
    role: "Documentation & Trainer",
    responsibility:
      "Mendokumentasikan proses dan menyiapkan panduan penggunaan.",
    status: "open",
    memberName: null,
  },
];

function createPlannedTeam(slot: number): CollaborationTeam {
  const slotLabel = String(slot).padStart(2, "0");

  return {
    id: `team-${slotLabel}`,
    slot,
    temporaryName: `Tim ${slotLabel}`,
    name: null,
    displayName: `Tim ${slotLabel} — nama sementara`,
    status: "planned",
    statusLabel: "Dalam Perencanaan",
    roles: openTeamRoles.map((role) => ({ ...role })),
    challengeId: null,
    challengePartnerName: null,
    challengePartnerStatus: "unconfirmed",
    challengePartnerStatusLabel: "Challenge Partner Belum Dikonfirmasi",
    solutionName: null,
    solutionStatus: "not_started",
    solutionStatusLabel: "Solusi Belum Dimulai",
  };
}

export const teams = [
  createPlannedTeam(1),
  createPlannedTeam(2),
  createPlannedTeam(3),
  createPlannedTeam(4),
] as const satisfies readonly CollaborationTeam[];

export const teamSlots = teams;

export function getTeamById(id: string): CollaborationTeam | undefined {
  return teams.find((team) => team.id === id);
}

