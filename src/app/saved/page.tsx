// src/app/saved/page.tsx
"use client";
import { useEffect, useState } from "react";

type SavedVerse = {
  text: string;
  reference: string;
  comment: string;
  savedAt: string;
};

const STORAGE_KEY = "saved_verses";

export default function Saved() {
  const [items, setItems] = useState<SavedVerse[]>([]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
  }, []);

  // ✅ Deletes exactly one item, by its index
  function removeAt(index: number) {
    setItems(prev => {
      const next = [...prev];
      next.splice(index, 1);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Saved verses</h1>

      {items.length === 0 ? (
        <p className="text-muted">No verses saved yet.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((v, i) => (
            <li key={`${v.savedAt}-${i}`} className="card rounded-2xl shadow-card p-6">
              <p className="text-lg mb-2">{v.text}</p>
              <div className="flex items-center justify-between text-sm text-muted">
                <span>{v.reference}</span>
                <span>{new Date(v.savedAt).toLocaleString()}</span>
              </div>
              {v.comment && <p className="mt-2 text-sm"><b>Note:</b> {v.comment}</p>}

              <div className="mt-3">
                <button
                  type="button"
                  className="button button--danger"
                  onClick={() => removeAt(i)}   // ← only removes this one
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

