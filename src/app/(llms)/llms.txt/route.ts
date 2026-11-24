import { SITE_INFO } from "@/config/site"
import { markdownResponse } from "@/lib/markdown-response"
import { EDUCATION } from "@/features/portfolio/data/education"
import { PROJECTS } from "@/features/portfolio/data/projects"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"
import { TOOLS } from "@/features/portfolio/data/tools"
import { USER } from "@/features/portfolio/data/user"

const education = EDUCATION[0]
const social = SOCIAL_LINKS.filter((link) => link.sameAs)

// Same stamp as the sitemap: tells an agent how fresh the index is without
// pretending the content changed on every request.
const BUILD_DATE = new Date(
  process.env.BUILD_TIMESTAMP ?? Date.now()
).toISOString()

const keyFacts = [
  `- Name: ${USER.displayName} (${USER.username}).`,
  USER.address && `- Based in ${USER.address}.`,
  education &&
    `- Studying ${education.fieldOfStudy} at ${education.school}${
      education.period
        ? ` (${education.period.start}–${education.period.end ?? "Present"})`
        : ""
    }.`,
  ...PROJECTS.map(
    (project) =>
      `- Project — ${project.title}: ${project.summary}${project.link ? ` (${project.link})` : ""}`
  ),
  ...TOOLS.map(
    (tool) => `- Tool — ${tool.title}: ${tool.description} (${tool.href})`
  ),
].filter(Boolean)

const content = `# ${SITE_INFO.name}

> ${SITE_INFO.description}

- Canonical site: ${SITE_INFO.url}
- Language: zh-CN
- Last updated: ${BUILD_DATE.slice(0, 10)}
- Contact: ${SITE_INFO.url}/about.md

## Key facts

${keyFacts.join("\n")}

## Markdown access

Every section below is a Markdown document. The matching HTML page also returns
Markdown when the request sends \`Accept: text/markdown\`. Use the HTML URLs for
citations and the Markdown mirrors for retrieval.

## Pages

- [About](${SITE_INFO.url}/about.md): Profile, location, contact, and tech stack.
- [Education](${SITE_INFO.url}/education.md): School, field of study, and period.
- [Projects](${SITE_INFO.url}/projects.md): Selected projects with links.

## Elsewhere

${social.map((link) => `- [${link.title}](${link.href})`).join("\n")}
`

export const revalidate = false
export const dynamic = "force-static"

export async function GET() {
  return markdownResponse(content)
}
