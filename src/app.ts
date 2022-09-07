import type { Pagination, TableRowData } from "./types";

import { nextButton, prevButton } from "./components.";
import { fetchData, disableButton, updateTable, enableButton } from "./utils";

const startApp = async () => {
  let displayedResults: TableRowData[];
  let pagination: Pagination;
  let keys: string[];
  let apiResponse;
  let keyTraversalIndex = 0;

  fetchData().then((res) => {
    apiResponse = res.results[0];
    keys = Object.keys(apiResponse);
    pagination = apiResponse["paging"];
    displayedResults = apiResponse[keys[keyTraversalIndex]];
    updateTable(displayedResults, keys[keyTraversalIndex]);
    disableButton(prevButton);
  });

  nextButton.onclick = () => {
    keyTraversalIndex++;
    if (!pagination.hasOwnProperty("next")) {
      disableButton(nextButton);
    }
    if (
      keys[keyTraversalIndex] !== "paging" &&
      !(keyTraversalIndex > keys.length - 1)
    ) {
      displayedResults = apiResponse[keys[keyTraversalIndex]];
      updateTable(displayedResults, keys[keyTraversalIndex]);
    } else {
      keyTraversalIndex = 0;
      fetchData(pagination.next).then((res) => {
        apiResponse = res.results[0];
        keys = Object.keys(apiResponse);
        pagination = apiResponse["paging"];
        keyTraversalIndex = 0;
        displayedResults = apiResponse[keys[keyTraversalIndex]];
        updateTable(displayedResults, keys[keyTraversalIndex]);
      });
    }
    enableButton(prevButton);
  };

  prevButton.onclick = () => {
    if (keys[keyTraversalIndex] === "2") {
      disableButton(prevButton);
    }
    if (keyTraversalIndex === 0 && pagination.hasOwnProperty("previous")) {
      fetchData(pagination.previous).then((res) => {
        apiResponse = res.results[0];
        keys = Object.keys(apiResponse);
        pagination = apiResponse["paging"];
        keyTraversalIndex = 0;
        displayedResults = apiResponse[keys[keyTraversalIndex]];
        updateTable(displayedResults, keys[keyTraversalIndex]);
      });
    } else {
      keyTraversalIndex--;
      displayedResults = apiResponse[keys[keyTraversalIndex]];
      updateTable(displayedResults, keys[keyTraversalIndex]);
    }
  };
};

document.addEventListener("DOMContentLoaded", startApp);
