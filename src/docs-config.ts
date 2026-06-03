/**
 * Docs sidebar configuration
 */

export interface SidebarItem {
  label: string;
  href?: string;
  items?: SidebarItem[];
}

export interface SidebarGroup {
  label: string;
  items: SidebarItem[];
}

export const docsSidebar: SidebarGroup[] = [
  {
    label: '前端开发',
    items: [
      { label: 'Astro 入门指南', href: '/docs/前端开发/astro入门' },
    ],
  },
  {
    label: '后端开发',
    items: [],
  },
  {
    label: 'DevOps',
    items: [],
  },
];
