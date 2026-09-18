"use client";

import { useActionState, useState } from "react";
import { saveLead, type SaveState } from "./actions";
import { REVIEW_FIELDS, REVIEW_KEYS, type Review } from "@/lib/lead-format";

export type LeadFormValue = {
  id: string;
  description: string;
  dateOpened: string;
  researcher: string;
  shortlistQuestion: string;
  leadIdeaId: string;
  supportingIdeaIds: string[];
  territory: string;
  review: Review;
  researchStatus: string;
  screenplayReadiness: string;
  sections: { heading: string; content: string }[];
};

export type SqOption = { id: string; heading: string; lead: string; supporting: string[]; territory: string; question: string; nextId: string };
export type PickOption = { id: string; label: string };

const STATUSES = ["unverified", "in research", "verified", "on hold", "rejected"];

export default function LeadForm({
  initial,
  originalId,
  options,
  ideas,
  territories,
  writable,
}: {
  initial: LeadFormValue;
  originalId?: string;
  options: SqOption[];
  ideas: PickOption[];
  territories: PickOption[];
  writable: boolean;
}) {
  const [state, action, pending] = useActionState<SaveState, FormData>(saveLead, {});
  const [sq, setSq] = useState(initial.shortlistQuestion);
  const [id, setId] = useState(initial.id);
  const [supporting, setSupporting] = useState(initial.supportingIdeaIds.join(", "));
  const [leadIdea, setLeadIdea] = useState(initial.leadIdeaId);
  const [territory, setTerritory] = useState(initial.territory);
  const [status, setStatus] = useState(initial.researchStatus);
  const [readiness, setReadiness] = useState(initial.screenplayReadiness);
  const current = options.find((o) => o.id === sq);

  function chooseSq(next: string) {
    setSq(next);
    const o = options.find((x) => x.id === next);
    if (!o || originalId) return; // an existing lead keeps its researched mapping
    setId(o.nextId);
    setLeadIdea(o.lead);
    setSupporting(o.supporting.join(", "));
    setTerritory(o.territory);
  }

  return (
    <form action={action} className="grid" style={{ gap: 14 }}>
      {!writable ? <div className="notice error">Read-only mode: saving is disabled.</div> : null}
      {state.error ? <div className="notice error">{state.error}</div> : null}
      <input type="hidden" name="originalId" value={originalId ?? ""} />

      <section className="card grid" style={{ gap: 12 }}>
        <div className="grid grid-3">
          <label className="field">
            <span>Shortlist question</span>
            <select name="shortlistQuestion" value={sq} onChange={(e) => chooseSq(e.target.value)} required>
              <option value="">Choose…</option>
              {options.map((o) => <option key={o.id} value={o.id}>{o.id} — {o.heading}</option>)}
            </select>
          </label>
          <label className="field">
            <span>Lead ID</span>
            <input name="id" value={id} onChange={(e) => setId(e.target.value.toUpperCase())} placeholder="SL-SQ05-001" required pattern="SL-SQ\d{2}-\d{3}" />
          </label>
          <label className="field">
            <span>Date opened</span>
            <input name="dateOpened" type="date" defaultValue={initial.dateOpened} />
          </label>
        </div>
        <label className="field">
          <span>Short plain description (used in the file name; no names without consent)</span>
          <input name="description" defaultValue={initial.description} placeholder="e.g. Family decision about inherited land" required />
        </label>
        <div className="grid grid-3">
          <label className="field">
            <span>Researcher</span>
            <input name="researcher" defaultValue={initial.researcher} />
          </label>
          <label className="field">
            <span>Research status</span>
            <select name="researchStatus" value={status} onChange={(e) => { setStatus(e.target.value); if (e.target.value !== "verified") setReadiness("not ready"); }}>
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
          <label className="field">
            <span>Screenplay readiness</span>
            <select name="screenplayReadiness" value={readiness} onChange={(e) => setReadiness(e.target.value)}>
              <option>not ready</option>
              <option disabled={status !== "verified"}>ready for selection review</option>
            </select>
          </label>
        </div>
        <div className="grid grid-3">
          <label className="field">
            <span>Lead (primary) idea</span>
            <input name="leadIdeaId" value={leadIdea} onChange={(e) => setLeadIdea(e.target.value.toUpperCase().trim())} list="idea-options" placeholder="C006-I01" required pattern="C\d{3}-I\d{2}" />
          </label>
          <label className="field">
            <span>Human territory</span>
            <select name="territory" value={territory} onChange={(e) => setTerritory(e.target.value)} required>
              <option value="">Choose…</option>
              {territories.map((t) => <option key={t.id} value={t.id}>{t.id} — {t.label}</option>)}
            </select>
          </label>
          <label className="field">
            <span>Supporting idea IDs (comma separated)</span>
            <input name="supportingIdeaIds" value={supporting} onChange={(e) => setSupporting(e.target.value)} />
          </label>
        </div>
        <datalist id="idea-options">
          {ideas.map((i) => <option key={i.id} value={i.id}>{i.label}</option>)}
        </datalist>
        {current ? (
          <div className="small">
            <div className="muted">
              {originalId
                ? <>This lead keeps its own idea and territory mapping. The question&apos;s defaults (lead idea {current.lead}, territory {current.territory}) are shown for reference only.</>
                : <>Filled from the question&apos;s defaults: lead idea {current.lead}, territory {current.territory}. Change them if the research points elsewhere.</>}
            </div>
            <p className="question" style={{ fontSize: "0.95rem", margin: "6px 0 0" }}>{current.question}</p>
          </div>
        ) : null}
      </section>

      <section className="card grid" style={{ gap: 12 }}>
        <div className="kicker" style={{ margin: 0 }}>Evidence and access review</div>
        <p className="small muted" style={{ margin: 0 }}>
          Record each step only when it has actually happened. Nothing here is inferred from the text below, and filling a section does not change these values.
          Sources count as opened only when their section 18 note says <code>page opened and read</code>.
        </p>
        <div className="grid grid-3">
          {REVIEW_KEYS.map((k) => (
            <label className="field" key={k}>
              <span>{REVIEW_FIELDS[k].label}</span>
              <select name={k} defaultValue={initial.review[k]}>
                {REVIEW_FIELDS[k].values.map((v) => <option key={v}>{v}</option>)}
              </select>
            </label>
          ))}
        </div>
      </section>

      <input type="hidden" name="sectionCount" value={initial.sections.length} />
      {initial.sections.map((s, i) => (
        <details key={s.heading} className="section" open={i < 7}>
          <summary>{s.heading}</summary>
          <input type="hidden" name={`sectionHeading_${i}`} value={s.heading} />
          <textarea
            name={`sectionContent_${i}`}
            defaultValue={s.content}
            rows={Math.min(24, Math.max(4, s.content.split("\n").length + 2))}
            style={{ marginTop: 8 }}
          />
        </details>
      ))}

      <div className="row">
        <button type="submit" className="btn-primary" disabled={!writable || pending}>{pending ? "Saving…" : "Save lead as Markdown"}</button>
        <span className="muted small">Saved to <code>content/05-story-leads/</code>. Sections 1, 20 and 22 are kept in sync with the fields above; every other section is saved exactly as written.</span>
      </div>
    </form>
  );
}
