"use client";
import { useEffect, useState } from "react";
import Cell from "./components/Cell";
import dynamic from "next/dynamic";

function Loading() {
  return <div>Loading</div>;
}
const Space = dynamic(
  () => import("react-zoomable-ui").then((module) => module.Space),
  { ssr: false }
);
const ClientPage = () => {
  const [invalidVotes, setInvalidVotes] = useState("0");
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

  useEffect(() => {
    if (localStorage.getItem("tayyipVotes")) {
      setTayyipVotes(JSON.parse(localStorage.getItem("tayyipVotes")!));
    } else {
      setTayyipVotes(createGrid("tayyip"));
    }
    if (localStorage.getItem("kemalVotes")) {
      setKemalVotes(JSON.parse(localStorage.getItem("kemalVotes")!));
    } else {
      setKemalVotes(createGrid("kemal"));
    }
  }, []);

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
            localStorage.setItem("tayyipVotes", JSON.stringify(tayyipVotes));
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
            localStorage.setItem("kemalVotes", JSON.stringify(kemalVotes));
            return;
          }
        }
      }
    }
  };

  return (
    <main className="lg:mx-96">
      <div className="flex gap-3">
        <span className="w-full text-center">
          RECEP
          <br />
          TAYYİP ERDOĞAN
        </span>
        <span className="w-full text-center">
          KEMAL
          <br />
          KILIÇDAROĞLU
        </span>
      </div>

      <div className="flex gap-3">
        <div style={{ width: "100%", height: height, position: "relative" }}>
          <Space style={{ height: height }}>
            <table
              width={"100%"}
              className="border-collapse border-[1px] border-slate-500 "
              onClick={handleClick}
              cellPadding={0}
              cellSpacing={0}
            >
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

        <div style={{ width: "100%", height: height, position: "relative" }}>
          <Space style={{ height: height }}>
            <table
              width={"100%"}
              className="border-collapse border-[1px] border-slate-500 "
              onClick={handleClick}
              cellPadding={0}
              cellSpacing={0}
            >
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
      <div className="flex gap-3">
        <span className="w-full text-center">
          Toplam: {tayyipVotes.flat().filter((c) => c.active).length}
        </span>
        <span className="w-full text-center">
          Toplam: {kemalVotes.flat().filter((c) => c.active).length}
        </span>
      </div>

      <div className="flex gap-3">
        <span className="w-full text-center">
          Geçersiz oy:{" "}
          <input
            value={invalidVotes}
            onChange={(e) => setInvalidVotes(e.target.value.toString())}
            type="tel"
            className="w-12 h-8 text-center text-blue-500"
          />
        </span>
      </div>
    </main>
  );
};

export default ClientPage;
