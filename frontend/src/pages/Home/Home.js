import React from 'react';
import { SiBosch } from "react-icons/si";
import { Link } from "react-router-dom"
import "./Home.scss";
import heroImg from "../../assets/inv-img.png"
import { ShowOnLogin, ShowOnLogout } from '../../components/protect/hiddenLinks';

const Home = () =>
{
    return (
        <div className='home'>
            <nav className='container --flex-between'>
                <div className='logo'>
                    <SiBosch size={35} />
                </div>
                <ul className='home-links'>
                    <ShowOnLogout>


                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </ShowOnLogout>
                    <ShowOnLogout>

                        <li>
                            <button className='--btn --btn-primary'>

                                <Link to="/login">Login</Link>
                            </button>
                        </li>
                    </ShowOnLogout>
                    <ShowOnLogin>
                        <li>
                            <button className='--btn --btn-primary'>

                                <Link to="/dashboard">Dashboard</Link>
                            </button>
                        </li>
                    </ShowOnLogin>
                </ul>
            </nav>
            <section className='container hero'>
                <div className='hero-text'>
                    <h2>Inventory & Stock Managgment</h2>
                    <p> An inventory management system (or inventory system) is the process by which you track your goods throughout your entire supply chain, from purchasing to production to end sales. It governs how you approach inventory management for your business</p>
                </div>
                <div className='hero-image'>
                    <img src={heroImg} alt="Inventory" />
                </div>

            </section>
        </div>
    )
}

export default Home