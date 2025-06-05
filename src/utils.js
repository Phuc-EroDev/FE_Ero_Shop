import { data } from "react-router-dom";

export const isJsonString = (data) => {
    try {
        JSON.parse(data)
    } catch (error) {
        return false
    }
    return true
}

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const getItem = (label, key, icon, children, type) => {
  return {
    label,
    key,
    icon,
    children,
    type
  };
}

export const renderOptions = (arr) => {
  let results = []
  if (Array.isArray(arr)) {
    results = arr.map((options) => {
      return {
        value: options,
        label: options,
      }
    })
  }
  results.push({
    label: 'Thêm type',
    value: 'add_type',
  })
  return results
}