import {
  challenges,
  type Challenge,
} from "@/data/challenges";

export type TeamStatus = "planned" | "forming" | "active" | "completed";
export type TeamRoleStatus = "open" | "assigned" | "not_published";
export type TeamPartnerStatus =
  | "unconfirmed"
  | "in_validation"
  | "confirmed";
export type TeamSolutionStatus =
  | "not_started"
  | "in_progress"
  | "functional"
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

const unpublishedTeamRoles: readonly TeamRoleSlot[] = [
  {
    role: "Problem Facilitator",
    responsibility:
      "Memfasilitasi pemahaman konteks usaha dan perumusan masalah.",
    status: "not_published",
    memberName: null,
  },
  {
    role: "AI Workflow Builder",
    responsibility:
      "Menyusun dan mencoba workflow atau prototype berbantuan AI.",
    status: "not_published",
    memberName: null,
  },
  {
    role: "Quality & Ethics Reviewer",
    responsibility:
      "Memeriksa relevansi, akurasi, privasi, dan batas penggunaan hasil.",
    status: "not_published",
    memberName: null,
  },
  {
    role: "Documentation & Trainer",
    responsibility:
      "Mendokumentasikan proses dan menyiapkan panduan penggunaan.",
    status: "not_published",
    memberName: null,
  },
];

function createActiveTeam(challenge: Challenge): CollaborationTeam {
  const { slot } = challenge;
  const slotLabel = String(slot).padStart(2, "0");

  return {
    id: `team-${slotLabel}`,
    slot,
    temporaryName: `Tim ${slotLabel}`,
    name: null,
    displayName: `Tim ${slotLabel} — ${challenge.partnerDisplayName}`,
    status: "completed",
    statusLabel: "Week 3 Completed · Monitoring Week 4",
    roles: unpublishedTeamRoles.map((role) => ({ ...role })),
    challengeId: challenge.id,
    challengePartnerName: challenge.partnerName,
    challengePartnerStatus: "confirmed",
    challengePartnerStatusLabel: "Challenge Partner Tervalidasi",
    solutionName: challenge.solution,
    solutionStatus: "functional",
    solutionStatusLabel: "Completed · Functional",
  };
}

export const teams: readonly CollaborationTeam[] =
  challenges.map(createActiveTeam);

export const teamSlots = teams;

export function getTeamById(id: string): CollaborationTeam | undefined {
  return teams.find((team) => team.id === id);
}
