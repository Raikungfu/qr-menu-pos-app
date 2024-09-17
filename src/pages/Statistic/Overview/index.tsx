import React from "react";
import { Undo2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import config from "@/configs";
import { DateRangePicker, LineChart } from "@/components/custom";
import { lineChartData } from "@/data/dummy";
import { ResponsiveLine } from "@nivo/line";

const data = [
  {
    id: "Doanh thu",
    data: [
      { x: "23 Th 10", y: 5 },
      { x: "24 Th 10", y: 38 },
      { x: "25 Th 10", y: 6 },
      { x: "26 Th 10", y: 12 },
      { x: "27 Th 10", y: 14 },
      { x: "28 Th 10", y: 0 },
    ],
  },
  {
    id: "Lợi nhuận",
    data: [
      { x: "23 Th 10", y: 5 },
      { x: "24 Th 10", y: 38 },
      { x: "25 Th 10", y: 6 },
      { x: "26 Th 10", y: 11 },
      { x: "27 Th 10", y: 14 },
      { x: "28 Th 10", y: 0 },
    ],
  },
  {
    id: "Chi phí",
    data: [
      { x: "23 Th 10", y: 0 },
      { x: "24 Th 10", y: 0 },
      { x: "25 Th 10", y: 0 },
      { x: "26 Th 10", y: 2 },
      { x: "27 Th 10", y: 0 },
      { x: "28 Th 10", y: 0 },
    ],
  },
  {
    id: "Doanh số",
    data: [
      { x: "23 Th 10", y: 5 },
      { x: "24 Th 10", y: 38 },
      { x: "25 Th 10", y: 6 },
      { x: "26 Th 10", y: 12 },
      { x: "27 Th 10", y: 14 },
      { x: "28 Th 10", y: 0 },
    ],
  },
];

const Overview = () => {
  const navigate = useNavigate();
  return (
    <div className="overflow-y-auto max-h-screen">
      <div className="h-[74px] bg-white w-full shadow-md flex items-center py-3 px-6 gap-8 fixed top-0">
        <Undo2
          size={32}
          className="cursor-pointer"
          onClick={() => navigate(config.routes.home)}
        />
        <h3 className="text-2xl font-semibold">Tổng quan</h3>
      </div>
      <div className="mt-[74px] w-full">
        <div className="min-h-14 border-b-2">
          <div className="w-4/5 flex items-center justify-between p-3">
            <h3 className="text-xl font-semibold">Báo cáo tổng quan</h3>
            <DateRangePicker />
          </div>
        </div>
        <div className="flex items-center flex-wrap gap-2 min-h-40 p-2 w-full">
          <div className="min-h-32 min-w-[24%] ring-1 rounded-2xl p-4 border-dashed">
            <h3 className="">Doanh thu</h3>
            <h3 className="font-semibold text-2xl mt-4">77,699,581.66đ</h3>
          </div>
          <div className="bg-[#B7C9E3] min-h-32 min-w-[24%] rounded-2xl p-4 border-dashed">
            <h3 className="">Lợi nhuận</h3>
            <h3 className="font-semibold text-2xl mt-4">77,699,581.66đ</h3>
          </div>
          <div className="min-h-32 min-w-[24%] ring-1 rounded-2xl p-4 border-dashed">
            <h3 className="">Chi phí</h3>
            <h3 className="font-semibold text-2xl mt-4">77,699,581.66đ</h3>
          </div>
          <div className="bg-[#B7C9E3] min-h-32 min-w-[24%] rounded-2xl p-4 border-dashed">
            <h3 className="">Doanh thu thuần</h3>
            <h3 className="font-semibold text-2xl mt-4">77,699,581.66đ</h3>
          </div>
        </div>
        <div className="w-full p-2">
          <div className="min-h-full rounded-lg ring-1 p-6">
            <h1 className="text-xl font-bold mb-6">Biểu đồ tổng quan</h1>
            <div className="mb-4">
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded mr-2">
                Hàng giờ
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded mr-2">
                Ngày
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded mr-2">
                Tuần
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded">
                Tháng
              </button>
            </div>
            <div className="h-[400px] p-6">
              <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  min: "auto",
                  max: "auto",
                  stacked: false,
                  reverse: false,
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Ngày",
                  legendOffset: 36,
                  legendPosition: "middle",
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Giá trị",
                  legendOffset: -40,
                  legendPosition: "middle",
                }}
                pointSize={10}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                  {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemBackground: "rgba(0, 0, 0, .03)",
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
