import React from 'react';
import { CaseLayout } from '../case/CaseLayout.jsx';
import { Body } from '../case/Body.jsx';
import { HomeSchematic } from '../case/HomeSchematic.jsx';
import { PathSchematic } from '../case/PathSchematic.jsx';
import { ProblemStatement } from '../modules/ProblemStatement.jsx';
import { ProcessTimeline } from '../modules/ProcessTimeline.jsx';
import { BeforeAfter } from '../modules/BeforeAfter.jsx';
import { MetricsBlock } from '../modules/MetricsBlock.jsx';
import { ING_CASE } from '../../content/work/ing';

/** ING intranet case study island (/work/ing). Mounted with client:load. */
export default function IngCase() {
  return (
    <CaseLayout content={ING_CASE}>
      {(t) => (
        <>
          <ProblemStatement moduleId="MOD.01" heading={t.problem.heading} highlight={t.problem.highlight}>
            <Body items={t.problem.body} />
          </ProblemStatement>

          <ProblemStatement moduleId="MOD.02" label="ROLE / SCOPE" heading={t.role.heading} highlight={t.role.highlight}>
            <Body items={t.role.body} />
          </ProblemStatement>

          <ProcessTimeline moduleId="MOD.03" phases={t.phases} />

          <ProblemStatement moduleId="MOD.04" label="INFORMATION ARCHITECTURE" heading={t.ia.heading}>
            <Body items={t.ia.body} />
          </ProblemStatement>

          <BeforeAfter moduleId="MOD.05" beforeLabel="BEFORE / NAV PATH" afterLabel="AFTER / NAV PATH"
            beforeContent={<PathSchematic steps={t.path.before} clicksLabel={t.path.clicks} aria={t.path.ariaBefore} />}
            afterContent={<PathSchematic steps={t.path.after} clicksLabel={t.path.clicks} aria={t.path.ariaAfter} after />}
            beforeNote={t.path.beforeNote} afterNote={t.path.afterNote} />

          <BeforeAfter moduleId="MOD.06" beforeLabel="BEFORE / HOME SP 2016" afterLabel="AFTER / HOME SP ONLINE"
            beforeContent={<HomeSchematic variant="before" labels={t.home.before} />}
            afterContent={<HomeSchematic variant="after" labels={t.home.after} />}
            beforeNote={t.home.beforeNote} afterNote={t.home.afterNote} />
          <p style={{ margin: '0 0 8px', font: 'var(--text-caption)', color: 'var(--ink-400)' }}>{t.schematicNote}</p>

          <ProblemStatement moduleId="MOD.07" label="DESIGN DECISIONS" heading={t.decisions.heading}>
            <Body items={t.decisions.body} />
          </ProblemStatement>

          <MetricsBlock moduleId="MOD.08" title={t.metricsTitle} source="REPORTED" metrics={t.metrics} note={t.metricsNote} />
          <p style={{ margin: '8px 0 0', font: 'var(--text-body)', color: 'var(--ink-600)', maxWidth: 'var(--reading-max)' }}>{t.aftermath}</p>
        </>
      )}
    </CaseLayout>
  );
}
