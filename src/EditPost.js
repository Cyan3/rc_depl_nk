import React from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useStoreState, useStoreActions } from "easy-peasy";

const EditPost = () => {

  const editTitle = useStoreState((state) => state.editTitle);
  const editBody = useStoreState((state) => state.editBody);

  const editPost = useStoreActions((actions) => actions.editPost);
  const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
  const setEditBody = useStoreActions((actions) => actions.setEditBody);

  const history = useNavigate();

  const { id } = useParams();
  const getPostById = useStoreState((state) => state.getPostById)
  const post = getPostById(id)
  

  
  const handleEdit = (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy, pp");
    const updatedPost = {
      id: id,
      datetime: datetime,
      title: editTitle,
      body: editBody,
    };
    editPost(updatedPost)
    history(`/posts/${id}`);
  };

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  return (
    <main className="EditPost">
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title:</label>
            <input
              id="postTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post:</label>
            <textarea
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="submit" onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post Not Found</h2>
          <p>Well, that's disappointing.</p>
          <p>
            <Link to="/">Go Home</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
