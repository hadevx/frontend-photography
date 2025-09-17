import React from "react";

import PropTypes from "prop-types";

import "./testimonal.css";

const Testimonal = (props) => {
  return (
    <div className="testimonal-testimonal testimonal">
      <span className="testimonal-text">{props.quote}</span>
      <div className="testimonal-author">
        <div className="testimonal-avatar">
          {/*       <img
            alt={props.avatarAlt}
            src={props.avatarSrc}
            className="testimonal-image"
          /> */}
        </div>
        <div className="testimonal-user">
          <span className="testimonal-name">{props.name}</span>
          <span className="testimonal-divider">—</span>
          <span className="testimonal-from">{props.from}</span>
        </div>
      </div>
    </div>
  );
};

Testimonal.defaultProps = {
  from: "Vista Social",
  avatarAlt: "image",
  avatarSrc:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDV8fGdpcmx8ZW58MHx8fHwxNjY0ODA5MjE1&ixlib=rb-1.2.1&w=200",
  name: "Andy Smith",
  quote:
    '"Pellentesque sodales libero nulla, ac imperdiet ante tincidunt vel. Fusce auctor augue sed massa finibus, et dictum sem mollis. In luctus.”',
};

Testimonal.propTypes = {
  from: PropTypes.string,
  avatarAlt: PropTypes.string,
  avatarSrc: PropTypes.string,
  name: PropTypes.string,
  quote: PropTypes.string,
};

export default Testimonal;
