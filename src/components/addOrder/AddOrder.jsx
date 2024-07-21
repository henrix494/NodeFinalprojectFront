import { useEffect, useState } from "react";
import { baseUrl } from "../../constants/baseUrl";
import axios from "axios";

export default function AddOrder({
  tableId,
  tableData,
  getTable,
  getAllTables,
}) {
  const [mealData, setMealData] = useState([]);
  const [tableAddMeal, setTableAddMeal] = useState([]);
  useEffect(() => {
    const getMealData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/meals`);
        setMealData(response.data);
      } catch (error) {
        console.error("Error fetching meal data:", error);
      }
    };
    getMealData();
  }, []);

  const addItemToCart = (id) => {
    setTableAddMeal((prev) => {
      const existingItem = prev?.find((item) => item.id === id);
      if (existingItem) {
        return prev?.map((item) =>
          item.id === id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        return [...prev, { id: id, count: 1 }];
      }
    });
  };
  const removeItemFromCart = (id) => {
    setTableAddMeal((prev) => {
      const existingItem = prev?.find((item) => item.id === id);
      if (existingItem) {
        return prev?.map((item) =>
          item.id === id ? { ...item, count: item.count - 1 } : item
        );
      } else {
        return [...prev, { id: id, count: 1 }];
      }
    });
  };
  const sendItemsToServer = async () => {
    let tableInfo = tableData;
    const sendItemsToServer = await axios.post(
      `${baseUrl}/mealTOOR/addMealToOR`,
      {
        items: tableAddMeal,
        oId: tableData.order.id,
      }
    );
    getTable(tableId);
    getAllTables();
    setTableAddMeal([]);
  };
  return (
    <>
      <button
        className="btn w-full btn-secondary"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        הוסף מנות לשולחן
      </button>
      <dialog id="my_modal_4" className="modal text-right">
        <div className="modal-box">
          <h3 className="font-bold text-lg">תפריט</h3>
          {mealData.map((item) => (
            <div
              key={item.id}
              className="flex flex-row-reverse w-full justify-around  text-xl border-b-2"
            >
              <p className="w-[33%]">{item.name}</p>
              <div className="flex items-center gap-5">
                <button onClick={() => removeItemFromCart(item.id)}>-</button>
                <p>
                  {tableAddMeal?.find((cartItem) => cartItem.id === item.id)
                    ?.count || 0}
                </p>
                <button onClick={() => addItemToCart(item.id)}>+</button>
              </div>
              <p className="w-[20%] self-start">{item.price}$</p>
            </div>
          ))}
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn mr-5"
                onClick={() => {
                  setTableAddMeal([]);
                }}
              >
                סגור
              </button>
              <button
                onClick={sendItemsToServer}
                className="btn btn-success text-white"
              >
                הוסף
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
