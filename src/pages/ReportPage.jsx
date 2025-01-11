import { useState } from "react";
import PropTypes from "prop-types";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

const PieData = [
  { name: "Jan", sales: 4000, revenue: 2400, profit: 2400 },
  { name: "Feb", sales: 3000, revenue: 1398, profit: 2210 },
  { name: "Mar", sales: 2000, revenue: 9800, profit: 2290 },
  { name: "Apr", sales: 2780, revenue: 3908, profit: 2000 },
  { name: "May", sales: 1890, revenue: 4800, profit: 2181 },
];

const GraphData = [
  { name: "Jan", active: 3000, new: 1400, returning: 1000 },
  { name: "Feb", active: 2000, new: 1398, returning: 1210 },
  { name: "Mar", active: 2780, new: 3908, returning: 2290 },
  { name: "Apr", active: 1890, new: 4800, returning: 2181 },
  { name: "May", active: 2390, new: 3800, returning: 2500 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088fe"];

const ChartCard = ({ children, title, chartType, onChartTypeChange }) => (
  <div className="rounded-lg p-4 transition-shadow">
    <div className="flex flex-col border shadow-md">
      <div className="flex bg-[#004381] items-center mb-3 p-2 rounded-t-lg justify-between">
        <div className="text-lg  font-semibold text-white p-2">{title}</div>

        <div className="p-2">
          <select
            value={chartType}
            onChange={(e) => onChartTypeChange(e.target.value)}
            className="px-3 py-1 rounded-md text-sm border bg-[#004381] text-white"
          >
            <option value="Line">Line</option>
            <option value="Pie">Pie</option>
            <option value="Bar">Bar</option>
          </select>
        </div>
      </div>
      <div className="h-64 ml-2 mr-2">{children}</div>
    </div>
  </div>
);

ChartCard.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  chartType: PropTypes.string.isRequired,
  onChartTypeChange: PropTypes.func.isRequired,
};

const MultipleChartDashboard = () => {
  // Initial chart types state for all charts
  const [chartTypes, setChartTypes] = useState({
    chart1: "Line",
    chart2: "Line",
    chart3: "Pie",
    chart4: "Line",
    chart5: "Line",
    chart6: "Pie",
  });

  // State to manage the selected chart type for all charts via the dropdown
  const [allChartType, setAllChartType] = useState("Line");

  // Get metrics depending on the chart type (Line, Pie, or Bar)
  const getDataMetrics = (dataset) => {
    switch (dataset) {
      case "Pie":
        return ["sales", "revenue", "profit"];
      case "Line":
      case "Bar":
        return ["active", "new", "returning"];
      default:
        return [];
    }
  };

  // Get data depending on the chart type
  const getData = (chartType) => {
    switch (chartType) {
      case "Pie":
        return PieData;
      case "Line":
      case "Bar":
        return GraphData;
      default:
        return [];
    }
  };

  // Get pie chart data for the selected chart type
  const getPieData = (chartType) => {
    const data = getData(chartType);
    const metrics = getDataMetrics(chartType);
    const latestData = data[data.length - 1];
    return metrics.map((metric) => ({
      name: metric,
      value: latestData[metric],
    }));
  };

  // Handle individual chart type change
  const handleChartTypeChange = (chartId, type) => {
    setChartTypes((prev) => ({
      ...prev,
      [chartId]: type,
    }));
  };

  // Handle "Change All Charts" to one selected type (Line, Pie, or Bar)
  const handleChangeAllCharts = (newType) => {
    setChartTypes({
      chart1: newType,
      chart2: newType,
      chart3: newType,
      chart4: newType,
      chart5: newType,
      chart6: newType,
    });
  };

  // Handle the dropdown change event to change all charts
  const handleDropdownChange = (e) => {
    const selectedType = e.target.value;
    setAllChartType(selectedType); // Update the dropdown value
    handleChangeAllCharts(selectedType); // Update all chart types
  };

  // Render chart based on chart type (Line, Pie, or Bar)
  const renderChart = (chartId) => {
    const chartType = chartTypes[chartId];

    // Line Chart Rendering
    if (chartType === "Line") {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={getData(chartType)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {getDataMetrics(chartType).map((metric, index) => (
              <Line
                key={metric}
                type="monotone"
                dataKey={metric}
                stroke={COLORS[index % COLORS.length]}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      );
    }

    // Bar Chart Rendering
    if (chartType === "Bar") {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={getData(chartType)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {getDataMetrics(chartType).map((metric, index) => (
              <Bar
                key={metric}
                dataKey={metric}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      );
    }

    // Pie Chart Rendering
    if (chartType === "Pie") {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={getPieData(chartType)}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {getPieData(chartType).map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <div className="bg-gray-50 p-4 h-full">
      <div className="max-w-7xl mx-auto">
        <div className="overflow-auto h-[calc(100vh-200px)] no-scrollbar">
          {/* Dashboard Data */}
          <div className="flex justify-between items-center mb-0">
            <h1 className="text-2xl ml-3 font-bold text-gray-800">
              Analytics Dashboard
            </h1>

            {/* Dropdown to change all charts at once */}
            {/* <div className="flex items-center space-x-4 ">
              <select
                value={allChartType}
                onChange={handleDropdownChange}
                className="px-8 py-3  rounded-lg font-bold bg-[#004381] text-white"
              >
                <option value="Line">Line</option>
                <option value="Pie">Pie</option>
                <option value="Bar">Bar</option>
              </select>
            </div> */}
          </div>

          <div className="grid grid-cols-2 gap-2 pb-1">
            <ChartCard
              title="Chart 1"
              chartType={chartTypes.chart1}
              onChartTypeChange={(type) =>
                handleChartTypeChange("chart1", type)
              }
            >
              {renderChart("chart1")}
            </ChartCard>

            <ChartCard
              title="Chart 2"
              chartType={chartTypes.chart2}
              onChartTypeChange={(type) =>
                handleChartTypeChange("chart2", type)
              }
            >
              {renderChart("chart2")}
            </ChartCard>

            <ChartCard
              title="Chart 3"
              chartType={chartTypes.chart3}
              onChartTypeChange={(type) =>
                handleChartTypeChange("chart3", type)
              }
            >
              {renderChart("chart3")}
            </ChartCard>

            <ChartCard
              title="Chart 4"
              chartType={chartTypes.chart4}
              onChartTypeChange={(type) =>
                handleChartTypeChange("chart4", type)
              }
            >
              {renderChart("chart4")}
            </ChartCard>

            <ChartCard
              title="Chart 5"
              chartType={chartTypes.chart5}
              onChartTypeChange={(type) =>
                handleChartTypeChange("chart5", type)
              }
            >
              {renderChart("chart5")}
            </ChartCard>

            <ChartCard
              title="Chart 6"
              chartType={chartTypes.chart6}
              onChartTypeChange={(type) =>
                handleChartTypeChange("chart6", type)
              }
            >
              {renderChart("chart6")}
            </ChartCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleChartDashboard;
