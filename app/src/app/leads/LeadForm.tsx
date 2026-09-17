"use client";

import { useActionState, useState } from "react";
import { saveLead, type SaveState } from "./actions";

export type LeadFormValue = {
  id: string;
  description: string;
  dateOpened: string;
  researcher: string;
  shortlistQuestion: string;
  supportingIdeaIds: string[];
  researchStatus: string;
  screenplayReadiness: string;
  sections: { heading: string; content: string }[];
};

export type SqOption = { id: string; heading: string; lead: string; supporting: string[]; territory: string; question: string; nextId: string };

const STATUSES = ["unverified", "in research", "verified", "on hold", "rejected"];

export default function LeadForm({
  initial,
  originalId,
  options,
  writable,
}: {
  initial: LeadFormValue;
  originalId?: string;
  options: SqOption[];
  writable: boolean;
}) {
  const [state, action, pending] = useActionState<SaveState, FormData>(saveLead, {});
  const [sq, setSq] = useState(initial.shortlistQuestion);
  const [id, setId] = useState(initial.id);
  const [supporting, setSupporting] = useState(initial.supportingIdeaIds.join(", "));
  const [status, setStatus] = useState(initial.researchStatus);
  const [readiness, setReadiness] = useState(initial.screenplayReadiness);
  const current = options.find((o) => o.id === sq);

  function chooseSq(next: string) {
    setSq(next);
    const o = options.find((x) => x.id === next);
    if (!o) return;
    if (!originalId) setId(o.nextId);
    setSupporting(o.supporting.join(", "));
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
        <label className="field">
          <span>Supporting idea IDs (comma separated; defaults to the question&apos;s supporting ideas)</span>
          <input name="supportingIdeaIds" value={supporting} onChange={(e) => setSupporting(e.target.value)} />
        </label>
        {current ? (
          <div className="small">
            <div className="muted">Lead idea {current.lead} · Territory {current.territory}</div>
            <p className="question" style={{ fontSize: "0.95rem", margin: "6px 0 0" }}>{current.question}</p>
          </div>
        ) : null}
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
        <span className="muted small">Saved to <code>content/05-story-leads/</code>. Sections 1, 20 and 22 are kept in sync with the fields above.</span>
      </div>
    </form>
  );
}
