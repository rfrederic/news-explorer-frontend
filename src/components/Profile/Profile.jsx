import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Profile.css";

export default function Profile() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <section className="profile">
      <div className="profile__info">
        <h2 className="profile__name">{currentUser?.name || "User"}</h2>
      </div>
    </section>
  );
}
