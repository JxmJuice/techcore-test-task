import { useState } from "react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import CountryCard from "../CountryCard/CountryCard";
import SettingsIcon from "../SettingsIcon/SettingsIcon";
import CreateLocationPopup from "../CreateLocationPopup/CreateLocationPopup";

import "./LocationsPage.scss";

function LocationsPage() {
  const [isCreatePopupVisible, setIsCreatePopupVisible] = useState(false);
  const [cards, setCards] = useState([
    {
      title: "Australia",
      workers: [
        {
          label: "Bill Johnson",
        },
        {
          label: "Bill Johnson",
        },
        {
          label: "Bill Johnson",
        },
        {
          label: "Bill Johnson",
        },
        {
          label: "Bill Johnson",
        },
        {
          label: "Bill Johnson",
        },
        {
          label: "Bill Johnson",
        },
        {
          label: "Bill Johnson",
        },
      ],
      isDefault: true,
      info: {},
    },
  ]);

  const openPopup = () => {
    setIsCreatePopupVisible(true);
  };

  const closePopup = () => {
    setIsCreatePopupVisible(false);
  };

  const createCard = (location, users, info, isDefault) => {
    const newCards = JSON.parse(JSON.stringify(cards));
    isDefault && newCards.forEach((card) => (card.isDefault = false));
    newCards.push({
      title: location,
      workers: users,
      info: info,
      isDefault: isDefault,
    });
    setCards(newCards);
  };

  const deleteCard = (title) => {
    const newCards = JSON.parse(JSON.stringify(cards));
    const res = newCards.filter((card) => card.title !== title);
    setCards(res);
  };

  const setDefault = (title) => {
    const newCards = JSON.parse(JSON.stringify(cards));
    newCards.forEach((card) => (card.isDefault = false));
    const newDefault = newCards.find((card) => card.title === title);
    newDefault.isDefault = true;
    const res = newCards.filter((card) => card.title !== title);
    res.push(newDefault);
    res.reverse();
    setCards(res);
  };

  return (
    <section className="LocationsPage">
      <Breadcrumbs
        path={[
          { icon: <SettingsIcon />, title: "Settings" },
          { title: "Vacation Manager" },
        ]}
      />
      <div className="LocationsPage-Header">
        <div className="LocationsPage-Information">
          <h3 className="LocationsPage-Title">Locations</h3>
          <p className="LocationsPage-Text">
            Create new users or update the existng users. You can then set their
            permissons here too.{" "}
          </p>
        </div>
        <button className="LocationsPage-CreateButton" onClick={openPopup}>
          Create Location
        </button>
      </div>
      <div className="LocationsPage-Cards">
        {cards.map((card) => (
          <CountryCard
            workers={card.workers}
            title={card.title}
            isDefault={card.isDefault}
            setDefault={setDefault}
            deleteCard={deleteCard}
          />
        ))}
      </div>
      <CreateLocationPopup
        isVisible={isCreatePopupVisible}
        closePopup={closePopup}
        createCard={createCard}
      />
    </section>
  );
}

export default LocationsPage;
