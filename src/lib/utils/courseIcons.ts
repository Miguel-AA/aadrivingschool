import { createElement } from "react";
import {
  AlertTriangle,
  Award,
  BookOpen,
  ClipboardCheck,
  ClipboardList,
  Gauge,
  GraduationCap,
  Languages,
  LifeBuoy,
  MapPin,
  ShieldAlert,
  Signpost,
  Smartphone,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { CourseCategory } from "@/lib/schemas/content";

/** Icon per course category, for card/detail iconography. */
const ICONS: Record<CourseCategory, LucideIcon> = {
  tlsae: BookOpen,
  dets: GraduationCap,
  bdi: ShieldAlert,
  adi: AlertTriangle,
  mature55: Award,
  wcd: Smartphone,
  "permit-prep": ClipboardCheck,
  "spanish-prep": Languages,
  "road-signs": Signpost,
  "new-to-fl": MapPin,
  "parent-teen": Users,
  "dmv-checklist": ClipboardList,
  "defensive-refresher": Gauge,
  "suspension-guide": LifeBuoy,
};

export function getCourseIcon(category: CourseCategory): LucideIcon {
  return ICONS[category] ?? BookOpen;
}

/** Static component that renders a category's icon (avoids per-render component
 *  aliasing in callers). */
export function CategoryIcon({
  category,
  className,
}: {
  category: CourseCategory;
  className?: string;
}) {
  return createElement(getCourseIcon(category), {
    className,
    "aria-hidden": true,
  });
}
