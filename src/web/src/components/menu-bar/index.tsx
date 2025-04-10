import './style.scss';
import Heading from './cmp/heading';
import { Button, Divider } from 'antd';
// import FontStyle from './cmp/font-style'

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menuBar">
      <div>
        <Heading editor={editor} />
        {/* <Divider orientation="vertical" variant="middle" flexItem className='menuBarDivider' />
      <FontStyle editor={editor}/>
      <Divider orientation="vertical" variant="middle" flexItem className='menuBarDivider' />
      <Shape editor={editor}/>
      <Formula editor={editor}/> */}
      </div>
      <div>
        <Button type="primary" size="small">
          保存
        </Button>
      </div>
    </div>
  );
};

export default MenuBar;
