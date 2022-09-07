import { pageView, tableBody } from "./components.";
import { Pagination, TableRowData } from "./types";

const API_URL = "https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84";

export const fetchData = async (url = API_URL) => {
  const request = await fetch(url);
  const response = await request.json();
  return response;
};

export const updateTable = (data: TableRowData[], page: string) => {
  tableBody.innerHTML = "";
  data.map((item) => {
    tableBody.innerHTML += `<tr data-entryid=${item.id}>
      <td>${item.row}</td>
      <td>${item.gender}</td>
      <td>${item.age}</td>
    </tr>`;
  });
  updatePageView(page);
};

export const updatePageView = (page: string) => {
  pageView.innerHTML = `Showing page ${page}`;
};

export const disableButton = (
  button: HTMLButtonElement
) => {
  button.setAttribute("disabled", "true");
};

export const enableButton = (
  button: HTMLButtonElement,
) => {
  button.removeAttribute("disabled")
};

