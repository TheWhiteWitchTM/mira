// components/Navbar.tsx
import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react"; // Assuming lucide-react for icons, install if needed
import { cn } from "@/lib/utils"; // Shadcn utility for classnames
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Kbd } from "@/components/ui/kbd"; // Assuming you have a Kbd component from Shadcn or custom

// Define types for config
export interface NavItem {
  type: "link" | "submenu" | "card";
  label: string;
  href?: string;
  icon?: React.ReactElement;
  shortcut?: string;
  subitems?: SubItem[];
  cardContent?: React.ReactNode;
}

export interface SubItem {
  type?: "separator"; // For separators
  label?: string;
  href?: string;
  icon?: React.ReactElement;
  shortcut?: string;
}

// Props for the Navbar component
interface NavbarProps {
  config: NavItem[];
}

export function Navbar({ config }: NavbarProps) {
  const pathname = usePathname();

  // Function to check if item or its subitem is active
  const isActive = (item: NavItem) => {
    if (item.href && pathname === item.href) return true;
    if (item.subitems) {
      return item.subitems.some((sub) => sub.href === pathname);
    }
    return false;
  };

  // Desktop Navigation
  const DesktopNav = () => (
    <NavigationMenu className="hidden md:flex">
      {config.map((item, index) => (
        <NavigationMenuItem key={index}>
          {item.type === "link" && item.href && (
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                  isActive(item) && "underline"
                )}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
                {item.shortcut && <Kbd className="ml-2">{item.shortcut}</Kbd>}
              </NavigationMenuLink>
            </Link>
          )}
          {item.type === "submenu" && item.subitems && (
            <>
              <NavigationMenuTrigger
                className={cn(
                  isActive(item) && "underline"
                )}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
                {item.shortcut && <Kbd className="ml-2">{item.shortcut}</Kbd>}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {item.subitems.map((sub, subIndex) => {
                    if (sub.type === "separator") {
                      return <Separator key={subIndex} className="col-span-full" />;
                    }
                    return (
                      <li key={subIndex}>
                        {sub.href ? (
                          <NavigationMenuLink asChild>
                            <Link
                              href={sub.href}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                pathname === sub.href && "underline"
                              )}
                            >
                              <div className="text-sm font-medium leading-none">
                                {sub.icon && <span className="mr-2">{sub.icon}</span>}
                                {sub.label}
                                {sub.shortcut && <Kbd className="ml-2">{sub.shortcut}</Kbd>}
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        ) : (
                          <div className="text-sm font-medium leading-none">
                            {sub.icon && <span className="mr-2">{sub.icon}</span>}
                            {sub.label}
                            {sub.shortcut && <Kbd className="ml-2">{sub.shortcut}</Kbd>}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </>
          )}
          {item.type === "card" && item.cardContent && (
            <>
              <NavigationMenuTrigger
                className={cn(
                  isActive(item) && "underline"
                )}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
                {item.shortcut && <Kbd className="ml-2">{item.shortcut}</Kbd>}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <Card className="w-[400px] p-4">
                  <CardHeader>
                    <CardTitle>{item.label}</CardTitle>
                  </CardHeader>
                  <CardContent>{item.cardContent}</CardContent>
                </Card>
              </NavigationMenuContent>
            </>
          )}
        </NavigationMenuItem>
      ))}
    </NavigationMenu>
  );

  // Mobile Navigation (hamburger -> sheet)
  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col space-y-4">
          {config.map((item, index) => (
            <div key={index}>
              {item.type === "link" && item.href && (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center py-2 text-sm font-medium",
                    isActive(item) && "underline"
                  )}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                  {item.shortcut && <Kbd className="ml-2">{item.shortcut}</Kbd>}
                </Link>
              )}
              {item.type === "submenu" && item.subitems && (
                <div>
                  <div
                    className={cn(
                      "flex items-center py-2 text-sm font-medium",
                      isActive(item) && "underline"
                    )}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                    {item.shortcut && <Kbd className="ml-2">{item.shortcut}</Kbd>}
                  </div>
                  <ul className="ml-4 space-y-2">
                    {item.subitems.map((sub, subIndex) => {
                      if (sub.type === "separator") {
                        return <Separator key={subIndex} />;
                      }
                      return (
                        <li key={subIndex}>
                          {sub.href ? (
                            <Link
                              href={sub.href}
                              className={cn(
                                "flex items-center py-1 text-sm",
                                pathname === sub.href && "underline"
                              )}
                            >
                              {sub.icon && <span className="mr-2">{sub.icon}</span>}
                              {sub.label}
                              {sub.shortcut && <Kbd className="ml-2">{sub.shortcut}</Kbd>}
                            </Link>
                          ) : (
                            <div className="flex items-center py-1 text-sm">
                              {sub.icon && <span className="mr-2">{sub.icon}</span>}
                              {sub.label}
                              {sub.shortcut && <Kbd className="ml-2">{sub.shortcut}</Kbd>}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {item.type === "card" && item.cardContent && (
                <div>
                  <div
                    className={cn(
                      "flex items-center py-2 text-sm font-medium",
                      isActive(item) && "underline"
                    )}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                    {item.shortcut && <Kbd className="ml-2">{item.shortcut}</Kbd>}
                  </div>
                  <Card className="mt-2">
                    <CardHeader>
                      <CardTitle>{item.label}</CardTitle>
                    </CardHeader>
                    <CardContent>{item.cardContent}</CardContent>
                  </Card>
                </div>
              )}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="flex h-14 items-center border-b"> {/* Minimal header, no extra spacing */}
      <MobileNav />
      <DesktopNav />
    </header>
  );
}

// Example usage in your page/layout:
// import { Navbar } from "@/components/Navbar";
// import { Home, Blog, LayoutDashboard, Tool, Flag, Smile, Heart } from "lucide-react"; // Example icons

// const navConfig: NavItem[] = [
//   {
//     type: "link",
//     label: "Home",
//     href: "/",
//     icon: <Home className="h-4 w-4" />,
//   },
//   {
//     type: "link",
//     label: "Blog",
//     href: "/blog",
//     icon: <Blog className="h-4 w-4" />,
//   },
//   {
//     type: "submenu",
//     label: "Projects",
//     subitems: [
//       { label: "Next Static", href: "/projects/next-static" },
//       { type: "separator" },
//       { label: "Next Blog", href: "/projects/next-blog" },
//       { label: "Emoji UI", href: "/projects/emoji-ui" },
//     ],
//   },
//   {
//     type: "submenu",
//     label: "Tools",
//     subitems: [
//       { label: "Flags", href: "/tools/flags", icon: <Flag className="h-4 w-4" /> },
//       { label: "Emoji", href: "/tools/emoji", icon: <Smile className="h-4 w-4" /> },
//     ],
//   },
//   {
//     type: "card",
//     label: "Support",
//     cardContent: (
//       <p>
//         If you enjoy my work, consider supporting me through donations or sponsorships.
//         Your contributions help keep the magic alive! <a href="/donate" className="text-blue-500">Donate here</a>.
//       </p>
//     ),
//     icon: <Heart className="h-4 w-4" />,
//   },
// ];

// <Navbar config={navConfig} />