import React from 'react';
import { Dropdown } from 'antd';
import cs from 'classnames';
import './style.scss';
import { MoreOutlined } from '@ant-design/icons';

const DocNav: React.FC<DocNavProps> = ({ data, dropdownItems, onDropdownClick,  activeId, setActiveId }) => {
  const renderDocNode = (nodes: DocNode[]) => {
    return nodes.map((node:any) => (
      <div key={node.id} className="doc-nav-node">
        {/* 文档节点 */}
        <div className={cs('doc-nav-item', { active: node.id == activeId })} onClick={()=>setActiveId(node.id)}>
          <span className="doc-name">{node.name}</span>
          <div className="doc-actions">
            <Dropdown
              menu={{
                items: dropdownItems,
                onClick: ({key})=>{onDropdownClick(key, node)},
              }}
              trigger={['click']}
            >
              <MoreOutlined />
            </Dropdown>
          </div>
        </div>

        {/* 子文档 */}
        {node.children && node.children.length > 0 && <div className="doc-children">{renderDocNode(node.children)}</div>}
      </div>
    ));
  };

  return <div className="doc-nav">{renderDocNode(data)}</div>;
};

export default DocNav;
