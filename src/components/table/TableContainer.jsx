/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import TableOp from "./TableOp";
import { baseUrl } from "../../constants/baseUrl";
export const TableContainer = ({
  sentItem,
  setTableInfo,
  setTableData,
  setMenuOpen,
  id,
  tableData,
  menuopen,
  getAllTables,
  getTable,
  close,
}) => {
  const [waitersNames, setWaitersNames] = useState();
  const [selectedWaiterId, setSelectedWaiterId] = useState(null);

  useEffect(() => {
    const getnames = async () => {
      const data = await axios.get(`${baseUrl}/waiters/waiters`);
      setWaitersNames(data.data.rows);
    };
    getnames();
  }, [sentItem]);
  const handleDelete = async () => {
    const deleteTable = await axios.delete(
      `${baseUrl}/tables/deleTableById/${id}`
    );
    try {
      const response = await axios.get(`${baseUrl}/tables`);
      setTableInfo(response.data.rows);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
    setMenuOpen(false);
    console.log(deleteTable.data);
  };
  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    setSelectedWaiterId(selectedId);
  };
  const sendWaiterToDb = async () => {
    const sendDataToDb = await axios.post(
      `${baseUrl}/waiters/AddTableToWaiter`,
      {
        waiterId: selectedWaiterId,
        TableId: id,
      }
    );
    try {
      const response = await axios.get(`${baseUrl}/tables`);
      setTableInfo(response.data.rows);
      const getData = await axios.get(`${baseUrl}/tables/getTableById/${id}`);
      setTableData(getData.data);
      console.log(tableData);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };
  const startOrder = async () => {
    try {
      const startOr = await axios.post(`${baseUrl}/orders/startOrder/${id}`);
      const response = await axios.get(`${baseUrl}/tables`);
      const getData = await axios.get(`${baseUrl}/tables/getTableById/${id}`);
      setTableData(getData.data);
      setTableInfo(response.data.rows);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };
  const endOrder = async () => {
    try {
      const endOr = await axios.post(`${baseUrl}/orders/endOrder/${id}`);
      const response = await axios.get(`${baseUrl}/tables`);
      const getData = await axios.get(`${baseUrl}/tables/getTableById/${id}`);
      setTableData(getData.data);
      setTableInfo(response.data.rows);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };
  return (
    <>
      <TableOp
        id={id}
        close={close}
        setMenuOpen={setMenuOpen}
        setTableInfo={setTableInfo}
        menuopen={menuopen}
        tableData={tableData}
        setTableData={setTableData}
        sentItem={sentItem}
        getTable={getTable}
        getAllTables={getAllTables}
        handleSelectChange={handleSelectChange}
        endOrder={endOrder}
        startOrder={startOrder}
        handleDelete={handleDelete}
        waitersNames={waitersNames}
        sendWaiterToDb={sendWaiterToDb}
        selectedWaiterId={selectedWaiterId}
      />
    </>
  );
};
