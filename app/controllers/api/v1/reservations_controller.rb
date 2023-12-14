class Api::V1::ReservationsController < ApplicationController
  # before_action :authenticate_user!

  def index
    @reservations = Reservation.all
    render json: @reservations
  end

  def new
    @reservation = Reservation.new
  end

  def create
    @reservation = Reservation.new(reservation_params)

    if @reservation.save
      render json: @reservation, status: :created
    else
      render json: @reservation.errors, status: :unprocessable_entity
    end
  end

  private

  def reservation_params
    params.require(:reservation).permit(:date, :city)
  end
end
