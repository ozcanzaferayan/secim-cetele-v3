import React, { memo, useState } from "react";

type Props = {
  children: React.ReactNode;
  id: string;
  active: boolean;
};

const Cell = memo(function Cell(props: Props) {
  return (
    <td
      className={`text-center border-[1px] border-slate-700 text-[8px] w-5 ${
        props.active ? "bg-red-500" : ""
      }`}
    >
      <button id={props.id} className="w-full h-full">
        {props.children}
      </button>
    </td>
  );
});

export default Cell;
