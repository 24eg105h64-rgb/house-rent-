import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      navigate("/");
    }, 700);
  };

  return (
    <div className="auth-page container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-xl-5">
          <div className="card shadow-sm border-0 rounded-4 p-4">
            <div className="card-body">
              <h2 className="card-title mb-3">Welcome Back</h2>
              <p className="text-muted mb-4">Enter your credentials to access dashboard features and saved listings.</p>

              {submitted && (
                <div className="alert alert-success" role="alert">
                  Login success! Redirecting to Home...
                </div>
              )}

              <form onSubmit={handleSubmit}>
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
                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
