import React from 'react';
import { CaseLayout } from '../case/CaseLayout.jsx';
import { Body } from '../case/Body.jsx';
import { ModuleSection } from '../case/ModuleSection.jsx';
import { KeyFactCards } from '../case/KeyFactCards.jsx';
import { StickerBadges } from '../case/StickerBadges.jsx';
import { PiecesGallery } from '../case/PiecesGallery.jsx';
import { ProblemStatement } from '../modules/ProblemStatement.jsx';
import { ProcessTimeline } from '../modules/ProcessTimeline.jsx';
import { DIGISFERA_CASE } from '../../content/work/digisfera';

/** Digisfera brand case study island (/work/digisfera). Mounted with client:load. */
export default function DigisferaCase() {
  return (
    <CaseLayout content={DIGISFERA_CASE}>
      {(t) => (
        <>
          <ProblemStatement moduleId="MOD.01" label="CONTEXT / BRIEF" heading={t.context.heading}
            extra={<KeyFactCards facts={t.context.facts} />}>
            <Body items={t.context.body} />
          </ProblemStatement>

          <ProcessTimeline moduleId="MOD.02" heading={t.headings.process} phases={t.phases} />

          <ModuleSection moduleId="MOD.03" label="BADGES / 3 LEVELS × 2 SETS" heading={t.badges.heading} intro={<Body items={t.badges.body} />}>
            <StickerBadges rows={t.badges.rows} levels={t.badges.levels} src={DIGISFERA_CASE.badgeSrc} alt={t.badges.alt} />
          </ModuleSection>

          <ModuleSection moduleId="MOD.04" label="PIECES / PRINT + INTRANET" heading={t.pieces.heading} intro={<Body items={t.pieces.body} />}>
            <PiecesGallery items={t.pieces.items} />
          </ModuleSection>

          <ProblemStatement moduleId="MOD.05" label="FIELD GUIDE" heading={t.keys.heading}>
            <Body items={t.keys.body} />
          </ProblemStatement>

          <ProblemStatement moduleId="MOD.06" label="IMPACT" heading={t.impact.heading}
            extra={<KeyFactCards facts={t.impact.facts} />} />
        </>
      )}
    </CaseLayout>
  );
}
