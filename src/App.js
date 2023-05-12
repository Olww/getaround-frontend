import React, { useEffect, useState } from 'react';
import './index.css';

function App() {
    const [cars, setCars] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(12);

    useEffect(() => {
        fetch('/cars.json')
            .then((response) => response.json())
            .then((data) => setCars(data))
            .catch((error) => console.log(error));
    }, []);

    const totalPages = Math.ceil(cars.length / perPage);
    const pageStart = (page - 1) * perPage;
    const pageEnd = pageStart + perPage;

    const handlePrevPage = () => {
        setPage(Math.max(page - 1, 1));
    };

    const handleNextPage = () => {
        setPage(Math.min(page + 1, totalPages));
    };

    return (
        <div>
            <nav className="navbar">
                <h1>Cars Rental</h1>
            </nav>
            <div className="car-grid">
                {cars.slice(pageStart, pageEnd).map((car, index) => (
                    <div key={index} className="car-card">
                        <img src={car.picturePath} alt={car.brand} className="car-image" />
                        <p>
                            <strong>{car.brand} {car.model}</strong>
                        </p>
                        <p>Price per day: {car.pricePerDay}</p>
                        <p>Price per km: {car.pricePerKm}</p>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button className="pagination-button" onClick={handlePrevPage} disabled={page === 1}>Prev</button>
                <span className="pagination-info">{page} / {totalPages}</span>
                <button className="pagination-button" onClick={handleNextPage} disabled={page === totalPages}>Next</button>
            </div>
        </div>
    );
}

export default App;
