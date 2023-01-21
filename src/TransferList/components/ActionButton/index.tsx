import { ImgHTMLAttributes } from "react";
import Button, { ButtonProps } from "src/components/Button";

interface TransferListActionBtnProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "onClick">,
    Pick<ButtonProps, "disabled" | "onClick"> {}

export function TransferListActionBtn({
  src,
  title,
  alt,
  disabled,
  onClick,
}: TransferListActionBtnProps) {
  return (
    <Button disabled={disabled} onClick={onClick} dense>
      <img src={src} title={title} alt={alt} width={18} height={18} />
    </Button>
  );
}
export default TransferListActionBtn;
