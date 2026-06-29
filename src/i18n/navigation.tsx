import { forwardRef, type AnchorHTMLAttributes } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
};

/**
 * Internal link (replaces next-intl's `Link`). Keeps the `href` prop the
 * components already pass: renders a react-router `Link` for in-app paths and a
 * plain anchor for external / protocol (mailto:, tel:, #) URLs.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, children, ...props },
  ref,
) {
  const external = /^(https?:|mailto:|tel:|#)/.test(href);
  if (external) {
    return (
      <a ref={ref} href={href} {...props}>
        {children}
      </a>
    );
  }
  return (
    <RouterLink ref={ref} to={href} {...props}>
      {children}
    </RouterLink>
  );
});

export function usePathname(): string {
  return useLocation().pathname;
}

export function useRouter() {
  const navigate = useNavigate();
  return {
    push: (href: string) => navigate(href),
    replace: (href: string) => navigate(href, { replace: true }),
    back: () => navigate(-1),
  };
}
