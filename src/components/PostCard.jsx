import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";

export default function PostCard({ post }) {
  const navigate = useNavigate();

  /**
   * handleClick is called when user clicks on the Article (PostCard)
   */
  function handleClick() {
    navigate(`/posts/${post.id}`);
  }
  return (
    <article className="post-card" onClick={handleClick}>
      <UserAvatar uid={post.uid} />
      <img src={post.image} alt={post.caption} />
      <h3>{post.caption}</h3>
    </article>
  );
}
