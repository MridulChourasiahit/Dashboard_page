const LineData = {
  labels: ["Q1", "Q2", "Q3", "Q4"], // Time periods (quarters)
  datasets: [
    {
      label: "Revenue Growth (%)",
      data: [10, 20, 15, 25], // Revenue growth over time
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
    {
      label: "Profit Margin (%)",
      data: [5, 10, 12, 15], // Profit margin over time
      fill: false,
      borderColor: "rgb(255, 99, 132)",
      tension: 0.1,
    },
  ],
};

const PieData = {
  labels: ["Technology", "Healthcare", "Finance", "Retail", "Others"], // Industry sectors
  datasets: [
    {
      data: [40, 20, 15, 10, 15], // Percentage distribution of different sectors
      backgroundColor: [
        "rgb(75, 192, 192)",
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 159, 64)",
        "rgb(153, 102, 255)",
      ],
      hoverOffset: 4,
    },
  ],
};

export { LineData, PieData };
