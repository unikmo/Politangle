import type { BeliefAnswersV2, BeliefConstruct, FamilyId } from './belief-v2';
import {
  assessConservativeSubtypeV2,
  assessFamiliesV2Canonical,
  calculateConstructModesV2,
  type ConstructModeResultV2,
} from './belief-v2-engine';

export type NuanceIdV2 =
  | 'democratic-socialist-tendency'
  | 'traditional-secular-conservatism'
  | 'christian-democracy'
  | 'religious-conservatism'
  | 'far-right-radical-right-pattern';

export type NuanceKindV2 = 'subtype' | 'edge-pattern';
export type NuanceStrengthV2 = 'emerging' | 'clear';

export type NuanceResultV2 = {
  id: NuanceIdV2;
  name: string;
  anchorFamily: FamilyId;
  kind: NuanceKindV2;
  strength: NuanceStrengthV2;
  explanation: string;
  evidenceIds: readonly string[];
  caution?: string;
};

function constructResult(
  results: readonly ConstructModeResultV2[],
  construct: BeliefConstruct,
) {
  return results.find((item) => item.construct === construct);
}

function completeTriplet(result: ConstructModeResultV2 | undefined) {
  return Boolean(
    result
    && result.think !== null
    && result.feel !== null
    && result.act !== null
    && result.overall !== null,
  );
}

function allAtOrBelow(result: ConstructModeResultV2 | undefined, threshold: number) {
  return Boolean(
    completeTriplet(result)
    && result!.think! <= threshold
    && result!.feel! <= threshold
    && result!.act! <= threshold,
  );
}

function allAtOrAbove(result: ConstructModeResultV2 | undefined, threshold: number) {
  return Boolean(
    completeTriplet(result)
    && result!.think! >= threshold
    && result!.feel! >= threshold
    && result!.act! >= threshold,
  );
}

/**
 * Conditional nuance layer.
 *
 * This layer never replaces or expands the five headline political families.
 * A nuance is returned only when the respondent's measured pattern supplies
 * dedicated supporting evidence. The family anchor is for orientation in the
 * result arc, not a claim that the nuance is identical to the anchor family.
 *
 * Thresholds are conservative content-validation priors. They require
 * respondent calibration before psychometric or diagnostic claims.
 */
export function assessNuancesV2(answers: BeliefAnswersV2): NuanceResultV2[] {
  const families = assessFamiliesV2Canonical(answers);
  const constructModes = calculateConstructModesV2(answers);
  const nuances: NuanceResultV2[] = [];

  const socialism = families.find((family) => family.id === 'socialism');
  const ownership = constructResult(constructModes, 'ownership');
  const pluralism = constructResult(constructModes, 'pluralism');
  const authority = constructResult(constructModes, 'authority-order');

  // Democratic socialism is a nuance inside the broad socialist side of the
  // model, not a sixth headline family. It requires both a meaningful socialist
  // family match and separately measured support for democratic/pluralist
  // constraints. Collective ownership by itself is not enough.
  if (
    socialism?.overall !== null
    && socialism.overall >= 60
    && completeTriplet(ownership)
    && completeTriplet(pluralism)
    && completeTriplet(authority)
    && ownership!.overall! <= 40
    && pluralism!.overall! <= 40
    && authority!.overall! <= 60
  ) {
    const clear = socialism.overall >= 75
      && allAtOrBelow(ownership, 25)
      && allAtOrBelow(pluralism, 25)
      && allAtOrBelow(authority, 40);

    nuances.push({
      id: 'democratic-socialist-tendency',
      name: 'Democratic-socialist tendency',
      anchorFamily: 'socialism',
      kind: 'subtype',
      strength: clear ? 'clear' : 'emerging',
      explanation: 'Your answers combine a strong preference for greater social, public, cooperative or worker control of productive assets with support for pluralist democratic constraints and limits on concentrated state power.',
      evidenceIds: ['SEP-SOCIALISM', 'VDEM-LIBERAL-DEMOCRACY'],
      caution: 'This is a conditional nuance within the broad Socialist family, not an additional headline ideology score or an identity assignment.',
    });
  }

  // Existing conservative subtype logic is folded into the same conditional
  // nuance layer. Nothing is shown when its dedicated discriminators are
  // incomplete or the conservative family signal is too weak.
  const conservativeSubtype = assessConservativeSubtypeV2(answers);
  if (conservativeSubtype) {
    const evidenceIds = conservativeSubtype.id === 'christian-democracy'
      ? ['SEP-CONSERVATISM', 'CAMBRIDGE-CHRISTIAN-DEMOCRACY', 'CAMBRIDGE-CD-SUBSIDIARITY', 'CAMBRIDGE-CD-RELIGIOUS-INSPIRATION', 'VDEM-LIBERAL-DEMOCRACY']
      : ['SEP-CONSERVATISM', 'CAMBRIDGE-CD-RELIGIOUS-INSPIRATION'];

    nuances.push({
      id: conservativeSubtype.id,
      name: conservativeSubtype.name,
      anchorFamily: 'conservatism',
      kind: 'subtype',
      strength: 'clear',
      explanation: conservativeSubtype.explanation,
      evidenceIds,
      caution: 'Shown only as a conservative-side nuance because the dedicated subtype discriminators are sufficiently complete.',
    });
  }

  const nationhood = constructResult(constructModes, 'nationhood-membership');
  const populism = constructResult(constructModes, 'populism');

  // A far-right signal is intentionally guarded and separate from ordinary
  // conservatism. The comparative radical-right pattern requires the combined
  // presence of nation-centered/exclusionary membership, authoritarian order
  // and populism. The present nationhood-membership construct is a screening
  // proxy rather than a fully validated nativism scale, so the output is framed
  // as a pattern signal and not as an identity or extremist classification.
  if (
    allAtOrAbove(nationhood, 65)
    && allAtOrAbove(authority, 65)
    && allAtOrAbove(populism, 65)
  ) {
    const clear = allAtOrAbove(nationhood, 75)
      && allAtOrAbove(authority, 75)
      && allAtOrAbove(populism, 75)
      && completeTriplet(pluralism)
      && pluralism!.overall! >= 60;

    nuances.push({
      id: 'far-right-radical-right-pattern',
      name: 'Far-right tendency (radical-right pattern)',
      anchorFamily: 'conservatism',
      kind: 'edge-pattern',
      strength: clear ? 'clear' : 'emerging',
      explanation: 'Your answers combine a strongly nation-centered membership orientation, stronger authoritarian-order preferences and a people-versus-elite populist orientation. Comparative research treats that combination as characteristic of the populist radical right.',
      evidenceIds: ['MUDDE-RADICAL-RIGHT', 'MUDDE-POPULISM', 'PIRRO-FAR-RIGHT'],
      caution: 'Positioned on the conservative side for orientation only. It is not ordinary conservatism, is not equivalent to fascism or the extreme right, and should not be used as a party, extremist or personal-identity label.',
    });
  }

  return nuances;
}
