interface DocNode {
  id: number;
  name: string;
  pid: number | null;
  children?: DocNode[];
}

interface DocNavProps {
  data: DocNode[];
  dropdownItems: Array<any>
  onDropdownClick:(key: any, item?:any) => void;
  activeId: string | null;
  setActiveId:(id: string) => void;
}
