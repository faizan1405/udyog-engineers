import React from "react";

export interface WhatsAppIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

/**
 * Standard vector WhatsApp brand icon matching Lucide icon sizing conventions.
 * Does not rely on arbitrary raster image assets.
 */
export function WhatsAppIcon({
  size = 16,
  className = "",
  ...props
}: WhatsAppIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.26.86 5.82 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.14l-.3-.18-3.12.82.83-3.04-.2-.32a8.16 8.16 0 0 1-1.25-4.38c0-4.54 3.69-8.24 8.24-8.24zm-3.51 3.66c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07s.89 2.39 1.01 2.56c.13.17 1.75 2.67 4.23 3.74.59.26 1.04.41 1.4.52.59.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29-.24-.12-1.44-.71-1.66-.79-.22-.09-.38-.13-.54.12-.17.24-.63.8-.77.96-.14.17-.28.19-.52.06-.24-.12-1.27-.46-2.48-1.54-.95-.85-1.59-1.9-1.71-2.1-.12-.2-.01-.32.11-.44.11-.11.25-.3.37-.44.12-.14.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.13-.53-1.29-.73-1.76-.19-.46-.39-.4-.54-.4-.14-.01-.3-.01-.46-.01z" />
    </svg>
  );
}
