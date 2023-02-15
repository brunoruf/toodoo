import './Button.css'

export const ButtonPrimary = ({text, action, onClick}) => {

  return (
    <button className='buttonPrimaryContainer' onClick={onClick}>{text}</button>
  )
}
