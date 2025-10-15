import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';

export default function Vans() {

    // useSearchParams returns an array: [currentQueryParams, setQueryParams]
    // This lets you read and update the query string in the URL (e.g., ?type=simple)
    const [searchParams, setSearchParams] = useSearchParams();

    // useState to hold the list of vans fetched from the API
    const [vans, setVans] = useState([]);

    // Get the value of the "type" query parameter (e.g., ?type=simple → "simple")
    const typeFilter = searchParams.get('type');

    // Fetch van data once when the component mounts
    useEffect(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => setVans(data.vans));
    }, []);

    // Filter the vans based on the type query parameter (if present)
    const displayedVans = typeFilter
        ? vans.filter(van => van.type === typeFilter)
        : vans;

    // Map through the filtered vans to create a list of clickable van cards
    const vanElements = displayedVans.map(van => (
        <div key={van.id} className="van-tile">
            {/* 
                Link to a dynamic route for each van (e.g., /vans/1)
                This allows navigation to the van detail page
            */}
            <Link to={`/vans/${van.id}`}>
                <img src={van.imageUrl} alt={`Image of ${van.name}`} />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                {/* Add a type badge (like "simple", "rugged", etc.) */}
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ));

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>

            <div className="van-list-filter-buttons">
                <Link 
                    to="?type=simple"
                    className="van-type simple"
                >Simple</Link><Link 
                    to="?type=luxury"
                    className="van-type luxury"
                >Luxury</Link>
                <Link 
                    to="?type=rugged"
                    className="van-type rugged"
                >Rugged</Link>
                <Link 
                    to="."
                    className="van-type simple"
                >Clear</Link>
            
            </div>


            {/* Render the list of van cards */}
            <div className="van-list">
                {vanElements}
            </div>
        </div>
    );
}
