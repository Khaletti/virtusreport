import { defineType, defineField } from 'sanity';

export const articleSchema = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  groups: [
    { name: 'content',  title: 'Content' },
    { name: 'meta',     title: 'Metadata' },
    { name: 'seo',      title: 'SEO' },
    { name: 'i18n',     title: 'Translations' },
  ],
  fields: [
    // ── Core ──────────────────────────────────────────────────────────────
    defineField({
      name: 'title', title: 'Title (English)', type: 'string',
      group: 'content',
      validation: (R) => R.required().max(100),
    }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug',
      group: 'meta',
      options: { source: 'title', maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'category', title: 'Sport Category', type: 'string',
      group: 'meta',
      options: {
        list: [
          { title: 'Football',   value: 'football'   },
          { title: 'Basketball', value: 'basketball' },
          { title: 'MMA',        value: 'mma'        },
        ],
        layout: 'radio',
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'author', title: 'Author', type: 'reference',
      group: 'meta',
      to: [{ type: 'author' }],
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'publishedAt', title: 'Published At', type: 'datetime',
      group: 'meta',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'featured', title: 'Featured Article', type: 'boolean',
      group: 'meta',
      initialValue: false,
    }),
    defineField({
      name: 'readTime', title: 'Read Time (minutes)', type: 'number',
      group: 'meta',
    }),
    defineField({
      name: 'mainImage', title: 'Main Image', type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'excerpt', title: 'Excerpt (English)', type: 'text',
      group: 'content',
      rows: 3,
      validation: (R) => R.required().max(200),
    }),
    defineField({
      name: 'body', title: 'Body (English)', type: 'array',
      group: 'content',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
        },
      ],
    }),

    // ── SEO ───────────────────────────────────────────────────────────────
    defineField({
      name: 'seo', title: 'SEO', type: 'object',
      group: 'seo',
      fields: [
        defineField({ name: 'metaTitle',       type: 'string', title: 'Meta Title' }),
        defineField({ name: 'metaDescription', type: 'text',   title: 'Meta Description', rows: 2 }),
        defineField({ name: 'ogImage',         type: 'image',  title: 'OG Image' }),
      ],
    }),

    // ── Translations (DE / FR / ES) ────────────────────────────────────────
    defineField({
      name: 'translations', title: 'Translations', type: 'array',
      group: 'i18n',
      of: [{
        type: 'object',
        name: 'translation',
        fields: [
          defineField({
            name: 'language', title: 'Language', type: 'string',
            options: {
              list: [
                { title: 'Deutsch',  value: 'de' },
                { title: 'Français', value: 'fr' },
                { title: 'Español',  value: 'es' },
              ],
            },
          }),
          defineField({ name: 'slug',    type: 'slug',   title: 'Slug',    options: { source: 'title' } }),
          defineField({ name: 'title',   type: 'string', title: 'Title' }),
          defineField({ name: 'excerpt', type: 'text',   title: 'Excerpt', rows: 3 }),
          defineField({ name: 'body',    type: 'array',  title: 'Body', of: [{ type: 'block' }] }),
        ],
        preview: {
          select: { title: 'title', subtitle: 'language' },
          prepare: ({ title, subtitle }) => ({ title, subtitle: subtitle?.toUpperCase() }),
        },
      }],
    }),
  ],

  preview: {
    select: {
      title:    'title',
      category: 'category',
      author:   'author.name',
      media:    'mainImage',
    },
    prepare({ title, category, author, media }) {
      const cat = category ? `[${category.toUpperCase()}]` : '';
      return { title: `${cat} ${title}`, subtitle: author, media };
    },
  },
  orderings: [{
    title: 'Published, new first',
    name:  'publishedAtDesc',
    by:    [{ field: 'publishedAt', direction: 'desc' }],
  }],
});
