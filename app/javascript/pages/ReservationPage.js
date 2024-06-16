import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { getReservations, cancelReservation } from '../redux/reservation/reservationSlice';

const Reservation = () => {
  const dispatch = useDispatch();
  const { content, isLoading, error } = useSelector((store) => store.reservations);

  useEffect(() => {
    dispatch(getReservations());
  }, [dispatch]);

  const handleCancel = (reservationId) => {
    dispatch(cancelReservation(reservationId));
  };

  if (isLoading) {
    return (
      <div className="loadingPage">
        <img src="https://www.sellanybike.com/front-assets/images/333.gif" alt="Loading" />
      </div>
    );
  }

  if (error) {
    return (
      <h1>
        Something went wrong! {error}
      </h1>
    );
  }

  if (content) {
    return (
      <>
        <Navigation />
        <section>
          <div className="reservation-page">
            <table>
              <caption><h2>List of my reservations</h2></caption>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>City</th>
                  <th>Brand</th>
                  <th>Model</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {content.map((resv) => (
                  <tr key={resv.id}>
                    <td>{resv.date}</td>
                    <td>{resv.city}</td>
                    <td>{resv.motorbike && resv.motorbike.name}</td>
                    <td>{resv.motorbike && resv.motorbike.model}</td>
                    <td>
                      {resv.motorbike && (
                        <Link to={`/motorbikes/${resv.motorbike.id}`} key={resv.motorbike.id}>View</Link>
                      )}
                      <button className="btn-lg active space" onClick={() => handleCancel(resv.id)}>Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </>
    );
  }

  return null;
};

export default Reservation;