/**
 * Utility function to merge class names
 * Similar to clsx but simple implementation
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}




