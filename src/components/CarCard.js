import React from 'react';

function CarCard({ car, duration, distance }) {
    const computeRentalPrice = (car) => {
        const timeComponent = computeTimeComponent(car, duration);
        const distanceComponent = car.pricePerKm * distance;
        return timeComponent + distanceComponent;
    };

    const computeTimeComponent = (car, duration) => {
        let timeComponent = 0;

        switch (true) {
            case duration == 1:
                timeComponent = car.pricePerDay;
                break;
            case duration > 1 && duration < 5:
                timeComponent = car.pricePerDay * (1 + 0.9 * (duration - 1));
                break;
            case duration > 4 && duration < 11:
                timeComponent = car.pricePerDay * (1 + 0.9 * 3 + 0.7 * (duration - 4));
                break;
            case duration > 10:
                timeComponent = car.pricePerDay * (1 + 0.9 * 3 + 0.7 * (duration - 4));
                break;
            default:
                timeComponent = 0;
        }

        return timeComponent;
    };

    const formatPrice = (price) => {
        return (price / 100).toLocaleString('en-US', { style: 'currency', currency: 'EUR' });
    };

    return (
        <div className="car-card">
            <img src={car.picturePath} alt={car.brand} className="car-image" />
            <p className="car-title">
                <strong>
                    {car.brand} {car.model}
                </strong>
            </p>
            <p className="car-info">Price per day: {formatPrice(car.pricePerDay)}</p>
            <p className="car-info">Price per km: {formatPrice(car.pricePerKm)}</p>
            <p className="car-price">Rental price: {formatPrice(computeRentalPrice(car))}</p>
        </div>
    );
}

export default CarCard;
