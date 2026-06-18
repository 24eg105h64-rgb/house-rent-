import { useMemo, useState } from "react";
import PropertyCard from "../components/PropertyCard";

const propertyList = [
  {
    id: 1,
    title: "Modern Studio in Downtown",
    location: "Oakwood Avenue, Springfield",
    price: 1050,
    bedrooms: 1,
    bathrooms: 1,
    type: "Renter",
    image: "https://images.unsplash.com/photo-1560185127-6c6d6c7b44d2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Family Home with Garden",
    location: "Maple Street, Brookside",
    price: 2175,
    bedrooms: 3,
    bathrooms: 2,
    type: "Owner",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Cozy Apartment Near Transit",
    location: "Cedar Road, Midtown",
    price: 1499,
    bedrooms: 2,
    bathrooms: 1,
    type: "Renter",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    title: "Luxury Townhouse with Terrace",
    location: "Riverfront Drive, West End",
    price: 2890,
    bedrooms: 4,
    bathrooms: 3,
    type: "Owner",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    title: "Bright Loft with City View",
    location: "Park Lane, Uptown",
    price: 1780,
    bedrooms: 2,
    bathrooms: 2,
    type: "Renter",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    title: "Comfortable Family Residence",
    location: "Sunset Boulevard, Meadow Hills",
    price: 1995,
    bedrooms: 3,
    bathrooms: 2,
    type: "Owner",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
  },
];

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProperties = useMemo(
    () =>
      propertyList.filter((property) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          property.title.toLowerCase().includes(searchLower) ||
          property.location.toLowerCase().includes(searchLower) ||
          property.type.toLowerCase().includes(searchLower)
        );
      }),
    [searchTerm]
  );

  return (
    <div className="properties-page">
      <div className="d-flex flex-column flex-md-row align-items-start justify-content-between gap-3 mb-4">
        <div>
          <h1 className="fw-bold mb-1">Explore Listings</h1>
          <p className="text-muted mb-0">Search by location, type, or property name.</p>
        </div>
        <div className="w-100 w-md-50">
          <input
            type="search"
            className="form-control"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </div>

      <div className="row g-4">
        {filteredProperties.map((property) => (
          <div key={property.id} className="col-md-6 col-xl-4">
            <PropertyCard property={property} />
          </div>
        ))}
        {filteredProperties.length === 0 && (
          <div className="col-12">
            <div className="alert alert-warning mb-0">No properties matched your search.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
