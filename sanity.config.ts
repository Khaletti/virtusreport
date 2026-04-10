import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name:      'virtusreport',
  title:     'VirtusReport CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath:  '/studio',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('VirtusReport')
          .items([
            S.listItem().title('Articles')
              .child(
                S.list().title('Articles by Category')
                  .items([
                    S.listItem().title('All Articles')
                      .child(S.documentList().title('All').filter('_type == "article"')),
                    S.listItem().title('Football')
                      .child(S.documentList().title('Football').filter('_type == "article" && category == "football"')),
                    S.listItem().title('Basketball')
                      .child(S.documentList().title('Basketball').filter('_type == "article" && category == "basketball"')),
                    S.listItem().title('MMA')
                      .child(S.documentList().title('MMA').filter('_type == "article" && category == "mma"')),
                  ])
              ),
            S.listItem().title('Authors')
              .child(S.documentList().title('Authors').filter('_type == "author"')),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
});
