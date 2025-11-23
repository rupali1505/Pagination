import { useEffect, useState } from "react";
import "./Pagination.css";

export function EmployeeTable({ employees }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Pagination() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const url =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    fetch(url)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => alert("failed to fetch data"));
  }, []);

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = data.slice(startIndex, startIndex + pageSize);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) =>prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev)=>prev + 1);
    }
  };

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>Employee Data Table</h2>
      <EmployeeTable employees={currentData} />

      <div style={{ marginTop: 20 }}>
        <button
          onClick={handlePrev}
          style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: "pointer" }}
        >
          Previous
        </button>
        <button style={{ margin: "0 10px" }}>{currentPage}</button>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
