/** Other MRGI campus names — not shown as gallery filters or labels on this site. */
const OTHER_SCHOOL_BRANCHES = [
  'kompally',
  'suraram',
  'shampur',
  'kundanpally',
  'mb grammar school',
  'lalgadi malakpet',
] as const;

function normalizeCategory(category: string): string {
  return category.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function isOtherSchoolBranchCategory(category: string): boolean {
  const norm = normalizeCategory(category);
  if (!norm) return false;
  return OTHER_SCHOOL_BRANCHES.some(
    (branch) => norm === branch || norm.includes(branch),
  );
}

/** User-facing label for a photo category; null hides the badge. */
export function formatGalleryCategory(category: string): string | null {
  const norm = normalizeCategory(category);
  if (!norm || norm === 'general' || isOtherSchoolBranchCategory(norm)) {
    return null;
  }
  return norm.charAt(0).toUpperCase() + norm.slice(1);
}
