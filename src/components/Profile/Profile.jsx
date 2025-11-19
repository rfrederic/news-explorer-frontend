import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Profile.css";

export default function Profile({ savedCount = 0, onEditProfile, onSignOut }) {
  const { currentUser } = useContext(CurrentUserContext);

  const initials = currentUser?.name?.trim()?.charAt(0)?.toUpperCase?.() || "U";

  return (
    <section className="profile">
      <div className="profile__info">
        <h2 className="profile__name">{currentUser?.name || "User"}</h2>
      </div>
    </section>
  );
}
