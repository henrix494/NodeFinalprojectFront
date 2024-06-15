import "./App.css";
import table from "./assets/table.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import Tippy from "@tippyjs/react";
import TableOp from "./components/TableOp";
import "tippy.js/dist/tippy.css";
function App() {
  const [numOfTables, setNumOfTables] = useState(0);
  const [tableInfo, setTableInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [itemid, setItemId] = useState(null);
  const [menuopen, setMenuOpen] = useState(false);

  const handleDelete = (id) => {};
  const handleAddTabe = async () => {
    const addTable = await axios.post(
      "https://nodefinalprojectback.onrender.com/tables/addTable"
    );
    try {
      const response = await axios.get(
        "https://nodefinalprojectback.onrender.com/tables"
      );
      setTableInfo(response.data.rows);
      setNumOfTables(response.data.count);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };
  useEffect(() => {
    const getAllTables = async () => {
      try {
        const response = await axios.get(
          "https://nodefinalprojectback.onrender.com/tables/"
        );
        setTableInfo(response.data.rows);
        setNumOfTables(response.data.count);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    };

    getAllTables();
  }, []);
  const [tableData, setTableData] = useState();

  const handleTableClick = (id) => {
    setItemId(id);
    setMenuOpen(true);
    getTable(id);
  };
  const closeModel = (action) => {
    setMenuOpen(action);
  };
  const getTable = async (id) => {
    const getData = await axios.get(
      `https://nodefinalprojectback.onrender.com/tables/getTableById/${id}`
    );
    setTableData(getData.data);
  };
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="mb-10 flex justify-center mt-10">
            <button
              onClick={handleAddTabe}
              className="btn btn-success text-white "
            >
              הוסף שולחן
            </button>
          </div>
          <div className="flex flex-wrap gap-10 justify-center ">
            {tableInfo?.map((item) => {
              return (
                <div className=" relative  flex w-[30%] justify-center">
                  <p className=" absolute">{item.id}</p>
                  <svg
                    onClick={() => {
                      handleTableClick(item.id);
                    }}
                    className="w-[30%] hover:opacity-30 cursor-pointer"
                    width="800px"
                    fill={item.availability ? " #243c5a" : "red"}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>table</title>
                    <path d="M18.76,6l2,4H3.24l2-4H18.76M20,4H4L1,10v2H3v7H5V16H19v3h2V12h2V10L20,4ZM5,14V12H19v2Z" />
                    <rect width="24" height="24" fill="none" />
                  </svg>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className=" ">
        <TableOp
          tableData={tableData}
          id={itemid}
          close={closeModel}
          setMenuOpen={setMenuOpen}
          setTableInfo={setTableInfo}
          menuopen={menuopen}
          setTableData={setTableData}
        />
      </div>
    </div>
  );
}

export default App;
