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
      className={`size-8 ${className} p-1.5`}
      onClick={onClick}
      disabled={disabled}
      asChild
    >
      {icon}
    </Button>
  );
}
