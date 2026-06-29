import { useEffect } from "react";
import { siteConfig } from "@/config/site";

/** Sets the document <title> for a route (client-side, replaces Next metadata). */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title
      ? `${title} | ${siteConfig.name}`
      : `${siteConfig.name} — Florida Driving Courses & License Help`;
  }, [title]);
}
