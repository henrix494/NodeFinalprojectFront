/* eslint-disable react/prop-types */
import AddOrder from "../addOrder/AddOrder";
import Seecurrent from "../Seecurrent/Seecurrent";
import DeleteWaiterFromTable from "../deleteWaiterFromTable/DeleteWaiterFromTable";
export default function TableOp({
  id,
  close,
  menuopen,
  tableData,
  getTable,
  getAllTables,
  handleSelectChange,
  waitersNames,
  endOrder,
  handleDelete,
  sendWaiterToDb,
  startOrder,
  selectedWaiterId,
}) {
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
            {tableData?.waiters.map((name, index) => {
              return (
                <div key={index}>
                  <DeleteWaiterFromTable
                    waiterName={name.waiterName}
                    tableId={id}
                    waiterId={name.id}
                    getTable={getTable}
                    getAllTables={getAllTables}
                  />
                </div>
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
