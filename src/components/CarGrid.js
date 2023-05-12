import React from 'react';
import CarCard from './CarCard';

function CarGrid({ cars, distance, duration, pageStart, pageEnd }) {
    return (
        <div className="car-grid">
            {cars ? (
                cars.slice(pageStart, pageEnd).map((car, index) => (
                    <CarCard
                        key={index}
                        car={car}
                        distance={distance}
                        duration={duration}
                    />
                ))
            ) : (
                <p>Loading cars...</p>
            )}
        </div>
    );
}

export default CarGrid;
