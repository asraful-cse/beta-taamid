import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetFavPoData } from "../_redux/Action";
import PoCard from "../../LandingPage/PoCard/PoCard";
import "./FavPo.css";
const FavPo = () => {
  const dispatch = useDispatch();
  const favPoInfo = useSelector((state) => state.myPoInfo.favPoData);

  useEffect(() => {
    dispatch(GetFavPoData());
  }, [dispatch]);

  return (
    <div className="row main_row2">
      {favPoInfo &&
        favPoInfo.map((eachMyPo) => (
          <div
            className="col-md-6 col-xl-4 col-sm-6 col-lg-6 col-xs-12 cardMargin"
            key={eachMyPo?.id}
          >
            <Link to={`/singlePoDetails/${eachMyPo?.po?.id}`}>
              <PoCard
                // className="ml-0"
                id={eachMyPo?.id}
                eachMyPo={eachMyPo?.po}
                isFavorite
              />
            </Link>
          </div>
        ))}
    </div>
  );
};

export default FavPo;
