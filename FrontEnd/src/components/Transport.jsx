import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';


import Header from './Header';
import Footer from './Footer';

const Transport = () => {
    const [vehicles, setVehicles] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/vehicle');
                setVehicles(response.data);
            } catch (error) {
                console.error('Error fetching vehicles:', error);
                setError('Failed to load vehicles. Please try again later.');
            }
        };

        fetchVehicles();
    }, []);

    const handleBookNow = async (vehicleId) => {
        try 
        {
            const res = await axios.get(`http://localhost:5000/vehicle/${vehicleId}`)
            navigate('/booking', {state: { booking: res.data }})
        } 
        catch (error) {
            console.error('Error fetching vehicle:', error);
        }
        //alert(`Booking for ${vehicles.companyName} is not implemented yet.`);
    };

    return (
       <>
          <Header />
            
          <div className="container mt-5 ">
            <h1>Available Vehicles</h1>
            {error && <div className="text-danger">{error}</div>}
            <div className="row">
                {vehicles.map((vehicle) => (
                    <div className="col-md-4 mb-4" key={vehicle._id}>
                        <div className="card">
                            <img
                                src={vehicle.imageURL} 
                                className="card-img-top"
                                alt={vehicle.companyName}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/300'; 
                                }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{vehicle.companyName}</h5>
                                <p className="card-text">Type: {vehicle.vehicleType}</p>
                                <p className="card-text">Max Load: {vehicle.maxLoad} kg</p>
                                <p className="card-text">Rent: ${vehicle.rentPerKilometer}/km</p>
                                <button className="btn btn-primary" onClick={() => handleBookNow(vehicle._id)}>
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <Footer />
 </>
        
    );
};

export default Transport;
