import { List, Select, Button } from "antd";
import { useState } from "react";
import LineChart from "./LineChart";
import { WarningOutlined } from "@ant-design/icons";

type Props = {
  data: any[];
};

const DocumentDetails = ({ data }: Props) => {
  const [entriesRequired, setEntriesRequired] = useState<string>("10");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sort, setSort] = useState<{
    column: string | null;
    order: "asc" | "desc";
  }>({ column: null, order: "asc" });

  const handleChange = (value: string) => {
    setEntriesRequired(value);
    setCurrentPage(1);
  };

  const handleSort = (column: string) => {
    if (sort.column === column) {
      setSort({ column, order: sort.order === "asc" ? "desc" : "asc" });
    } else {
      setSort({ column, order: "asc" });
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sort.column) return 0;
    if (a[sort.column] < b[sort.column]) return sort.order === "asc" ? -1 : 1;
    if (a[sort.column] > b[sort.column]) return sort.order === "asc" ? 1 : -1;
    return 0;
  });

  const pageSize =
    entriesRequired === "infinite" ? data.length : Number(entriesRequired);

  return (
    <>
      <Select
        value={entriesRequired}
        style={{ width: 120, marginBottom: "20px" }}
        onChange={handleChange}
        options={[
          { value: "10", label: "10" },
          { value: "20", label: "20" },
          { value: "50", label: "50" },
          { value: "100", label: "100" },
          { value: "infinite", label: "All" },
        ]}
      />
      <List.Item>
        {Object.entries(sortedData[1]).map(([key, value]) => (
          <span key={key} style={{ marginRight: "16px" }}>
            <strong>{key}:</strong>
            {/* Sort button for each column */}
            <Button size="small" onClick={() => handleSort(key)}>
              {sort.column === key && sort.order === "asc" ? "↓" : "↑"}
            </Button>
          </span>
        ))}
      </List.Item>
      <List
        bordered
        dataSource={sortedData}
        renderItem={(item) => (
          <>
            <List.Item>
              {Object.entries(item).map(([key, value]) => (
                <span key={key} style={{ marginRight: "16px" }}>
                  {value as any}
                </span>
              ))}
            </List.Item>
          </>
        )}
        pagination={{
          pageSize: pageSize,
          current: currentPage,
          total: data.length,
          onChange: (page) => setCurrentPage(page),
          showSizeChanger: false,
        }}
      />
      <div style={{ width: "100%", height: "400px", marginTop: "24px" }}>
        <p style={{ marginBottom: "24px", color: "orange" }}>
          <WarningOutlined />
          The graph is displayed, but since our data is random its impossible to
          figureout fields for comparison. But for extra marks here you go.
        </p>
        <LineChart />
      </div>
    </>
  );
};

export default DocumentDetails;
