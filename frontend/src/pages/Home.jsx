import { Link } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";

const featuredProperties = [
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
];

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section rounded-4 overflow-hidden mb-5">
        <div className="hero-content container py-5 text-white text-center">
          <p className="text-uppercase text-warning mb-2 small fw-bold">Premium House Rentals</p>
          <h1 className="display-5 fw-bold mb-3">Find your next home with RentEase</h1>
          <p className="lead text-white-75 mb-4">
            Browse beautifully curated rental listings, explore property details, and connect with owners through a clean, responsive experience built for modern renters.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-column flex-sm-row">
            <Link to="/properties" className="btn btn-light btn-lg px-4">
              Browse Properties
            </Link>
            <Link to="/add-property" className="btn btn-outline-light btn-lg px-4">
              List Your Property
            </Link>
          </div>
        </div>
      </section>

      <section className="container mb-5">
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="feature-box p-4 rounded-4 h-100 shadow-sm">
              <h5 className="fw-bold">Mobile Friendly</h5>
              <p className="text-muted mb-0">Accessible browsing on any device with a responsive layout.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-box p-4 rounded-4 h-100 shadow-sm">
              <h5 className="fw-bold">Clean Design</h5>
              <p className="text-muted mb-0">A simple user interface that focuses on listings and navigation.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-box p-4 rounded-4 h-100 shadow-sm">
              <h5 className="fw-bold">Ready for Backend</h5>
              <p className="text-muted mb-0">Easily connect the frontend to a Node/Express API later.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mb-5">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h2 className="fw-bold mb-1">Featured Rentals</h2>
            <p className="text-muted mb-0">Hand-picked properties for fast browsing.</p>
          </div>
          <Link to="/properties" className="text-decoration-none">
            View all properties
          </Link>
        </div>
        <div className="row g-4">
          {featuredProperties.map((property) => (
            <div key={property.id} className="col-md-4">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
