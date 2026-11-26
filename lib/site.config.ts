// Edit this file to change your details, the blog source and the quote form.

export const site = {
  name: "Kolawole Suleiman",
  displayName: "KOLAWOLE SULEIMAN",
  handle: "Cortex",
  tagline: "Cortex — Where Curiosity Meets Intelligence.",
  description:
    "Developer building Telegram AI agents, food ordering sites and interactive web experiences. Cortex — Where Curiosity Meets Intelligence.",
  email: "Kolawolesuleiman716@gmail.com",
  whatsapp: "2348088941798", // digits only, with country code
  whatsappDisplay: "+234 808 894 1798",
  github: "https://github.com/cortexinvader001",
  // Your public address, used for canonical links, sitemap and social previews.
  // Set NEXT_PUBLIC_SITE_URL in Render (for example https://my-portfolio.onrender.com) before building.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
};

/** Turn a site path such as "/blog/my-post/" into a full address. */
export function absoluteUrl(path: string): string {
  return new URL(path, site.url + "/").toString();
}

// Blog service API base (the Flask studio), for example:
// "https://cortex-blog.onrender.com/api"
// The site reads posts at build time, so set this before deploying.
// Leave empty to build without posts.
export const blog = {
  apiBase: "https://blog-api-kwuy.onrender.com/api",
};

// Web3Forms access key from https://web3forms.com (safe to place in the front end).
// Leave empty until the key is added. The quote form shows a WhatsApp fallback until then.
export const web3forms = {
  accessKey: "",
};
