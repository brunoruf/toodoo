import './Button.css';

interface ButtonPrimaryProps {
  text: string;
  action?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onSubmit?: (event: React.FormEvent<HTMLButtonElement>) => void;
  type?: string;
}

export const ButtonPrimary = ({text, type, action, onClick, onSubmit}:ButtonPrimaryProps) => {

  return (
    <button className='buttonPrimaryContainer' onClick={onClick} onMouseDown={onSubmit}>{text}</button>
  )
}
