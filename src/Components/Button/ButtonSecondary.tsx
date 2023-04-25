import './Button.css'

interface ButtonSecondaryProps {
  text: string;
  action?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ButtonSecondary = ({text, action, onClick}:ButtonSecondaryProps) => {

  return (
    <>
        {action === 'delete' ? <button className='buttonSecondaryContainer deletar' onClick={onClick}>{text}</button> : <button className='buttonSecondaryContainer alterar' onClick={onClick}>{text}</button>}
    </>
  )
}
