import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../constants/baseUrl";
import AddOrder from "./addOrder/AddOrder";
import DeleteWaiterFromTable from "./deleteWaiterFromTable/DeleteWaiterFromTable";
import Seecurrent from "./Seecurrent/Seecurrent";
export default function TableOp({
  id,
  close,
  setMenuOpen,
  setTableInfo,
  menuopen,
  tableData,
  setTableData,
  sentItem,
  getTable,
  getAllTables,
}) {
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
    <div
      className={`fixed right-0 bg-slate-300 h-screen top-0 transition-all duration-500 w-[40dvh]   overflow-auto ${
        menuopen ? "translate-x-[0%] " : " translate-x-[100%] "
      }`}
    >
      <button
        onClick={() => close(false)}
        className={`right-5 top-5 absolute bg-[red] px-5 py-3 hover:opacity-90 rounded-full text-xl text-white`}
      >
        X
      </button>
      <div className="flex flex-col mt-28 gap-10">
        <p className="text-center text-xl">
          אתה בחרתה בשולחן <span className="underline font-bold">{id}</span>
        </p>

        {tableData?.waiters?.length > 0 ? (
          <div className="flex flex-col  items-center gap-7">
            <p>מלצר משויך </p>
            {tableData?.waiters.map((name) => {
              return (
                <DeleteWaiterFromTable
                  waiterName={name.waiterName}
                  tableId={id}
                  waiterId={name.id}
                  getTable={getTable}
                  getAllTables={getAllTables}
                />
              );
            })}
            <div>
              <h2>הוסף מלצר נוסף</h2>
              <div>
                <select onChange={handleSelectChange} className="select w-full">
                  <option disabled selected>
                    בחר מלצר
                  </option>
                  {waitersNames?.map((name) =>
                    tableData.waiters.some(
                      (waiter) => waiter.id === name.id
                    ) ? null : (
                      <option key={name.id} value={name.id}>
                        {name.waiterName}
                      </option>
                    )
                  )}
                </select>

                <div className="flex justify-center mt-7">
                  <button
                    className="btn btn-success"
                    onClick={() => sendWaiterToDb(selectedWaiterId)}
                  >
                    שייך מלצר
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <select onChange={handleSelectChange} className="select w-full ">
              <option disabled selected>
                בחר מלצר
              </option>
              {waitersNames?.map((name) => (
                <option key={name.id} value={name.id}>
                  {name.waiterName}
                </option>
              ))}
            </select>
            <div className="flex justify-center mt-7">
              <button
                className="btn btn-success"
                onClick={() => sendWaiterToDb(selectedWaiterId)}
              >
                שייך מלצר
              </button>
            </div>
          </div>
        )}
        <div className="w-full ">
          {tableData?.availability ? (
            <div>
              <button
                onClick={startOrder}
                className="btn btn-success mt-10  w-full"
              >
                התחל הזמנה
              </button>
            </div>
          ) : (
            <div>
              <AddOrder
                tableId={id}
                tableData={tableData}
                getTable={getTable}
                getAllTables={getAllTables}
              />
              <button
                onClick={endOrder}
                className="btn btn-error mt-10  w-full"
              >
                סיים הזמנה
              </button>
              <Seecurrent tableData={tableData} />
            </div>
          )}
        </div>
        <div className="w-full mt-10">
          <button onClick={handleDelete} className="btn btn-warning w-full">
            מחק
          </button>
        </div>
      </div>
    </div>
  );
}
