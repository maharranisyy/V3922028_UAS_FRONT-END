/*eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../store/Add.css';

const Add = () => {
  const containerStyle = {
    backgroundColor: "#E1EAF2",
    position: "relative",
    width: "100%",
    minHeight: "100vh",
  };

  const navStyle = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#ABC1E2",
  };

  const navLinkStyle = {
    color: "#000000",
    fontSize: "25px",
    lineHeight: "70px",
    textDecoration: "none",
    padding: "0 20px",
  };

  const contentContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexWrap: "wrap",
  };

  const contentStyle = {
    textAlign: "center",
    padding: "150px",
    maxWidth: "50%",
  };

  const buttonStyle = {
    fontSize: "15px",
    padding: "5px 10px",
    backgroundColor: "#0088cc",
    color: "#ffffff",
    borderRadius: "10px",
    textDecoration: "none",
  };

  const footerStyle = {
    backgroundColor: "#ABC1E2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70px",
    width: "100%",  
    position: "fixed", 
    bottom: 0,  
  };

  const footerTextStyle = {
    fontSize: "18px",
    color: "#FFFFFF",
  };

  const [Toko, setToko] = useState('');
  const [Alamat, setAlamat] = useState('');
  const navigate = useNavigate();

  const handlesSubmit = async (e) => {
    if (Toko === "" || Alamat === "") {
        alert('Terjadi Kesalahan, Silahkan Coba Lagi!');
    } else {
        try {
            e.preventDefault();
            await axios.post('http://localhost:8080/Add/user', {
                Toko: Toko,
                Alamat: Alamat
            });
            window.location.href = '/store';  // Corrected line
            
            alert('Berhasil Ditambahkan!');
            navigate('/store');
        } catch (error) {
            alert('Terjadi Kesalahan, Silahkan Coba Lagi!');
            console.error('Error adding user:', error);
        }
    }
};

  
  return (
    <div style={containerStyle}>
      <div style={contentContainerStyle}>
        <form style={contentStyle} onSubmit={handlesSubmit}>
          <fieldset>
            <legend className="table-caption">FORM INPUT DATA</legend>
            <div className="field">
              <label htmlFor="Toko" className="label">
                Toko
              </label>
              <input
                type="text"
                id="Toko"
                className="input"
                value={Toko}
                onChange={(e) => setToko(e.target.value)}
                placeholder="Toko"
              />
            </div>
            <div className="field">
              <label htmlFor="Alamat" className="label">
                Alamat
              </label>
              <input
                type="text"
                id="Alamat"
                className="input"
                value={Alamat}
                onChange={(e) => setAlamat(e.target.value)}
                placeholder="Alamat"
              />
            </div>
            <div>
              <button type="submit" style={buttonStyle}>
                Tambahkan Data
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );

};

export default Add;