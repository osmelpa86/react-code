import { useState } from "react";

export const TwitterFollowCart = ({
  children,
  userName,
  initialIsFollowing,
}) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const text = isFollowing ? "Siguiendo" : "Seguir";
  const buttonClassName = isFollowing
    ? "tw-followCart-button is-following"
    : "tw-followCart-button";

  const handleClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <article className="tw-followCart">
      <header className="tw-followCart-header">
        <img
          className="tw-followCart-avatar"
          alt={children}
          src={`https://unavatar.io/${userName}`}
        />
        <div className="tw-followCart-info">
          <strong>{children}</strong>
          <span className="tw-followCart-infoUserName">@{userName}</span>
        </div>
      </header>

      <aside>
        <button className={buttonClassName} onClick={handleClick}>
          {text}
        </button>
      </aside>
    </article>
  );
};
