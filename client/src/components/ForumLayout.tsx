import { useEffect, useState } from "react";
import api from "../api/api";

interface userProps {
  _id: string;
  avatar: string;
  email: string;
  username: string;
}
interface threadProps {
  _id: string;
  content: string;
  title: string;
  createdBy: userProps;
}
export default function ForumLayout() {
  const [threadList, setThreadList] = useState<threadProps[]>([]);

  useEffect(() => {
    api
      .get("/api/topic", { withCredentials: true })
      .then((res) => setThreadList(res.data))
      .catch((e) => console.log(e?.response?.data?.error || e));
  }, []);

  return (
    <main className="forum-container">
      {threadList.length > 0
        ? threadList.map((thread) => (
            <ForumTopic
              key={thread._id}
              _id={thread._id}
              title={thread.title}
              content={thread.content}
              avatar={thread?.createdBy?.avatar}
              username={`${thread?.createdBy?.username} `}
            />
          ))
        : null}
      <div className="thread">
        <img
          src="https://i.pravatar.cc/40?u=newuser22"
          alt="NewUser22"
          className="avatar"
        />
        <div className="thread-info">
          <a href="#">Introduce yourself</a>
          <p className="description">
            Share a bit about who you are and what you're into!
          </p>
          <p>
            Posted by <strong>NewUser22</strong>
          </p>
        </div>
      </div>

      <div className="thread">
        <img
          src="https://i.pravatar.cc/40?u=devgirl"
          alt="DevGirl"
          className="avatar"
        />
        <div className="thread-info">
          <a href="#">Best programming languages in 2025?</a>
          <p className="description">
            What's trending this year? Share your opinions on top languages and
            predictions.
          </p>
          <p>
            Posted by <strong>DevGirl</strong>
          </p>
        </div>
      </div>
      {/* <ForumTopic />
      <ForumTopic /> */}
    </main>
  );
}

interface ForumTopicProps {
  _id: string;
  title: string;
  content: string;
  avatar: string;
  username: string;
}
function ForumTopic({
  _id,
  title,
  content,
  username,
  avatar,
}: ForumTopicProps) {
  return (
    <div className="thread">
      <img
        src={avatar ? avatar : "https://i.pravatar.cc/40?u=newuser22"}
        alt="Profile"
        className="avatar"
      />
      <div className="thread-info">
        <a href={`/thread/${_id}`}>{title}</a>
        <p className="description">{content}</p>
        <p>
          Posted by <strong>{username}</strong>
        </p>
      </div>
    </div>
  );
}

/* <div className="thread">
<img
  src="https://i.pravatar.cc/40?u=admin"
  alt="Admin"
  className="avatar"
/>
<div className="thread-info">
  <a href="#">Welcome to the forum!</a>
  <p className="description">
    This is the first thread—introduce yourself, ask questions, or just
    say hi to everyone!
  </p>
  <p>
    Posted by <strong>Admin</strong> · 5 replies
  </p>
</div>
</div> */
