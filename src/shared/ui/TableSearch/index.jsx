import React, { useEffect, useState } from "react";
import { Table, Input, Pagination } from "antd";

const { Search } = Input;

const TableSearch = ({ data = [], columns, isLoading = false }) => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const pageSize = 5;

  useEffect(() => {
    setFilteredData(
      data.filter((item) => {
        const searchValue = searchText.toLowerCase();

        const searchInObject = (obj) => {
          return Object.values(obj).some((value) => {
            if (value === null || value === undefined) return false;
            if (typeof value === "object") return searchInObject(value);
            return String(value).toLowerCase().includes(searchValue);
          });
        };

        return searchInObject(item);
      })
    );
  }, [searchText]);

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(start + pageSize - 1, filteredData.length);
  const total = filteredData.length;
  const paginatedData = filteredData.slice(start - 1, end);

  return (
    <div className="mt-4">
      <Search
        placeholder={"Search anything..."}
        onChange={(e) => {
          setSearchText(e.target.value);
          setCurrentPage(1);
        }}
        className="mb-4 w-full max-w-[300px]"
        allowClear
      />
      <div className="overflow-x-auto w-full">
        <Table
          columns={columns}
          dataSource={paginatedData}
          rowKey={(row) => row.ID}
          pagination={false} // Ẩn pagination mặc định
          scroll={{ x: "max-content" }}
          className="w-full"
          loading={isLoading}
        />
        {/* Container chứa Total & Pagination */}
        <div className="flex justify-between items-center mt-2 px-4">
          <span className="text-gray-500 text-sm">{`Showing ${start}-${end} of ${total}`}</span>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={total}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
};

export default TableSearch;
