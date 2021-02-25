import React, { useState, useContext } from "react";
import { Card, ImageHeader, CardBody, CardFooter } from "react-simple-card";
import Image from "../../../../assets/images/traveller.jpg";
import MapModal from "../MapModal/MapModal";
import Switch from "@material-ui/core/Switch";
import { AuthContext } from "../../../../Shared/Context/auth-context";
import { useHttpClient } from "../../../../Shared/hooks/http-hook";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import ErrorModal from "../../../../Shared/ErrorModal/ErrorModal";

import "./PlaceCard.css";

const PlaceCard = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const currentUserCheck = auth.userId === props.place.creator;
  const [state, setState] = useState({
    PostWishlistSwitch: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const deleteHandler = async () => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/places/${props.place.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      props.onDelete(props.place.wishlist,props.place.id);
    } catch (err) {}
  };
  return (
    <div className="mx-auto SingelUserPlaceCard">
      {error && <ErrorModal errorText={error} clicked={clearError} />}
      <Card className="CardDiv">
        <ImageHeader className="CardImage" alt="image" imageSrc={Image} />
        <CardBody className="text-center">
          <h4>{props.place.title} </h4>
          <p className="text-muted  m-0 p-0">{props.place.address}</p>
          <p className="text-muted m-0 p-0">Type: {props.place.typeOfPlace}</p>
          <p className="mt-2 mb-0 p-0">{props.place.description}</p>
        </CardBody>
        <CardFooter>
          <div className="container PlaceCardButtons mx-auto Center px-2 px-md-4 ">
            <div className="row ">
              <div className="col-12 px-0 px-md-2">
                <MapModal
                  address={props.place.address}
                  coordinates={props.place.coordinates}
                />
              </div>
              {currentUserCheck && (
                <div className="col-12 mt-2 d-flex justify-content-between px-0 px-md-2">
                  <button className="btn btn-outline-info">Edit</button>
                  <DeleteConfirmationModal deleteHandler={deleteHandler} />
                  <Switch
                    checked={state.PostWishlistSwitch}
                    onChange={handleChange}
                    name="PostWishlistSwitch"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </div>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PlaceCard;
