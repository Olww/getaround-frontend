import React from 'react';

function Filter({ duration, setDuration, distance, setDistance }) {
    return (
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
    );
}

export default Filter;
