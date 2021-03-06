import React from "react";

export const ArtistCard = props => {
  const { _id, name, genre } = props;

  return (
    <div>
      <div className="uk-card uk-card-default">
        <div className="uk-card-media-top">
          <img src="/images/uikit-test-img.jpg" alt="" />
        </div>
        <div className="uk-card-body">
          <div className="card-title-area uk-flex-center uk-flex">
            <h3 className="uk-card-title ">{name}</h3>
          </div>
          <div className="card-detail-area uk-flex uk-flex-center">
            <div>{genre}</div>
            <span className="spacer" />
            <div>{genre}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
