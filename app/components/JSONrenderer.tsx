// import fs from "fs";
// import path from "path";
// import { MDXRemote } from "next-mdx-remote/rsc";
// import Providers from "app/(datasets)/providers";
// import { LegacyGlobalStyles } from "@lib";
// import { components as mdxComponents } from "./mdx";

// type DatasetJSON = {
//   slug: string;
//   frontmatter?: Record<string, any>;
//   content: string; // raw mdx/markdown string
// };
// console.log(" Rendering from JSON file");
// export default function JsonMDX({ slug }: { slug: string }) {
//   const jsonPath = path.join(process.cwd(), "app/content/drupal", `${slug}.json`);
//   const raw = fs.readFileSync(jsonPath, "utf-8");
//   const dataset: DatasetJSON = JSON.parse(raw);

//   return (
//     <Providers datasets={[]}>
//       <LegacyGlobalStyles />
//       <MDXRemote source={dataset.content} components={mdxComponents as any} />
//     </Providers>
//   );
// }
