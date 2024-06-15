class Api::V1::ReservationsController < ApplicationController
  before_action :authorize_request
  before_action :set_reservation, only: [:destroy]

  def index
    @reservations = Reservation.includes(:motorbike, :user).where(user_id: @current_user)
    render json: @reservations.to_json(include: { motorbike: {}, user: {} })
  end

  def create
    @reservation = Reservation.new(reservation_params)
    @reservation.user = @current_user

    if @reservation.save
      render json: @reservation, status: :created
    else
      render json: @reservation.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @reservation.destroy
      render json: { message: 'Reservation deleted successfully' }, status: :ok
    else
      render json: { error: 'Failed to delete reservation' }, status: :unprocessable_entity
    end
  end

  private

  def set_reservation
    @reservation = Reservation.find(params[:id])
  end

  def reservation_params
    params.require(:reservation).permit(:date, :city, :motorbike_id)
  end
end
