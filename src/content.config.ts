import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const projetosCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projetos" }),
  schema: z.object({
    title: z.string(),
    client: z.string().optional(),
    date: z.union([z.string(), z.date()]).optional(),
    coverImage: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = {
  'projetos': projetosCollection,
};
