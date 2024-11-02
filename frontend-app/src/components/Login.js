import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate(); // Ініціалізація useNavigate

    const handleLogin = () => {
        // Тут можна додати вашу логіку авторизації, якщо потрібно
        navigate('/medicine'); // Перехід на дашборд після входу
    };

    const handleRegister = () => {
        navigate('/registration'); // Перехід на сторінку реєстрації
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
                        <img src="https://veslava.com.ua/wp-content/uploads/2019/12/%D0%97%D0%BD%D0%B0%D0%B5%D1%82%D0%B5-%D0%BB%D0%B8-%D0%92%D1%8B-%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B5%D1%81%D0%BD%D1%8B%D0%B5-%D1%84%D0%B0%D0%BA%D1%82%D1%8B-%D0%BE-%D0%BC%D0%B5%D0%B4%D0%B8%D1%86%D0%B8%D0%BD%D0%B5.jpg" className="img-fluid" alt="Sample" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>
                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <p className="lead fw-normal mb-0 me-3 text-white">Sign in with</p>
                                <button type="button" className="btn social-btn mx-1">
                                    <i className="fab fa-facebook-f"></i>
                                </button>
                                <button type="button" className="btn social-btn mx-1">
                                    <i className="fab fa-twitter"></i>
                                </button>
                                <button type="button" className="btn social-btn mx-1">
                                    <i className="fab fa-linkedin-in"></i>
                                </button>
                            </div>

                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0 text-white">Or</p>
                            </div>

                            <div className="form-outline mb-9"><br></br>
                                <input type="email" id="form3Example3" className="form-control form-control-lg"
                                    placeholder="Enter a valid email address" />
                                <label className="form-label text-white" htmlFor="form3Example3">Email address</label>
                            </div>

                            <div className="form-outline mb-3"><br></br>
                                <input type="password" id="form3Example4" className="form-control form-control-lg"
                                    placeholder="Enter password" />
                                <label className="form-label text-white" htmlFor="form3Example4">Password</label>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check mb-0">
                                    <input className="form-check-input me-2" type="checkbox" id="form2Example3" />
                                    <label className="form-check-label text-white" htmlFor="form2Example3">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#!" className="text-white">Forgot password?</a>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="button" className="btn btn-primary btn-lg"
                                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} onClick={handleLogin}>Login</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0 text-white">Don't have an account? 
                                    <a href="#!" className="link-danger" onClick={handleRegister}> Register</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                <div className="text-white mb-3 mb-md-0">
                    Copyright © 2024. All rights reserved.
                </div>
                <div>
                    <a href="#!" className="text-white me-4">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#!" className="text-white me-4">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#!" className="text-white me-4">
                        <i className="fab fa-google"></i>
                    </a>
                    <a href="#!" className="text-white">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </div>
            
            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/7.1.0/mdb.min.js"></script>
        </section>
    );
}
