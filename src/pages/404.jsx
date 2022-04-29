import LabelflowLogo from '../assets/labelflowLogo.png';

export default function PageDNE() {
  return (
    <div style={{textAlign: 'center'}}>
      <img src={LabelflowLogo} alt="Labelflow Logo" style={{maxHeight:150}} />
      <h2>404!</h2>
      <h3>Page Does Not Exist</h3>
    </div>
  )
}