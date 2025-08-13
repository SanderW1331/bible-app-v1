// src/lib/verses.ts
export type Verse = { text: string; reference: string };

export const VERSES: Verse[] = [
  { text: `“And we know that in all things God works for the good of those who love him.”`, reference: "Romans 8:28" },
  { text: `“The Lord is my shepherd, I lack nothing.”`, reference: "Psalm 23:1" },
  { text: `“I can do all this through him who gives me strength.”`, reference: "Philippians 4:13" },
  { text: `“For God so loved the world that he gave his one and only Son…”`, reference: "John 3:16" },
  { text: `“Be strong and courageous… for the Lord your God goes with you.”`, reference: "Deuteronomy 31:6" },
  { text: `“Cast all your anxiety on him because he cares for you.”`, reference: "1 Peter 5:7" },
  { text: `“Trust in the Lord with all your heart and lean not on your own understanding.”`, reference: "Proverbs 3:5" },
  { text: `“The Lord is close to the brokenhearted and saves those who are crushed in spirit.”`, reference: "Psalm 34:18" },
  { text: `“Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.”`, reference: "Matthew 7:7" },
  { text: `“My grace is sufficient for you, for my power is made perfect in weakness.”`, reference: "2 Corinthians 12:9" },
  { text: `“Your word is a lamp for my feet, a light on my path.”`, reference: "Psalm 119:105" },
  { text: `“The Lord your God is with you, the Mighty Warrior who saves.”`, reference: "Zephaniah 3:17" },
  { text: `“If God is for us, who can be against us?”`, reference: "Romans 8:31" },
  { text: `“Do not be anxious about anything… by prayer and petition… present your requests to God.”`, reference: "Philippians 4:6" },
  { text: `“Be still, and know that I am God.”`, reference: "Psalm 46:10" },
];

export function getDailyVerse(d: Date = new Date()): Verse {
  // Stable index per UTC day
  const dayNumber = Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
  const idx = dayNumber % VERSES.length;
  return VERSES[idx];
}

// Optional: default export for convenience (won’t hurt named import)
export default getDailyVerse;

