export function MarqueeSection() {
  const items = [
    'WordPress', 'Zapier', 'Make.com', 'n8n', 'OpenAI', 'Claude AI',
    'Webflow', 'WooCommerce', 'Elementor', 'Airtable', 'Notion', 'React',
    'Python', 'GPT-4', 'Midjourney', 'HubSpot', 'Shopify', 'Next.js', 'Firebase'
  ]

  return (
    <div className="w-full overflow-hidden bg-white/[0.02] border-y border-accent/40 py-4 shadow-[0_0_20px_rgba(232,67,45,0.1)] flex">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((tech, i) => (
          <div key={`m1-${i}`} className="mx-8 flex items-center gap-2 text-white/60 hover:text-white hover:drop-shadow-[0_0_10px_#E8432D] transition-all font-inter text-lg">
            <span className="text-accent text-sm">✦</span> {tech}
          </div>
        ))}
      </div>
      <div className="flex animate-marquee whitespace-nowrap" aria-hidden="true">
        {items.map((tech, i) => (
          <div key={`m2-${i}`} className="mx-8 flex items-center gap-2 text-white/60 hover:text-white hover:drop-shadow-[0_0_10px_#E8432D] transition-all font-inter text-lg">
            <span className="text-accent text-sm">✦</span> {tech}
          </div>
        ))}
      </div>
    </div>
  )
}
