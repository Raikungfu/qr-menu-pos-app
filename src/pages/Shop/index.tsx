import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShopActionTypes, ShopTable, ShopZone } from "@/constants/shop";
import ShopTableCard from "@/components/custom/ShopTableCard";
import useDragScroll from "@/hooks/useDragScroll";

const Shop = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const {
    handleMouseDown,
    handleMouseLeaveOrUp,
    handleMouseMove,
    handleWheel,
  } = useDragScroll();
  const [activeZone, setActiveZone] = React.useState<number>(1);
  const [zoneTables, setZoneTables] = React.useState<ShopTable[]>([]);

  const zones: ShopZone[] = [
    {
      id: 1,
      name: "Tầng trệt",
      tables: [
        {
          id: 1,
          name: "Bàn 1",
          status: ShopActionTypes.CLOSE_TABLE,
        },
        {
          id: 2,
          name: "Bàn 2",
          status: ShopActionTypes.CLOSE_TABLE,
        },
        {
          id: 3,
          name: "Bàn 3",
          status: ShopActionTypes.CLOSE_TABLE,
        },
        {
          id: 4,
          name: "Bàn 4",
          status: ShopActionTypes.CLOSE_TABLE,
        },
        {
          id: 5,
          name: "Bàn 5",
          status: ShopActionTypes.CLOSE_TABLE,
        },
        {
          id: 6,
          name: "Bàn 6",
          status: ShopActionTypes.CLOSE_TABLE,
        },
        {
          id: 7,
          name: "Bàn 7",
          status: ShopActionTypes.CLOSE_TABLE,
        },
        {
          id: 8,
          name: "Bàn 8",
          status: ShopActionTypes.CLOSE_TABLE,
        },
        {
          id: 10,
          name: "Bàn 10",
          status: ShopActionTypes.CLOSE_TABLE,
        },
        {
          id: 11,
          name: "Bàn 11",
          status: ShopActionTypes.CLOSE_TABLE,
        },
        {
          id: 12,
          name: "Bàn 12",
          status: ShopActionTypes.CLOSE_TABLE,
        },
        {
          id: 13,
          name: "Bàn 13",
          status: ShopActionTypes.CLOSE_TABLE,
        },
        {
          id: 14,
          name: "Bàn 14",
          status: ShopActionTypes.CLOSE_TABLE,
        },
        {
          id: 15,
          name: "Bàn 15",
          status: ShopActionTypes.CLOSE_TABLE,
        },
        {
          id: 16,
          name: "Bàn 16",
          status: ShopActionTypes.CLOSE_TABLE,
        },
        {
          id: 17,
          name: "Bàn 17",
          status: ShopActionTypes.CLOSE_TABLE,
        },
        {
          id: 18,
          name: "Bàn 18",
          status: ShopActionTypes.CLOSE_TABLE,
        },
        {
          id: 19,
          name: "Bàn 19",
          status: ShopActionTypes.CLOSE_TABLE,
        },
        {
          id: 20,
          name: "Bàn 20",
          status: ShopActionTypes.CLOSE_TABLE,
        },
      ],
    },
    {
      id: 2,
      name: "Tầng 1",
      tables: [],
    },
    {
      id: 3,
      name: "Bàn đang mở",
      tables: [
        {
          id: 9,
          name: "Bàn 9",
          status: ShopActionTypes.OPEN_TABLE,
        },
      ],
    },
  ];

  const handleZoneClick = (id: number, tables: ShopTable[]) => {
    setActiveZone(id);
    setZoneTables(tables);
  };

  useEffect(() => {
    const tables = zones.find((zone) => zone.id === activeZone)?.tables || [];
    console.log(tables);
    setZoneTables(tables);
  }, []);

  return (
    <div className="h-screen">
      <div className="w-full p-4 flex items-center gap-x-4">
        {zones.map((zone: ShopZone) => (
          <Button
            key={zone.id}
            size="lg"
            variant="outline"
            className={`${
              activeZone === zone.id ? "text-white bg-primary" : ""
            }`}
            onClick={() => handleZoneClick(zone.id, zone.tables)}
          >
            {zone.name}
          </Button>
        ))}
      </div>
      <div
        className="overflow-y-auto scrollable pb-52 max-h-screen w-full px-6 py-6 mt-2 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
        ref={ref}
        onMouseDown={(e) => handleMouseDown(e, ref)}
        onMouseMove={(e) => handleMouseMove(e, ref)}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseLeave={handleMouseLeaveOrUp}
        onWheel={(e) => handleWheel(e, ref)}
      >
        {zoneTables.map((table: ShopTable) => (
          <div key={table.id}>
            <ShopTableCard data={table} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
