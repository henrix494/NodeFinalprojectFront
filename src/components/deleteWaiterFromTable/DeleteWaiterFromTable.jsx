import React from "react";
import { baseUrl } from "../../constants/baseUrl";
import axios from "axios";
export default function DeleteWaiterFromTable({
  waiterName,
  tableId,
  waiterId,
  getTable,
  getAllTables,
}) {
  const deleteWaiterFromTable = async ({ test }) => {
    const send = await axios.post(`${baseUrl}/waiters/deleteWFromTable`, {
      tableId: tableId,
      waiterId: waiterId,
    });
    getTable(tableId);
    getAllTables();
  };
  return (
    <div>
      <button
        className="btn btn-error w-[80px]"
        onClick={() => document.getElementById("my_modal_6").showModal()}
      >
        {waiterName}
      </button>
      <dialog id="my_modal_6" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            אתה בטוח שאתה רוצה לימחוק את המלצר מהשולחן?
          </h3>
          <p className="py-4"></p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <div className="flex gap-10">
                <button
                  onClick={deleteWaiterFromTable}
                  className="btn btn-error"
                >
                  כן
                </button>
                <button className="btn">לא</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
