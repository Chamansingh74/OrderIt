import React from "react";
import { useSelector } from "react-redux";
import { getRestaurants } from "../../actions/restaurantAction";
import { useDispatch } from "react-redux";
import { useEffect } from "react";



export default function CountRestaurant ()
{
    const dispatch = useDispatch();

    const {
        loading,
        error,
        count,
        showVegOnly,
        pureVegRestaurantsCount,
    }= useSelector((state) => state.restaurants);

    useEffect(() => {
        dispatch(getRestaurants());
    }, [dispatch]);


    return (
        <div>
            {loading ?(<p>Count Restaurant Loding...</p>) :
            error?(<p>Error: {error}</p>):(
                <p className="NumOfRestro">
                {showVegOnly ? pureVegRestaurantsCount : count} {" "}
                 <span className="Restro">
                    {showVegOnly ? pureVegRestaurantsCount === 1 ? "Restaurant":"Restaurants":
                    count === 1? "Restaurant":"Restaurants"}
                 </span>
            </p>
            )}
            <hr />
        </div>
    );
}