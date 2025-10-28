import { Link, useSearchParams,useLoaderData } from 'react-router-dom';
import { getVans } from "../../api";




export function loader() {
    return getVans()
}

export default function Vans() {

    // useSearchParams returns an array: [currentQueryParams, setQueryParams
    const [searchParams] = useSearchParams();
    const vans = useLoaderData()

    // Get the value of the "type" query parameter (type=simple → "simple")
    const typeFilter = searchParams.get('type');


    // Filter the vans based on the type query parameter (if present)
    const displayedVans = typeFilter
        ? vans.filter(van => van.type === typeFilter)
        : vans;


    const vanElements = displayedVans.map(van => (
        <div key={van.id} className="van-tile">
            {/* 
                Link to a dynamic route for each van (e.g., /vans/1)
                This allows navigation to the van detail page
            */}
            <Link to={van.id}>
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
                >Simple</Link>
                <Link 
                    to="?type=luxury"
                    className="van-type luxury"
                >Luxury</Link>
                <Link 
                    to="?type=rugged"
                    className="van-type rugged"
                >Rugged</Link>

                {typeFilter ?
                (<Link 
                    to="."
                    className="van-type simple"
                >Clear</Link> 
                ): null}
            
            </div>


            {/* Render the list of van cards */}
            <div className="van-list">
                {vanElements}
            </div>
        </div>
    );
}
