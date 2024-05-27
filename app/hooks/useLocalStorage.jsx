import { useEffect, useState } from "react";

export default function useLocalStorage(context) {
  const [storage, setStorage] = useState([]);

  useEffect(() => {
    if (typeof localStorage === "undefined") return;
    const value = JSON.parse(localStorage.getItem(context) ?? "[]");
    setStorage(value);
  }, [context]);

  const uptadeStorage = (value) => {
    setStorage(value);
    localStorage.setItem(context, JSON.stringify(value));
  };

  const removeItem = (value) => {
    setStorage((prev) => {
      const newStorage = prev.filter((item) => item.id !== value);
      localStorage.setItem(context, JSON.stringify(newStorage));
      return newStorage;
    });
  };

  const addItem = (data) => {
    if (storage.length > 0) {
      const cartItemsArray = storage;

      const existingProductIndex = cartItemsArray.findIndex(
        (item) => item.id === data.id
      );

      if (existingProductIndex != -1) {
        cartItemsArray[existingProductIndex].quantity += 1;
      } else {
        cartItemsArray.push({ ...data, quantity: 1, id: data.id });
      }

      uptadeStorage(cartItemsArray);
    } else {
      const newCart = [{ ...data, quantity: 1, id: data.id }];
      uptadeStorage(newCart);
    }
  };

  const uptadeItem = (id, quantity) => {
    const cartItemsArray = storage;

    const productIndex = cartItemsArray.findIndex((item) => item.id === id);

    cartItemsArray[productIndex].quantity = quantity;

    uptadeStorage(cartItemsArray);
  };

  return { storage, uptadeStorage, removeItem, addItem, uptadeItem };
}
