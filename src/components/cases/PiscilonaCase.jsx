import React from 'react';
import { CaseLayout } from '../case/CaseLayout.jsx';
import { Body } from '../case/Body.jsx';
import { ModuleSection } from '../case/ModuleSection.jsx';
import { UsabilityTable } from '../case/UsabilityTable.jsx';
import { SheetFormMap } from '../case/SheetFormMap.jsx';
import { BudgetSimulator } from '../case/BudgetSimulator.jsx';
import { TimeCompare } from '../case/TimeCompare.jsx';
import { KeyFactCards } from '../case/KeyFactCards.jsx';
import { FlowSteps } from '../case/FlowSteps.jsx';
import { ProblemStatement } from '../modules/ProblemStatement.jsx';
import { ProcessTimeline } from '../modules/ProcessTimeline.jsx';
import { MetricsBlock } from '../modules/MetricsBlock.jsx';
import { PISCILONA_CASE } from '../../content/work/piscilona';

/** Piscilona automatic-budgeting case study island (/work/automatic-budgeting-piscilona-sl). Mounted with client:load. */
export default function PiscilonaCase() {
  return (
    <CaseLayout content={PISCILONA_CASE}>
      {(t, lang) => (
        <>
          <ProblemStatement moduleId="MOD.01" heading={t.problem.heading} highlight={t.problem.highlight}
            extra={<KeyFactCards facts={t.problem.facts} />}>
            <Body items={t.problem.body} />
          </ProblemStatement>

          <ProblemStatement moduleId="MOD.02" label="ROLE / SCOPE" heading={t.role.heading}>
            <Body items={t.role.body} />
          </ProblemStatement>

          <ProcessTimeline moduleId="MOD.03" phases={t.phases} />

          <ProblemStatement moduleId="MOD.04" label="KEY DECISION" heading={t.decision.heading} highlight={t.decision.highlight}
            aside={<FlowSteps steps={t.decision.flow} handoff={t.decision.flowHandoff} aria={t.decision.flowAria} />}>
            <Body items={t.decision.body} />
          </ProblemStatement>

          <ModuleSection moduleId="MOD.05" label="SHEET ↔ FORM / LINKED FIELDS" heading={t.sheet.heading} intro={<Body items={t.sheet.body} />}>
            <SheetFormMap data={t.sheetForm} />
          </ModuleSection>

          <ModuleSection moduleId="MOD.06" label="LIVE DEMO / FICTITIOUS RATES" heading={t.demo.heading} intro={<Body items={t.demo.body} />}>
            <BudgetSimulator ui={t.demo.ui} lang={lang} />
          </ModuleSection>

          <ModuleSection moduleId="MOD.07" label="USABILITY TEST / N=4" heading={t.test.heading} intro={<Body items={t.test.body} />}>
            <UsabilityTable cols={t.test.cols} rows={t.test.rows} />
          </ModuleSection>

          <ModuleSection moduleId="MOD.08" label="TIME PER QUOTE / BEFORE-AFTER">
            <TimeCompare data={t.time} />
          </ModuleSection>

          <MetricsBlock moduleId="MOD.09" title={t.metricsTitle} source="REPORTED" metrics={t.metrics} note={t.metricsNote} style={{ borderTop: 'none', paddingTop: 0 }} />

          <ProblemStatement moduleId="MOD.10" label="IMPACT" heading={t.impact.heading}
            extra={<KeyFactCards facts={t.impact.facts} />} />
        </>
      )}
    </CaseLayout>
  );
}
