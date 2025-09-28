import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Define JSON structure
type DatasetJSON = {
  slug: string;
  frontmatter: Record<string, any>;
  content: string;
};

// Change this to the MDX file you want to convert
const SLUG = "micasa-carbonflux-daygrid-v1.data";

function mdxToJson(slug: string) {
  // Path to the source MDX
  const mdxPath = path.join(process.cwd(), "app/content/datasets", `${slug}.mdx`);
  // Path for the output JSON
  const jsonPath = path.join(process.cwd(), "app/content/drupal", `${slug}.json`);

  // Read MDX file
  const mdxRaw = fs.readFileSync(mdxPath, "utf-8");

  // Use gray-matter to extract frontmatter + body content
  const { content, data } = matter(mdxRaw);

  // Build object
  const dataset: DatasetJSON = {
    slug,
    frontmatter: data,
    content, // raw MDX/Markdown body
  };

  // Ensure output folder exists
  fs.mkdirSync(path.dirname(jsonPath), { recursive: true });

  // Write to JSON file
  fs.writeFileSync(jsonPath, JSON.stringify(dataset, null, 2));

  console.log(`Wrote JSON at: ${jsonPath}`);
}

// Run
mdxToJson(SLUG);
