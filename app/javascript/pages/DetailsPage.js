import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { getReservations, cancelReservation } from '../redux/reservation/reservationSlice';

const Details = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // Fetch motorbikes and reservations
  const { content: motorbikes } = useSelector((store) => store.motorbikes);
  const { content: reservations } = useSelector((store) => store.reservations);

  // State to track reservation status
  const [isReserved, setIsReserved] = useState(false);
  const [reservationId, setReservationId] = useState(null);

  useEffect(() => {
    dispatch(getReservations());
  }, [dispatch]);

  // Filter the motorbike based on id
  const motorbike = motorbikes.find((item) => item.id === parseInt(id, 10));

  // Check if there is a reservation for this motorbike
  useEffect(() => {
    if (motorbike) {
      const reservation = reservations.find(resv => resv.motorbike && resv.motorbike.id === motorbike.id);
      if (reservation) {
        setIsReserved(true);
        setReservationId(reservation.id);
      } else {
        setIsReserved(false);
        setReservationId(null);
      }
    }
  }, [motorbike, reservations]);

  const handleCancel = () => {
    if (reservationId) {
      dispatch(cancelReservation(reservationId));
    }
  };

  if (!motorbike) {
    return <p>No motorbike found with the specific ID</p>;
  }

  return (
    <>
      <Navigation />
      <section>
        <div className="leftPart">
          <img src={motorbike.image} alt={motorbike.name} />
          <div className="navBack">
            <Link to="/" className="btn active">&lt;</Link>
          </div>
        </div>
        <div className="rightPart">
          <h2>{motorbike.name} {motorbike.model}</h2>
          <p>*The tax fee is about 15%</p>
          <table>
            <tbody>
              <tr>
                <td>Price</td>
                <td>${motorbike.price} USD</td>
              </tr>
              <tr>
                <td>Tax fee</td>
                <td>${(motorbike.price * 0.15).toFixed(2)} USD</td>
              </tr>
              <tr>
                <td>Total payment</td>
                <td>${(motorbike.price * 1.15).toFixed(2)} USD</td>
              </tr>
              <tr>
                <td>Guarantee</td>
                <td>12 months</td>
              </tr>
            </tbody>
          </table>
          {isReserved ? (
            <button onClick={handleCancel} className="btn-lg active">
              Cancel Reservation
            </button>
          ) : (
            <Link to={`/reservations/new/${motorbike.id}`} className="btn-lg active">
              Reserve
            </Link>
          )}
        </div>
      </section>
    </>
  );
};

export default Details;