interface AddTypeProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AddBookProps extends AddTypeProps {}

type AddTypeFieldType = {
  name?: string;
  sort?: string;
  des?: string;
};

type AddBookFieldType = {
  cover?: string;
  shelf_id?: string;
} & AddTypeFieldType;
