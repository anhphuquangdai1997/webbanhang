import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { ReactNode } from "react";

interface DrawerProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

const DrawerMobile: React.FC<DrawerProps> = ({ open, onClose, title = "Tiêu đề", children }) => {
  return (
    <Drawer open={open} onClose={onClose} className="w-[80%] max-w-[80%]">
      <DrawerHeader title={title} className="text-2xl custom-drawer-header" />
      <DrawerItems>
        {children}
      </DrawerItems>
    </Drawer>
  );
};
export default DrawerMobile;