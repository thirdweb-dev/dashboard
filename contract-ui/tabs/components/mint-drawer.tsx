import { Drawer } from "tw-components";

interface MintDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const MintDrawer: React.FC<MintDrawerProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <Drawer
      allowPinchZoom
      preserveScrollBarGap
      size="lg"
      onClose={onClose}
      isOpen={isOpen}
    >
      {children}
    </Drawer>
  );
};
