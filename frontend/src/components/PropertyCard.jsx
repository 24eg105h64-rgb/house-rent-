const PropertyCard = ({ property }) => {
  const { title, location, price, image, bedrooms, bathrooms, type } = property;

  return (
    <div className="card property-card h-100 overflow-hidden shadow-sm border-0">
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="badge bg-primary text-uppercase fs-7">{type}</span>
          <span className="text-success fw-semibold">${price}/mo</span>
        </div>
        <h5 className="card-title mb-2">{title}</h5>
        <p className="card-text text-muted mb-3">{location}</p>
        <div className="mb-3">
          <span className="badge bg-secondary me-2">{bedrooms} Beds</span>
          <span className="badge bg-secondary">{bathrooms} Baths</span>
        </div>
        <button type="button" className="btn btn-outline-primary mt-auto">
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
