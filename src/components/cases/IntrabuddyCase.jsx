import React from 'react';
import { CaseLayout } from '../case/CaseLayout.jsx';
import { Body } from '../case/Body.jsx';
import { ModuleSection } from '../case/ModuleSection.jsx';
import { ImpactCalculator } from '../case/ImpactCalculator.jsx';
import { KeyFactCards } from '../case/KeyFactCards.jsx';
import { FlowSteps } from '../case/FlowSteps.jsx';
import { SearchRace } from '../case/SearchRace.jsx';
import { TeamTree } from '../case/TeamTree.jsx';
import { ProblemStatement } from '../modules/ProblemStatement.jsx';
import { MetricsBlock } from '../modules/MetricsBlock.jsx';
import { INTRABUDDY_CASE } from '../../content/work/intrabuddy';

/** Intrabuddy (AI agent in the ING intranet) case study island (/work/intrabuddy). Mounted with client:load. */
export default function IntrabuddyCase() {
  return (
    <CaseLayout content={INTRABUDDY_CASE}>
      {(t, lang) => (
        <>
          <ProblemStatement moduleId="MOD.01" heading={t.problem.heading} highlight={t.problem.highlight}
            extra={<KeyFactCards facts={t.problem.facts} />}>
            <Body items={t.problem.body} />
          </ProblemStatement>

          <ModuleSection moduleId="MOD.02" label="WITHOUT ↔ WITH / SAME QUESTION" heading={t.race.heading} intro={<Body items={t.race.body} />}>
            <SearchRace data={t.race.ui} />
          </ModuleSection>

          <ProblemStatement moduleId="MOD.03" label="ROLE / TEAM" heading={t.role.heading}
            extra={<TeamTree team={t.role.team} />}>
            <Body items={t.role.body} />
          </ProblemStatement>

          <ProblemStatement moduleId="MOD.04" label="KEY DECISION" heading={t.decision.heading} highlight={t.decision.highlight}
            aside={<FlowSteps steps={t.decision.flow} aria={t.decision.flowAria} />}>
            <Body items={t.decision.body} />
          </ProblemStatement>

          <ProblemStatement moduleId="MOD.05" label="PILOT / BARCELONA" heading={t.pilot.heading}
            extra={<KeyFactCards facts={t.pilot.facts} />}>
            <Body items={t.pilot.body} />
          </ProblemStatement>

          <MetricsBlock moduleId="MOD.06" title={t.metricsTitle} heading={t.headings.metrics} source="REPORTED" metrics={t.metrics} note={t.metricsNote} dark fullBleed />

          <ProblemStatement moduleId="MOD.07" label="IMPACT" heading={t.impact.heading}
            extra={<KeyFactCards facts={t.impact.facts} />} />

          <ModuleSection moduleId="MOD.08" label="IMPACT MODEL / ESTIMATE" heading={t.calc.heading} intro={<Body items={t.calc.body} />}>
            <ImpactCalculator ui={t.calc.ui} lang={lang} />
          </ModuleSection>
        </>
      )}
    </CaseLayout>
  );
}
