class User < ApplicationRecord
  has_secure_password

  has_many :reservations, dependent: :destroy

  validates :username, presence: true
  validates :password, presence: true, length: { minimum: 6 }, allow_nil: true

  def generate_jwt(user)
    JWT.encode({ id:, exp: 1.day.from_now.to_i, user_id: user.id }, Rails.application.secret_key_base)
  end

  def self.from_jwt(token)
    decoded = JWT.decode(token, Rails.application.secret_key_base)[0]
    find(decoded['id'])
  end
end
