import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";

export default function Seecurrent({ tableData }) {
  const [orderData, setOrderData] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const getData = async () => {
      if (tableData?.order?.id) {
        try {
          const response = await axios.get(
            `${baseUrl}/mealTOOR/findMealToOR/${tableData.order.id}`
          );
          setOrderData(response.data);

          // Calculate the total price
          const total = response.data.meals.reduce((sum, meal) => {
            return sum + meal.price * meal.mealOrder.count;
          }, 0);
          setTotalPrice(total);
        } catch (error) {
          console.error("Error fetching order data:", error);
        }
      }
    };
    getData();
  }, [tableData]);

  return (
    <>
      <button
        className="btn w-full btn-info mt-10"
        onClick={() => document.getElementById("my_modal_8").showModal()}
      >
        ראה הזמנה קיימת
      </button>
      <dialog id="my_modal_8" className="modal text-right">
        <div className="modal-box">
          <h3 className="font-bold text-lg">תפריט</h3>

          {orderData ? (
            <div>
              <h4 className="font-bold">Order ID: {orderData.id}</h4>
              <ul>
                {orderData.meals.map((meal, index) => (
                  <li key={index}>
                    {meal.mealName} - כמות: {meal.mealOrder.count} - מחיר:{" "}
                    {meal.price} ש"ח
                  </li>
                ))}
              </ul>
              <div>
                <h2>
                  חשבון: <span>{totalPrice} ש"ח</span>
                </h2>
              </div>
            </div>
          ) : (
            <p>Loading order data...</p>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn mr-5">סגור</button>
              <button className="btn btn-success text-white">הוסף</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
