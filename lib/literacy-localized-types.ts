// [prompt, explanation, optional option labels in the order of the English source options].
// CLASSIFY questions normally omit the options and use the shared term list instead.
export type LocalizedLiteracyEntry = readonly [prompt: string, explanation: string, options?: readonly string[]];
export type LocalizedLiteracyBank = Readonly<Record<string, LocalizedLiteracyEntry>>;
export type LocalizedLiteracyTerms = Readonly<Record<string, string>>;
