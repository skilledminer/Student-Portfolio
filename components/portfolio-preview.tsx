import MinimalTemplate from "./portfolio-templates/minimal-template"
import CreativeTemplate from "./portfolio-templates/creative-template"
import CorporateTemplate from "./portfolio-templates/corporate-template"
import ModernTemplate from "./portfolio-templates/modern-template"

export default function PortfolioPreview({ data }) {
  const { theme } = data
  const { template } = theme

  // Render the appropriate template based on the selected template
  switch (template) {
    case "creative":
      return <CreativeTemplate data={data} />
    case "corporate":
      return <CorporateTemplate data={data} />
    case "modern":
      return <ModernTemplate data={data} />
    case "minimal":
    default:
      return <MinimalTemplate data={data} />
  }
}
