import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatNumber } from "../helpers";

const App = () => {
    const [menus, setMenus] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [contentModal, setContentModal] = useState("");

    const getMenus = async (query = "") => {
        setIsLoading(true);
        await axios.get(`api/get/menus?q=${query}`).then(
            (response) => {
                setIsLoading(false);
                setMenus(response.data.menus);
            },
            (error) => {
                console.log(error);
                setIsLoading(false);
                setMenus([]);
            }
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        getMenus(search);
    };

    const handleModal = (menu) => {
        console.log(menu);
    };

    const handleReset = () => {
        setSearch("");
        getMenus();
    };

    useEffect(() => {
        getMenus();
    }, []);

    const listMenus = isLoading ? (
        <div className="text-center w-100">
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    ) : menus.length == 0 ? (
        <div className="">Data tidak ditemukan!</div>
    ) : (
        menus.map((menu, key) => (
            <div key={key} className="col-4">
                <div className="card text-center br-theme mb-3">
                    <img
                        draggable="false"
                        src={menu.img}
                        className="w-100 img-menu mx-auto pt-3 pb-1 pl-1 pr-1"
                    />
                    <div className="">
                        <h5 className="f-bold mb-0 cl-theme">{menu.name}</h5>
                        <h6 className="text-secondary mb-0">
                            {formatNumber(menu.price)}
                        </h6>
                        <div className="p-3">
                            <div
                                className="btn btn-warning cl-theme br-theme w-100 f-bold pt-1 pb-1"
                                onClick={() => handleModal(menu)}
                            >
                                Lihat
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))
    );

    return (
        <>
            <nav className="navbar navbar-dark fixed-top navbar-expand-lg bg-theme mb-3">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        Caffe
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Link
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Action
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Another action
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Something else here
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="space"></div>
            <div className="container">
                <form
                    className="d-flex mb-3"
                    role="search"
                    onSubmit={(event) => handleSubmit(event)}
                >
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onInput={(event) => {
                            setSearch(event.target.value);
                        }}
                        id="search"
                        autoComplete="off"
                        value={search}
                    />
                    <button
                        className="cl-theme-hover btn btn-outline-theme bi bi-search me-2"
                        type="submit"
                    ></button>
                    <button
                        className="cl-theme-hover btn btn-outline-theme bi bi-arrow-clockwise"
                        type="button"
                        onClick={(event) => handleReset()}
                    ></button>
                </form>
                <div className="row">{listMenus}</div>
            </div>
            <div className="container fixed-bottom bg-theme text-center">
                <div className="btn btn-outline-light m-3">Open Modal</div>
            </div>
        </>
    );
};

export default App;
