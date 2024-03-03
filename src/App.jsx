import React, { useState, useEffect } from "react";

const City = ["Toshkent", "Samarqand", "Bukhara"];
const Position = ["React", "Nodejs", "JS"];
const TypePosition = ["junior", "middle", "senior", "team"];

const PupilManagement = () => {
  const [pupils, setPupils] = useState([]);
  const [selectedPupil, setSelectedPupil] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filterPosition, setFilterPosition] = useState(
    "Lavozim turini tanlang"
  );
  const [filterCity, setFilterCity] = useState("Manzilni tanlang");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedPupils = JSON.parse(localStorage.getItem("pupils")) || [];
    setPupils(storedPupils);
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setSelectedPupil(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const pupilData = Object.fromEntries(formData.entries());

    if (selectedPupil) {
      const updatedPupils = pupils.map((pupil) =>
        pupil.id === selectedPupil.id ? { ...pupil, ...pupilData } : pupil
      );
      setPupils(updatedPupils);
    } else {
      pupilData.id = pupils.length + 1;
      setPupils([...pupils, pupilData]);
    }

    localStorage.setItem("pupils", JSON.stringify(pupils));
    form.reset();
    toggleModal();
  };

  const editPupil = (id) => {
    const pupil = pupils.find((pupil) => pupil.id === id);
    setSelectedPupil(pupil);
    toggleModal();
  };

  const deletePupil = (id) => {
    const isConfirm = window.confirm("O'chirilsinmi ?");
    if (isConfirm) {
      const updatedPupils = pupils.filter((pupil) => pupil.id !== id);
      setPupils(updatedPupils);
      localStorage.setItem("pupils", JSON.stringify(updatedPupils));
    }
  };

  return (
    <div className="container">
      <div className="input-group my-4">
        <input
          type="text"
          className="form-control me-5"
          placeholder="Qidirmoq..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <select
          className="btn btn-warning me-2 rounded"
          value={filterPosition}
          onChange={(e) => setFilterPosition(e.target.value)}
        >
          {TypePosition.map((typeposition, index) => (
            <option key={index} value={typeposition}>
              {typeposition}
            </option>
          ))}
        </select>
        <select
          className="btn btn-dark me-2 rounded"
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
        >
          {City.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
        <button
          className="btn btn-outline-success rounded"
          onClick={toggleModal}
        >
          Qo'shish
        </button>
      </div>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Ism</th>
            <th scope="col">Familiya</th>
            <th scope="col">Manzil</th>
            <th scope="col">Lavozim</th>
            <th scope="col">Lavozim turi</th>
            <th scope="col">Maoshi</th>
            <th scope="col">Uylanganmi</th>
            <th scope="col" className="text-end">
              Amallar
            </th>
          </tr>
        </thead>
        <tbody>
          {pupils.map((pupil, index) => (
            <tr key={index}>
              <th scope="row">{pupil.id}</th>
              <td>{pupil.firstName}</td>
              <td>{pupil.lastName}</td>
              <td>{pupil.city}</td>
              <td>{pupil.position}</td>
              <td>{pupil.typePosition}</td>
              <td>{pupil.salary}</td>
              <td>{pupil.isMarried ? "Ha" : "Yo'q"}</td>
              <td className="text-end">
                <button
                  className="btn btn-outline-primary me-2"
                  onClick={() => editPupil(pupil.id)}
                >
                  Tahrirlash
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => deletePupil(pupil.id)}
                >
                  O'chirish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleFormSubmit}>
        <div
          className={`modal fade ${isModalOpen ? "show" : ""}`}
          tabIndex="-1"
          role="dialog"
          style={{ display: isModalOpen ? "block" : "none" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedPupil
                    ? "O'quvchini tahrirlash"
                    : "O'quvchi qo'shish"}
                </h5>
                <button type="button" className="close" onClick={toggleModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    Ism
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    defaultValue={selectedPupil ? selectedPupil.firstName : ""}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Familiya
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    defaultValue={selectedPupil ? selectedPupil.lastName : ""}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">
                    Manzil
                  </label>
                  <select
                    className="form-control"
                    id="city"
                    name="city"
                    defaultValue={selectedPupil ? selectedPupil.city : ""}
                    required
                  >
                    {City.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="position" className="form-label">
                    Lavozim
                  </label>
                  <select
                    className="form-control"
                    id="position"
                    name="position"
                    defaultValue={selectedPupil ? selectedPupil.position : ""}
                    required
                  >
                    {Position.map((position, index) => (
                      <option key={index} value={position}>
                        {position}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="typePosition" className="form-label">
                    Lavozim turi
                  </label>
                  <select
                    className="form-control"
                    id="typePosition"
                    name="typePosition"
                    defaultValue={
                      selectedPupil ? selectedPupil.typePosition : ""
                    }
                    required
                  >
                    {TypePosition.map((typeposition, index) => (
                      <option key={index} value={typeposition}>
                        {typeposition}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="salary" className="form-label">
                    Maoshi
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="salary"
                    name="salary"
                    defaultValue={selectedPupil ? selectedPupil.salary : ""}
                    required
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="isMarried"
                    name="isMarried"
                    defaultChecked={
                      selectedPupil ? selectedPupil.isMarried : false
                    }
                  />
                  <label className="form-check-label" htmlFor="isMarried">
                    Uylanganmi ?
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={toggleModal}
                >
                  Yopish
                </button>
                <button type="submit" className="btn btn-primary">
                  {selectedPupil ? "Saqlash" : "Qo'shish"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PupilManagement;
