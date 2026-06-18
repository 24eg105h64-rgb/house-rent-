import { useState } from "react";

function AddProperty() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    type: "Renter",
    image: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 rounded-4 p-4">
            <div className="card-body">
              <h2 className="card-title mb-3">Add a New Property</h2>
              <p className="text-muted mb-4">
                Use this form to prepare property details and post them once backend connectivity is enabled.
              </p>

              {submitted && (
                <div className="alert alert-success" role="alert">
                  Property submission saved locally. Connect backend later to persist.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Property Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="Modern 2BR apartment"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      name="location"
                      className="form-control"
                      placeholder="Downtown, Springfield"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-4">
                    <label className="form-label">Price / month</label>
                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      placeholder="1500"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Bedrooms</label>
                    <input
                      type="number"
                      name="bedrooms"
                      className="form-control"
                      placeholder="2"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Bathrooms</label>
                    <input
                      type="number"
                      name="bathrooms"
                      className="form-control"
                      placeholder="1"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Property Type</label>
                    <select
                      name="type"
                      className="form-select"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option value="Renter">Renter</option>
                      <option value="Owner">Owner</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Image URL</label>
                    <input
                      type="url"
                      name="image"
                      className="form-control"
                      placeholder="https://..."
                      value={formData.image}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary px-4">
                  Save Property
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProperty;
