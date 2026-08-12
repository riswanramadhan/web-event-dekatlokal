import {
  umkmStakeholders,
  type UmkmStakeholder,
} from "@/data/problem-validation";

export type ChallengeStatus =
  | "validation"
  | "confirmed"
  | "in_progress"
  | "completed";

export type ChallengeAssignmentStatus = "example" | "assigned";
export type ChallengeSolutionStatus =
  | "not_started"
  | "in_progress"
  | "tested"
  | "handed_over";

export interface Challenge {
  readonly id: string;
  readonly slot: number;
  readonly title: string;
  readonly description: string;
  readonly status: ChallengeStatus;
  readonly statusLabel: string;
  readonly assignmentStatus: ChallengeAssignmentStatus;
  readonly assignmentLabel: string;
  readonly partnerName: string | null;
  readonly partnerDisplayName: string;
  readonly problemIndicators: readonly string[];
  readonly possibleOutputs: readonly string[];
  readonly solutionStatus: ChallengeSolutionStatus;
  readonly solutionStatusLabel: string;
  readonly solution: string | null;
}

function getPossibleOutputs(
  stakeholder: UmkmStakeholder,
): readonly string[] {
  return [
    stakeholder.priorityNeed,
    ...(stakeholder.additionalOpportunity
      ? [stakeholder.additionalOpportunity]
      : []),
    ...(stakeholder.solutionHypothesis
      ? [stakeholder.solutionHypothesis]
      : []),
  ];
}

export const challenges: readonly Challenge[] = umkmStakeholders.map(
  (stakeholder, index) => {
    const slot = index + 1;
    const slotLabel = String(slot).padStart(2, "0");

    return {
      id: `challenge-${slotLabel}-${stakeholder.id}`,
      slot,
      title: `Kebutuhan operasional ${stakeholder.businessName}`,
      description:
        "Area challenge ini diturunkan dari problem validation. Detail output, hasil testing, dan solusi final tetap menunggu konsolidasi evidence pelaksanaan.",
      status: "in_progress",
      statusLabel: "Masalah Tervalidasi · Follow-Up Berjalan",
      assignmentStatus: "assigned",
      assignmentLabel: "Dipetakan ke co-creation team",
      partnerName: stakeholder.businessName,
      partnerDisplayName: stakeholder.businessName,
      problemIndicators: [
        stakeholder.currentWorkflow,
        stakeholder.painPoint,
        stakeholder.keyInsight,
      ],
      possibleOutputs: getPossibleOutputs(stakeholder),
      solutionStatus: "in_progress",
      solutionStatusLabel: "Output dan Testing Sedang Dikonsolidasikan",
      solution: null,
    };
  },
);

export const challengeSlots = challenges;

export function getChallengeById(id: string): Challenge | undefined {
  return challenges.find((challenge) => challenge.id === id);
}
