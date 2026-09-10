import type { FamilyCompatibilityV2 } from './belief-v2-engine';
import type { PolygonPointV2 } from './belief-v2';

const familyMeaning: Record<string, string> = {
  liberalism: 'liberty, personal autonomy and limits on concentrated power',
  conservatism: 'continuity, order, private ownership and cautious social change',
  'social-democracy': 'social protection, redistribution and pluralist democratic institutions',
  socialism: 'social ownership and a stronger challenge to private control of production',
  'green-politics': 'ecological limits, sustainability, pluralism and cooperative politics',
};

export function familyMeaningText(familyId: string) {
  return familyMeaning[familyId] ?? 'the core ideas of that tradition';
}

export type PolitangleHome = {
  headline: string;
  summary: string;
  primary: FamilyCompatibilityV2 | null;
  secondary: FamilyCompatibilityV2 | null;
  tertiary: FamilyCompatibilityV2 | null;
  strongestAxes: PolygonPointV2[];
};

function scoreText(family: FamilyCompatibilityV2 | null) {
  return family?.overall === null || family?.overall === undefined ? null : `${family.name} ${family.overall}/100`;
}

export function describePolitangleHome(
  families: readonly FamilyCompatibilityV2[],
  axes: readonly PolygonPointV2[],
  complete: boolean,
): PolitangleHome {
  const known = families.filter((family) => family.overall !== null);
  const primary = known[0] ?? null;
  const secondary = known[1] ?? null;
  const tertiary = known[2] ?? null;
  const primaryScore = primary?.overall ?? null;
  const secondaryScore = secondary?.overall ?? null;
  const gap = primaryScore === null || secondaryScore === null ? null : primaryScore - secondaryScore;

  let headline = complete ? 'Your political home is still mixed.' : 'Your preliminary political home is still mixed.';
  if (primary && primaryScore !== null) {
    if (secondary && secondaryScore !== null && primaryScore >= 55 && secondaryScore >= 55 && gap !== null && gap <= 4) {
      headline = `You sit between ${primary.name} and ${secondary.name}.`;
    } else if (secondary && secondaryScore !== null && primaryScore >= 55 && secondaryScore >= 50) {
      headline = `You are mainly ${primary.name}, with significant ${secondary.name} leanings.`;
    } else if (primaryScore >= 55) {
      headline = `You are mainly ${primary.name}.`;
    } else {
      headline = 'No single political family dominates your answers.';
    }
  }

  const parts: string[] = [];
  if (primary) parts.push(`Your strongest family match is ${scoreText(primary)}, reflecting ${familyMeaningText(primary.id)}.`);
  if (secondary && secondary.overall !== null && (primary?.overall === null || primary?.overall === undefined || secondary.overall >= 45)) {
    parts.push(`${secondary.name} also matters at ${secondary.overall}/100, so a one-word label would leave out a meaningful part of your profile.`);
  }
  if (tertiary && tertiary.overall !== null && tertiary.overall >= 60) {
    parts.push(`${tertiary.name} is another clear influence at ${tertiary.overall}/100.`);
  }
  if (!complete) parts.push('Quick is a first reading; Full checks the same political themes from additional THINK, FEEL and ACT angles.');

  const strongestAxes = [...axes]
    .filter((axis) => axis.score !== null)
    .sort((a, b) => Math.abs((b.score ?? 50) - 50) - Math.abs((a.score ?? 50) - 50))
    .slice(0, 3);

  return {
    headline,
    summary: parts.join(' '),
    primary,
    secondary,
    tertiary,
    strongestAxes,
  };
}
