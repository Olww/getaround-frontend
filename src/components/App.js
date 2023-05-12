import React, { useEffect, useState } from 'react';
import '../index.css';
import NavBar from './Navbar'
import Filter from './Filter';
import CarGrid from './CarGrid';
import Pagination from './Pagination';

function App() {
    const [cars, setCars] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(8);
    const [duration, setDuration] = useState(1);
    const [distance, setDistance] = useState(50);

    const pageStart = (page - 1) * perPage;
    const pageEnd = pageStart + perPage;

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

    return (
        <div>
            <NavBar />
            <Filter
                duration={duration}
                setDuration={setDuration}
                distance={distance}
                setDistance={setDistance}
            />
            <CarGrid
                cars={cars}
                distance={distance}
                duration={duration}
                pageStart={pageStart}
                pageEnd={pageEnd}
            />
            <Pagination
                page={page}
                setPage={setPage}
                perPage={perPage}
                cars={cars}
            />
        </div>
    );
}

export default App;
