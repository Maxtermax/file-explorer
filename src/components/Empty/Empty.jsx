import { GithubOutline } from "@styled-icons/evaicons-outline/GithubOutline";
import './style.css';

export default function Empty() {
  return (
    <div className='empty-container'>
      <GithubOutline size={100}/>
      <p>Nothing to display yet, go and explore the project</p>
    </div>
  );
}
