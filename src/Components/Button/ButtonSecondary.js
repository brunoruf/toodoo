import './Button.css'

export const ButtonSecondary = ({text, action, onClick}) => {

  return (
    <>
        {action === 'delete' ? <button className='buttonSecondaryContainer deletar' onClick={onClick}>{text}</button> : <button className='buttonSecondaryContainer alterar' onClick={onClick}>{text}</button>}
    </>
  )
}
