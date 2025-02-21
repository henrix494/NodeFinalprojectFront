/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { HomePage } from "./HomePage";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
export const HomePageContainer = () => {
  const [numOfTables, setNumOfTables] = useState(0);
  const [tableInfo, setTableInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [itemid, setItemId] = useState(null);
  const [menuopen, setMenuOpen] = useState(false);
  const handleAddTabe = async () => {
    const addTable = await axios.post(`${baseUrl}/tables/addTable`);
    try {
      const response = await axios.get(`${baseUrl}/tables/`);
      setTableInfo(response.data.rows);
      setNumOfTables(response.data.count);
      if (addTable.status === 200) {
        alert("שולחן נוסף");
      }
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };
  const closeModel = (action) => {
    setMenuOpen(action);
  };
  const getTable = async (id) => {
    const getData = await axios.get(`${baseUrl}/tables/getTableById/${id}`);
    setTableData(getData.data);
  };
  const [waiterName, setWaiterName] = useState();
  const [sentItem, setSendItem] = useState(false);
  const addWaiter = async () => {
    await axios.post(`${baseUrl}/waiters/addWaiter`, {
      waiterName: waiterName,
    });
    setSendItem((prev) => {
      !prev;
    });
  };
  useEffect(() => {
    setLoading(true);
    const getAllTables = async () => {
      try {
        const response = await axios.get(`${baseUrl}/tables`);
        setTableInfo(response.data.rows);
        setNumOfTables(response.data.count);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    };

    getAllTables();
  }, []);
  const getAllTables = async () => {
    try {
      const response = await axios.get(`${baseUrl}/tables`);
      setTableInfo(response.data.rows);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };
  const [tableData, setTableData] = useState();
  const handleTableClick = (id) => {
    setItemId(id);
    setMenuOpen(true);
    getTable(id);
  };
  return (
    <>
      <HomePage
        loading={loading}
        handleAddTabe={handleAddTabe}
        setWaiterName={setWaiterName}
        addWaiter={addWaiter}
        tableInfo={tableInfo}
        handleTableClick={handleTableClick}
        sentItem={sentItem}
        tableData={tableData}
        itemid={itemid}
        closeModel={closeModel}
        setMenuOpen={setMenuOpen}
        setTableInfo={setTableInfo}
        menuopen={menuopen}
        setTableData={setTableData}
        getTable={getTable}
        getAllTables={getAllTables}
      />
    </>
  );
};
