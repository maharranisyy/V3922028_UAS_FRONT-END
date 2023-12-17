import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Form, Button, Table } from 'react-bootstrap';
import "./store.css";

function Store() {
  const containerStyle = {
    backgroundColor: '#E1EAF2',
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#ABC1E2',
  };

  const navLinkStyle = {
    color: '#000000',
    fontSize: '25px',
    lineHeight: '70px',
    textDecoration: 'none',
    padding: '0 20px',
  };

  const footerStyle = {
    backgroundColor: '#ABC1E2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70px',
  };

  const footerTextStyle = {
    fontSize: '18px',
    color: '#FFFFFF',
  };

  const [user, setUser] = useState([]);
  const [id, setId] = useState('');
  const [Toko, setToko] = useState('');
  const [Alamat, setAlamat] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const userData = await axios.get('http://localhost:8080/user');
    setUser(userData.data);
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus pengguna?');
    if (confirmDelete) {
      await axios.delete(`http://localhost:8080/Delete/user/${id}`);
      getUser();
    }
  };

  const updateUser = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const putData = await axios.put(`http://localhost:8080/Update/user/${id}`, {
        Toko: Toko,
        Alamat: Alamat,
      });

      alert('Berhasil Di Update');
      getUser();
      window.location.href = '/store';
    } catch (error) {
      if (error.response) {
        setError(error.response.data.messages);
      } else {
        setError('Data Gagal diubah');
      }
    } finally {
      setLoading(false);
    }
  };

  const showModal = (data) => {
    setId(data.id);
    setToko(data.Toko);
    setAlamat(data.Alamat);
    setShow(true);
  };

  const closeModal = () => {
    setId('');
    setToko('');
    setAlamat('');
    setShow(false);
    setError(null);
  };

  return (
    <div style={containerStyle}>
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Form Update Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateUser}>
            <Form.Group className="mb-3" controlId="formToko">
              <Form.Label>Toko</Form.Label>
              <Form.Control type="text" autoFocus onChange={(e) => setToko(e.target.value)} value={Toko} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAlamat">
              <Form.Label>Alamat</Form.Label>
              <Form.Control type="text" onChange={(e) => setAlamat(e.target.value)} value={Alamat} />
            </Form.Group>
            <Button type="submit" variant="primary" className="px-4" disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </Button>
            {error && <p className="text-danger">{error}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal} disabled={loading}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        <caption className="table-caption">Offline Store</caption>
        <Link to={'/addStore'} className="custom-button">
          {' '}
          Tambah Data{' '}
        </Link>
        <Table caption="Offline Store" className="table-container">
          <thead>
            <tr>
              <th>No</th>
              <th>Toko</th>
              <th>Alamat</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((userData, index) => (
              <tr key={userData.id}>
                <td>{index + 1}</td>
                <td>{userData.Toko}</td>
                <td>{userData.Alamat}</td>
                <td className="action-buttons">
                    <div>
                        <button onClick={() => showModal(userData)} className="custom-button">
                    Edit
                  </button>
                  </div>
                  <div>
                    <button onClick={() => deleteUser(userData.id)} className="custom-button-delete">
                    Hapus
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Store;
