import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  
  media: {
    tina: {
      mediaRoot: "assets",
      publicFolder: "public",
    },
  },
  
  schema: {
    collections: [
      {
        name: "projetos",
        label: "Projetos",
        path: "src/content/projetos",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Título do Projeto",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "client",
            label: "Cliente / Tipo",
          },
          {
            type: "datetime",
            name: "date",
            label: "Data do Projeto",
          },
          {
            type: "image",
            name: "coverImage",
            label: "Imagem de Capa",
          },
          {
            type: "string",
            name: "description",
            label: "Resumo / Descrição",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Conteúdo do Projeto",
            isBody: true,
          },
        ],
      },
    ],
  },
});
