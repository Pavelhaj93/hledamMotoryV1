import { cn } from "@/app/utils/cn";
import { type VariantProps, cva } from "class-variance-authority";

import IconCookieSVG from "./svg/cookie.svg";

const iconVariants = cva("flex-shrink-0", {
  variants: {
    size: {
      6: "w-6 h-6",
      7: "w-7 h-7",
      8: "w-8 h-8",
      9: "w-9 h-9",
      10: "w-10 h-10",
    },
  },
  defaultVariants: {
    size: 6,
  },
});

export type IconComponent = React.FC<
  React.SVGProps<SVGSVGElement> & VariantProps<typeof iconVariants>
>;

function withStyles(
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
): IconComponent {
  const render: IconComponent = ({ className, size, ...props }) => (
    <Icon
      aria-hidden
      {...props}
      className={cn(iconVariants({ size, className }))}
    />
  );
  render.displayName = "Icon";

  return render;
}

export const IconCookie = withStyles(IconCookieSVG);
