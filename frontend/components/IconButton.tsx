import { Button } from "@/components/ui/button";

type IconButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  icon: React.ReactNode;
  className?: string;
};

export default function IconButton({
  onClick,
  disabled,
  icon,
  className,
}: IconButtonProps) {
  return (
    <Button
      variant="secondary"
      size="icon"
      className={`size-8 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </Button>
  );
}
