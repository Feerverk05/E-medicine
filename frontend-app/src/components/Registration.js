import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/'); 
  };
    return (
      <section className="vh-100">
      <head>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/7.1.0/mdb.min.css" rel="stylesheet" />
      </head>
      
      <style>
          {`
          body {
              background-color: #2d2d2d;
          }
          .divider:after,
          .divider:before {
              content: "";
              flex: 1;
              height: 1px;
              background: #eee;
          }
          .h-custom {
              height: calc(100% - 73px);
          }
          @media (max-width: 450px) {
              .h-custom {
                  height: 100%;
              }
          }
          .form-control {
              background-color: rgba(255, 255, 255, 0.1);
              border: 2px solid rgba(255, 255, 255, 0.3) !important;
              color: white;
              border-radius: 8px;
          }
          .form-control:focus {
              background-color: rgba(255, 255, 255, 0.2);
              color: white;
              border-color: #4a90e2 !important;
              box-shadow: 0 0 0 0.2rem rgba(74, 144, 226, 0.25);
          }
          .social-btn {
              color: #4a90e2 !important;
              background-color: rgba(255, 255, 255, 0.1);
              border-radius: 50%;
              width: 40px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.3s ease;
          }
          .social-btn:hover {
              background-color: rgba(255, 255, 255, 0.2);
              transform: translateY(-2px);
          }
          `}
      </style>
      
      <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                  <img src="https://img.freepik.com/free-photo/medical-banner-with-doctor-wearing-goggles_23-2149611193.jpg" width = "1600px"className="img-fluid" alt="Sample" />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 text-white">Sign up</p>
              <form class="mx-1 mx-md-4">

<div class="d-flex flex-row align-items-center mb-4">
  <i class="fas fa-user fa-lg me-3 fa-fw"></i>
  <div data-mdb-input-init class="form-outline flex-fill mb-0"><br></br>
    <input type="text" id="form3Example1c" class="form-control" placeholder="Your Name"/>
    <label class="form-label text-white" for="form3Example1c">Your Name</label>
  </div>
</div>

<div class="d-flex flex-row align-items-center mb-4">
  <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
  <div data-mdb-input-init class="form-outline flex-fill mb-0"><br></br>
    <input type="email" id="form3Example3c" class="form-control" placeholder="Your Email"/>
    <label class="form-label text-white" for="form3Example3c">Your Email</label>
  </div>
</div>

<div class="d-flex flex-row align-items-center mb-4">
  <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
  <div data-mdb-input-init class="form-outline flex-fill mb-0"><br></br>
    <input type="password" id="form3Example4c" class="form-control" placeholder="Password" />
    <label class="form-label text-white" for="form3Example4c">Password</label>
  </div>
</div>

<div class="d-flex flex-row align-items-center mb-4">
  <i class="fas fa-key fa-lg me-3 fa-fw"></i>
  <div data-mdb-input-init class="form-outline flex-fill mb-0"><br></br>
    <input type="password" id="form3Example4cd" class="form-control" placeholder="Repeat your password"/>
    <label class="form-label text-white" for="form3Example4cd">Repeat your password</label>
  </div>
</div>

<div class="form-check d-flex justify-content-center mb-5">
  <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
  <label class="form-check-label text-white" for="form2Example3">
    I agree all statements in <a href="#!">Terms of service</a>
  </label>
</div>

<div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
<button type="button" className="btn btn-primary btn-lg" onClick={handleRegister}>
                Register
              </button>
</div>
                  </form>
              </div>
          </div>
      </div>
      
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/7.1.0/mdb.min.js"></script>
  </section>
);
}