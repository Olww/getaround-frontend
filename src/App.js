import React, { useEffect, useState } from 'react';
import './index.css';

function App() {
    const [cars, setCars] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(12);
    const [duration, setDuration] = useState(1);
    const [distance, setDistance] = useState(50);

    useEffect(() => {
        fetchData();
    }, [page, duration, distance]);

    const fetchData = () => {
        fetch(`/cars.json?duration=${duration}&distance=${distance}`)
            .then((response) => response.json())
            .then((data) => {
                if (data && Array.isArray(data)) {
                    setCars(data);
                } else {
                    console.log('Invalid response from server:', data);
                }
            })
            .catch((error) => console.log('Error fetching data:', error));
    };

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
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Cars</a></li>
                    <li><a href="#">Contact Us</a></li>
                </ul>
            </nav>
            <div className="filter">
                <div className="duration">
                    <label htmlFor="duration">Duration:</label>
                    <select name="duration" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)}>
                        {[...Array(30)].map((_, index) => (
                            <option key={index} value={index + 1}>
                                {index + 1} {index + 1 === 1 ? 'day' : 'days'}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="distance">
                    <label htmlFor="distance">Distance:</label>
                    <select name="distance" id="distance" value={distance} onChange={(e) => setDistance(e.target.value)}>
                        {[...Array(30)].map((_, index) => (
                            <option key={index} value={(index + 1) * 50}>
                                {(index + 1) * 50} km
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="car-grid">
                {cars ? (
                    cars.slice(pageStart, pageEnd).map((car, index) => (
                        <div key={index} className="car-card">
                            <img src={car.picturePath} alt={car.brand} className="car-image" />
                            <p>
                                <strong>{car.brand} {car.model}</strong>
                            </p>
                            <p>Price per day: {car.pricePerDay}</p>
                            <p>Price per km: {car.pricePerKm}</p>
                        </div>
                    ))
                ) : (
                    <p>Loading cars...</p>
                )}
            </div>
            <div className="pagination">
                <button className="pagination-button" onClick={handlePrevPage} disabled={page === 1}>Prev</button>
                <span className="pagination-info">{page}</span>
                <button className="pagination-button" onClick={handleNextPage} disabled={!cars || cars.length < 10}>Next</button>
            </div>
        </div>
    );
}

export default App;