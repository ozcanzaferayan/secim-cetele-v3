"use client";
import React, { useEffect, useState } from "react";
import Cell from "./components/Cell";
import { Space } from "react-zoomable-ui";

const ClientPage = () => {
  const { width, height } = { width: 200, height: 520 };
  const createGrid = (name: string) => {
    return Array.from({ length: 40 }).map((_, i) =>
      Array.from({ length: 10 }).map((_, j) => ({
        id: `${name}-${i + 1 + j * 40}`,
        text: `${i + 1 + j * 40}`,
        active: false,
      }))
    );
  };
  const [tayyipVotes, setTayyipVotes] = useState(createGrid("tayyip"));
  const [kemalVotes, setKemalVotes] = useState(createGrid("kemal"));

  const handleClick = (e: any) => {
    const target = e.target;
    if (target.tagName !== "BUTTON") {
      return;
    }
    const id = target.id;
    const [name] = id.split("-");
    if (name === "tayyip") {
      for (let i = 0; i < tayyipVotes.length; i++) {
        const row = tayyipVotes[i];
        for (let j = 0; j < row.length; j++) {
          const cell = row[j];
          if (cell.id === id) {
            cell.active = !cell.active;
            setTayyipVotes([...tayyipVotes]);
            return;
          }
        }
      }
    } else if (name === "kemal") {
      for (let i = 0; i < kemalVotes.length; i++) {
        const row = kemalVotes[i];
        for (let j = 0; j < row.length; j++) {
          const cell = row[j];
          if (cell.id === id) {
            cell.active = !cell.active;
            setKemalVotes([...kemalVotes]);
            return;
          }
        }
      }
    }
  };

  return (
    <div className="flex gap-6">
      <div style={{ width: width, height: height, position: "relative" }}>
        <Space style={{ width: width, height: height }}>
          <table
            className="border-collapse border-[0.5px] border-slate-500 "
            onClick={handleClick}
            cellPadding={0}
            cellSpacing={0}
          >
            <thead>
              <tr>
                <th className="border-[0.5px] border-slate-600" colSpan={10}>
                  RECEP TAYYIP ERDOĞAN
                </th>
              </tr>
            </thead>
            <tbody>
              {tayyipVotes.map((row, i) => (
                <tr key={i}>
                  {row.map((cell) => (
                    <Cell key={cell.id} id={cell.id} active={cell.active}>
                      {cell.text}
                    </Cell>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Space>
      </div>

      <div style={{ width: width, height: height, position: "relative" }}>
        <Space style={{ width: width, height: height }}>
          <table
            className="border-collapse border-[0.5px] border-slate-500 "
            onClick={handleClick}
            cellPadding={0}
            cellSpacing={0}
          >
            <thead>
              <tr>
                <th className="border-[0.5px] border-slate-600" colSpan={10}>
                  KEMAL KILIÇDAROĞLU
                </th>
              </tr>
            </thead>
            <tbody>
              {kemalVotes.map((row, i) => (
                <tr key={i}>
                  {row.map((cell) => (
                    <Cell key={cell.id} id={cell.id} active={cell.active}>
                      {cell.text}
                    </Cell>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Space>
      </div>
    </div>
  );
};

export default ClientPage;
