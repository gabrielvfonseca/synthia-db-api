// types/site.ts

export default interface SiteConfig {
    title: string,
    description: string,
    author: string,
    favicon: {
      icon: string,
      "32x32": string,
      "16x16": string,
      "apple-touch": string,
      "safari-tab": string,
      logo: string,
    },
    meta: {
      keywords: string[],
      "theme-color": "#FFF" | "#000",
      manifest: string,
      canonical: string,
      og: {
        site: string,
        title: string,
        description: string,
        image: string,
        url: string,
        card: string,
      },
    },
    links: {
      github: string
    }
    contacts: {
      mail: string,
    }
  }