import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function InputWithLabel(props: InputProps) {
  const { label, type, ...rest } = props;

  return (
    <div className="grid w-full items-center gap-1.5 lg:max-w-xs">
      <Label htmlFor={label.toLowerCase()}>{label}</Label>
      <Input type={type} id={label.toLowerCase()} {...rest} />
    </div>
  )
}
