import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

/**
 * Unified docs/pages collection.
 *
 * It globs everything under src/content/docs, which holds two kinds of files:
 *   - locally authored content:  src/content/docs/<locale>/...
 *   - content synced from other org repos (via scripts/sync-content.mjs):
 *                                src/content/docs/_ext/<section>/<locale>/...
 *
 * The locale + url path are derived from each entry's id by parseDocId()
 * (src/i18n/utils.ts), so both sources flow through the same routing.
 */
const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    /** Optional: lower numbers sort first in nav. */
    order: z.number().default(100),
    /** Optional: hide from generated navigation but keep the page routable. */
    hidden: z.boolean().default(false),
  }),
});

export const collections = { docs };
