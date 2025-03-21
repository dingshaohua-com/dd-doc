import './style.scss';
import Heading from './cmp/heading'
// import FontStyle from './cmp/font-style'


const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menuBar">
      <Heading editor={editor}/>
      {/* <Divider orientation="vertical" variant="middle" flexItem className='menuBarDivider' />
      <FontStyle editor={editor}/>
      <Divider orientation="vertical" variant="middle" flexItem className='menuBarDivider' />
      <Shape editor={editor}/>
      <Formula editor={editor}/> */}
    </div>
  );
};

export default MenuBar;
