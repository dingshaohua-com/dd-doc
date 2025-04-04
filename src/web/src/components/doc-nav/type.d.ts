interface DocNode {
    id: number;
    name: string;
    pid: number | null;
    children?: DocNode[];
  }
  
  interface DocNavProps {
    data: DocNode[];
    activeId: number | null;
    onItemClick: (id: number) => void;
    dropdownItems: MenuProps['items']; // 使用antd的MenuProps类型
    onDropdownClick: MenuProps['onClick']; // 使用antd的MenuProps类型
  }