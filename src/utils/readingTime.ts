/**
 * Reading Time Utility
 * 
 * Calculates estimated reading time for mixed CJK/English content.
 * Supports both Chinese (character-based counting) and English (word-based counting).
 * 
 * Reading Speed:
 * - Chinese: ~300 characters per minute
 * - English: ~200 words per minute
 * 
 * @module readingTime
 */

/** Characters per minute for CJK content */
const CJK_CHARS_PER_MINUTE = 300;

/** Words per minute for English/technical content */
const WORDS_PER_MINUTE = 200;

/** CJK Unicode ranges (Basic + Extension A) */
const CJK_REGEX = /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/g;

/**
 * Calculates reading time in minutes from text content
 * 
 * Handles mixed CJK and non-CJK text by counting each separately
 * and combining the estimates. Removes code blocks before counting.
 * 
 * @param content - The text content to analyze (markdown or plain text)
 * @returns Estimated reading time in minutes (minimum 1)
 */
export function calculateReadingTime(content: string): number {
  // Remove fenced code blocks
  const textWithoutCode = content.replace(/```[\s\S]*?```/g, '');

  // Count CJK characters
  const cjkMatches = textWithoutCode.match(CJK_REGEX);
  const cjkCount = cjkMatches ? cjkMatches.length : 0;

  // Count non-CJK words (remove CJK chars first, then split on whitespace)
  const nonCjkText = textWithoutCode.replace(CJK_REGEX, '');
  const words = nonCjkText.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;

  // Combine: each contributes proportionally to reading time
  const minutes = Math.max(1, Math.ceil(cjkCount / CJK_CHARS_PER_MINUTE + wordCount / WORDS_PER_MINUTE));

  return minutes;
}

/**
 * Formats reading time for display
 * 
 * @param minutes - Reading time in minutes
 * @returns Formatted string (e.g., "5 min read" or "5 分钟阅读")
 */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}

/**
 * Calculates and formats reading time from content in one step
 * 
 * @param content - The text content to analyze
 * @returns Formatted reading time string
 */
export function getReadingTime(content: string): string {
  const minutes = calculateReadingTime(content);
  return formatReadingTime(minutes);
}
