import React, { useEffect, useState } from "react";
import { Table, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import arrow from "./arrow.svg";
import searchIcon from "./search.svg";

const UserTable = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const pageNumber = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                "https://jsonplaceholder.typicode.com/posts"
            );
            setData(result.data);
        };

        fetchData();
    }, []);

    const filteredData = data
        .filter((item) =>
            Object.values(item).some((s) =>
                s.toString().toLowerCase().includes(search.toString().toLowerCase())
            )
        )
        .sort((a, b) => {
            if (sortField === null) return 0;
            if (sortDirection) {
                return a[sortField] > b[sortField] ? 1 : -1;
            } else {
                return a[sortField] < b[sortField] ? 1 : -1;
            }
        });

    const paginatedData = filteredData.slice(
        (pageNumber - 1) * 10,
        pageNumber * 10
    );

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredData.length / 10); i++) {
        pageNumbers.push(i);
    }

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(!sortDirection);
        } else {
            setSortField(field);
            setSortDirection(true);
        }
    };

    return (
        <div>
            <div class="input-icon">
                <img src={searchIcon} alt="search" className="icon" />
                <input
                    type="text"
                    placeholder="Поиск"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {filteredData.length ? (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort("id")}>
                                    <span>ID</span> {sortField !== "id" ? <img src={arrow} alt="sort" /> : sortDirection ? <img src={arrow} alt="up" style={{ transform: 'rotate(180deg)' }} /> : <img src={arrow} alt="down" />}
                                </th>
                                <th onClick={() => handleSort("title")}>
                                    <span>Заголовок</span> {sortField !== "title" ? <img src={arrow} alt="sort" /> : sortDirection ? <img src={arrow} alt="up" style={{ transform: 'rotate(180deg)' }} /> : <img src={arrow} alt="down" />}
                                </th>
                                <th onClick={() => handleSort("body")}>
                                    <span>Описание</span> {sortField !== "body" ? <img src={arrow} alt="sort" /> : sortDirection ? <img src={arrow} alt="up" style={{ transform: 'rotate(180deg)' }} /> : <img src={arrow} alt="down" />}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((post) => (
                                <tr key={post.id}>
                                    <td className="postid">{post.id}</td>
                                    <td className="posttext">{post.title}</td>
                                    <td className="posttext">{post.body}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="pag">
                        <button
                            disabled={pageNumber <= 1}
                            onClick={() => navigate(`/page/${parseInt(pageNumber) - 1}`)}
                            className="btnstyle"
                        >
                            Назад
                        </button>
                        <div className="pag-element">
                            {pageNumbers.map((num) => (
                                <button
                                    key={num}
                                    onClick={() => navigate(`/page/${num}`)}
                                    className={`pageButton ${num === parseInt(pageNumber) ? "active" : ""}`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                        <button
                            disabled={pageNumber >= pageNumbers.length}
                            onClick={() => navigate(`/page/${parseInt(pageNumber) + 1}`)}
                            className="btnstyle"
                        >
                            Далее
                        </button>
                    </div>
                </>
            ) : (
                <h3>Ничего не найдено.</h3>
            )}
        </div>
    );
};

export default UserTable;
