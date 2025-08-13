"use client";

import { useEffect, useState } from "react";
import { getDailyVerse } from "../lib/verses";

type SavedVerse = {
  text: string;
  reference: string;
  comment: string;
  savedAt: string;
};

export default function Home() {
  // -------- Verse of the Day (local rotation) --------
  const { text: todayText, reference: todayRef } = getDailyVerse();
  const [verseText] = useState<string>(todayText);
  const [verseRef] = useState<string>(todayRef);

  // -------- Save note state + feedback --------
  const [comment, setComment] = useState<string>("");
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  function saveCurrentVerse() {
    try {
      const STORAGE_KEY = "saved_verses";
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as SavedVerse[];

      const entry: SavedVerse = {
        text: verseText,
        reference: verseRef,
        comment,
        savedAt: new Date().toISOString(),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...existing]));
      setComment("");

      setSavedMsg("Saved ✓");
      setTimeout(() => setSavedMsg(null), 2500);
    } catch (e) {
      console.error("Save failed:", e);
      setSavedMsg("Could not save");
      setTimeout(() => setSavedMsg(null), 3000);
    }
  }

  // -------- AI Context Notes --------
  const [notes, setNotes] = useState<string>("");
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [notesError, setNotesError] = useState<string | null>(null);

  async function fetchContextNotes() {
    try {
      setLoadingNotes(true);
      setNotesError(null);

      const res = await fetch("/api/context-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verseText, verseRef }), // matches route.ts
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load notes");

      setNotes(json.context || json.notes || ""); // support either field name
    } catch (e: any) {
      setNotesError(e?.message ?? "Could not load notes");
    } finally {
      setLoadingNotes(false);
    }
  }

  // Auto-generate notes when the verse changes (on first load / each day)
  useEffect(() => {
    if (verseText && verseRef) fetchContextNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verseText, verseRef]);

  return (
    <main className="container">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <h1 className="h1">Verse of the Day</h1>
        <a href="/saved" className="button button--secondary">See saved verses →</a>
      </div>

      {/* Verse card */}
      <section className="card mb-8">
        <p className="verse">{verseText}</p>
        <p className="reference">{verseRef}</p>
      </section>

      {/* Context notes card */}
      <section className="card" style={{ marginBottom: "1.5rem" }}>
        <h2 className="controls-title">Context notes</h2>

        {loadingNotes && <div className="text-muted">Generating…</div>}

        {notesError && (
          <div
            className="notice"
            style={{ background: "#FEE2E2", color: "#991B1B", border: "1px solid #FCA5A5" }}
          >
            {notesError}
          </div>
        )}

        {!loadingNotes && !notesError && notes && (
          <p className="text-base leading-relaxed">{notes}</p>
        )}

        <button
          type="button"
          onClick={fetchContextNotes}
          className="button button--secondary"
          style={{ marginTop: ".75rem" }}
        >
          Refresh context
        </button>
      </section>

      {/* Save controls */}
      <section className="card">
        <h2 className="controls-title">Save this verse with an optional note</h2>

        <div className="controls-row">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a short personal note..."
            className="input"
          />

          <button
            type="button"
            onClick={saveCurrentVerse}
            className="button button--primary"
          >
            Save verse
          </button>

          <a href="/saved" className="button button--secondary">View saved</a>
        </div>

        {savedMsg && (
          <div className="notice notice--success" role="status" aria-live="polite">
            {savedMsg}
          </div>
        )}
      </section>
    </main>
  );
}



  








  
