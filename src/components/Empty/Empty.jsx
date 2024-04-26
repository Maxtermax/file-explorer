import { Github } from "@styled-icons/bootstrap/Github";
import './style.css';

export default function Empty() {
  return (
    <div className='empty-container'>
      <Github size={150}/>
      <p>Nothing to display</p>
    </div>
  );
}
