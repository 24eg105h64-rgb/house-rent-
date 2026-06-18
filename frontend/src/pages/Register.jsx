import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "Renter" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="auth-page container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-xl-5">
          <div className="card shadow-sm border-0 rounded-4 p-4">
            <div className="card-body">
              <h2 className="card-title mb-3">Create an Account</h2>
              <p className="text-muted mb-4">Register now and start listing properties or booking your favorite rental.</p>

              {submitted && (
                <div className="alert alert-success" role="alert">
                  Registration complete. You can now login.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Minimum 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Account type</label>
                  <select
                    name="role"
                    className="form-select"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="Renter">Renter</option>
                    <option value="Owner">Owner</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
