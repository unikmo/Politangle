'use client';

import type { DeepBeliefResult } from '../../lib/deep-engine';
import type { QuickResult } from '../../lib/engine';
import {
  assessConservativeSubtype,
  assessPoliticalTendencies,
  assessPrimaryFamilies,
  compatibilityAnchors,
  populismGovernanceQualifier,
  primaryFamilies,
} from '../../lib/primary-families';

type Props = {
  quick: QuickResult;
  deep: DeepBeliefResult;
};

export default function PrimaryFamiliesTable({ quick, deep }: Props) {
  const input = { quick, deep };
  const matches = assessPrimaryFamilies(input);
  const tendencies = assessPoliticalTendencies(input);
  const conservativeSubtype = assessConservativeSubtype(input);

  return (
    <section className="engine-card primary-family-section">
      <p className="engine-kicker">2 · Main political families</p>
      <h2>Your closest broad political families</h2>
      <p className="engine-help">
        The match score is a Politangle compatibility index, not a probability and not a claim that “you are” an ideology.
        The five headline rows are broad political families. Cross-cutting tendencies such as nationalism and populism are reported separately below.
      </p>

      <div className="engine-table-wrap">
        <table className="engine-table primary-match-table">
          <thead>
            <tr>
              <th>Match</th>
              <th>Political family</th>
              <th>Interpretation</th>
              <th>Evidence coverage</th>
              <th>Core idea</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((item) => (
              <tr key={item.id}>
                <td><strong>{item.score === null ? '—' : item.score}</strong></td>
                <td><strong>{item.name}</strong></td>
                <td>{item.bandLabel}</td>
                <td>{item.coverage}%</td>
                <td>{item.coreIdea}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {conservativeSubtype && (
        <div className="engine-callout">
          <strong>Conservative subtype: {conservativeSubtype.name}.</strong> {conservativeSubtype.explanation}
        </div>
      )}

      <details className="engine-details">
        <summary>How to read the 0–100 family match index</summary>
        <div className="engine-table-wrap">
          <table className="engine-table compact">
            <thead><tr><th>Range</th><th>Meaning</th></tr></thead>
            <tbody>
              {compatibilityAnchors.map((anchor) => (
                <tr key={anchor.label}><td>{anchor.min}–{anchor.max}</td><td><strong>{anchor.label}.</strong> {anchor.meaning}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <h2 className="primary-family-subhead">Your important political tendencies</h2>
      <p className="engine-help">
        These do not compete with the five main families. A person can, for example, be conservative and non-populist, social-democratic and populist, or nationalist while remaining strongly committed to democratic constraints.
      </p>

      <div className="engine-table-wrap">
        <table className="engine-table tendencies-table">
          <thead>
            <tr>
              <th>Tendency</th>
              <th>Score</th>
              <th>Interpretation</th>
              <th>Evidence coverage</th>
              <th>What it means</th>
            </tr>
          </thead>
          <tbody>
            {tendencies.map((item) => (
              <tr key={item.id}>
                <td><strong>{item.name}</strong><div className="engine-cell-note">{item.lowPole} ↔ {item.highPole}</div></td>
                <td><strong>{item.score === null ? '—' : item.score}</strong></td>
                <td>{item.label}</td>
                <td>{item.coverage}%</td>
                <td>{item.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="primary-family-subhead">What the main political families generally mean</h2>
      <p className="engine-help">
        These are broad families, not rigid boxes. “Varies” is intentional where recognized research does not support treating one policy as defining the whole family.
      </p>

      <div className="engine-table-wrap">
        <table className="engine-table characteristics-table">
          <thead>
            <tr>
              <th>Political family</th>
              <th>Important subtypes</th>
              <th>Economy</th>
              <th>Society</th>
              <th>State power</th>
              <th>Citizenship at birth</th>
              <th>Abortion</th>
              <th>World / sovereignty</th>
            </tr>
          </thead>
          <tbody>
            {primaryFamilies.map((family) => (
              <tr key={family.id}>
                <td><strong>{family.name}</strong><div className="engine-cell-note">{family.coreIdea}</div></td>
                <td>{family.importantSubtypes}</td>
                <td>{family.economy}</td>
                <td>{family.society}</td>
                <td>{family.statePower}</td>
                <td>{family.citizenshipAtBirth}</td>
                <td>{family.abortion}</td>
                <td>{family.world}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="engine-callout">
        <strong>Populism and authoritarianism:</strong> {populismGovernanceQualifier(deep)}
      </div>
    </section>
  );
}
