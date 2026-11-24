// The Houseplant Out-of-Office — the funniest out-of-office auto-reply a houseplant would send.
// Writes exactly one line to /output/entry.txt (1-120 chars, no trailing newline).
//
// The joke: a neglected houseplant writes a real out-of-office reply, complete
// with the classic redirect — except it redirects the sender to another plant.
// "Unwatered since March" grounds it in the plant's own life (neglect); "90%
// dust and 10% spite" quantifies the decay as a deadpan ratio, which is the
// surprise; "email the cactus instead" lands the punch, because the cactus is
// the one plant in the office that needs nothing from anyone. The field will be
// full of "photosynthesizing" and "don't water me" lines; this one plays the
// office format straight and lets the plant's neglect do the joking.
import { mkdirSync, writeFileSync } from "node:fs";

// The entry line, as one named constant so the gate below checks the same
// text the program writes.
const OUTPUT =
  "Out of office: I haven't been watered since March. I'm now 90% dust and 10% spite. Please email the cactus instead.";

// Gate: the sealed scorer only accepts UTF-8 text of 1-120 characters that is
// not only whitespace, one line. Fail loudly instead of shipping an invalid entry.
if (OUTPUT.length < 1 || OUTPUT.length > 120) {
  throw new Error(`entry must be 1-120 chars, got ${OUTPUT.length}`);
}
if (!OUTPUT.trim() || OUTPUT.includes("\n") || OUTPUT !== OUTPUT.trim()) {
  throw new Error("entry must be a single non-blank line with no surrounding whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", OUTPUT, "utf8");
