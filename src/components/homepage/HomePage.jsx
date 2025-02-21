/* eslint-disable react/prop-types */
import Loading from "../Loading/Loading";
import { TableContainer } from "../table/TableContainer";
export const HomePage = ({
  loading,
  handleAddTabe,
  setWaiterName,
  addWaiter,
  tableInfo,
  handleTableClick,
  sentItem,
  tableData,
  itemid,
  closeModel,
  setMenuOpen,
  setTableInfo,
  menuopen,
  setTableData,
  getTable,
  getAllTables,
}) => {
  return (
    <>
      <div>
        {loading ? (
          <Loading loading={loading} />
        ) : (
          <div>
            <div className="mb-10 flex justify-center mt-10 gap-10">
              <button
                onClick={handleAddTabe}
                className="btn btn-success text-white "
              >
                הוסף שולחן
              </button>
              <button
                className="btn btn-success text-white"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                הוסף מלצר{" "}
              </button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box flex flex-col gap-6 items-end">
                  <h3 className="font-bold text-lg"> הכנס של של מלצר</h3>

                  <input
                    onChange={(e) => {
                      setWaiterName(e.target.value);
                    }}
                    type="text"
                    placeholder="שם מלצר "
                    className="input input-bordered w-full placeholder:text-right text-right "
                  />

                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn mr-10">סגור</button>
                      <button className="btn btn-success" onClick={addWaiter}>
                        הוסף
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>{" "}
            </div>
            <div className="flex flex-wrap gap-10 justify-center ">
              {tableInfo?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className=" relative  flex w-[30%] justify-center"
                  >
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
          <TableContainer
            sentItem={sentItem}
            tableData={tableData}
            id={itemid}
            close={closeModel}
            setMenuOpen={setMenuOpen}
            setTableInfo={setTableInfo}
            menuopen={menuopen}
            setTableData={setTableData}
            getTable={getTable}
            getAllTables={getAllTables}
          />
        </div>
      </div>
    </>
  );
};
