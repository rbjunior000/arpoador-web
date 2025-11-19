import { useState } from "react";

export const useModal = (props?: { onClose?: () => void }) => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
    props?.onClose?.();
  };
  

  return { opened: open, setOpen, onClose };
};
