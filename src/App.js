import logo from "./logo.svg";
import "./App.css";
import { Component, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  onSnapshot,
  addDoc,
  setDoc,
  serverTimestamp,
  deleteDoc,
  DocumentSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [plan_value, setPlan] = useState("");
  const [design_value, setDesign] = useState("");
  const [code_value, setCode] = useState("");
  const [id, setId] = useState("");
  const handleSubmit = async () => {
    if (plan_value && design_value && code_value) {
      const userDocumentRef = doc(db, "users", id);
      const getData = await getDoc(userDocumentRef).then((documentSnapshot) => {
        return documentSnapshot.data().evaluation_total;
      });
      const { plan, design, code } = getData;
      const plan_array = plan.concat([Number(plan_value)]);
      const plan_total = plan_array.reduce((data_1, data_2) => {
        return data_1 + data_2;
      });
      const design_array = design.concat([Number(design_value)]);
      const design_total = design_array.reduce((data_1, data_2) => {
        return data_1 + data_2;
      });
      const code_array = code.concat([Number(code_value)]);
      const code_total = code_array.reduce((data_1, data_2) => {
        return data_1 + data_2;
      });
      await updateDoc(userDocumentRef, {
        evaluation_average: {
          plan: plan_total / plan_array.length,
          design: design_total / design_array.length,
          code: code_total / code_array.length,
        },
        evaluation_total: {
          plan: plan_array,
          design: design_array,
          code: code_array,
        },
      });
    } else {
      console.log("どこかしら空欄です。");
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "id") {
      setId(e.target.value);
    } else if (e.target.name === "plan") {
      setPlan(e.target.value);
    } else if (e.target.name === "design") {
      setDesign(e.target.value);
    } else if (e.target.name === "code") {
      setCode(e.target.value);
    } else {
      console.log("それ以外です");
    }
  };
  return (
    <>
      <div>
        <label>番号</label>
        <input
          name="id"
          value={id}
          type="text"
          placeholder="番号"
          onChange={handleChange}
        />
      </div>
      <div>
        <label>企画</label>
        <input
          name="plan"
          value={plan_value}
          type="number"
          placeholder="企画"
          onChange={handleChange}
        />
      </div>
      <div>
        <label>デザイン</label>
        <input
          name="design"
          value={design_value}
          type="number"
          placeholder="デザイン"
          onChange={handleChange}
        />
      </div>
      <div>
        <label>コーディング</label>
        <input
          name="code"
          value={code_value}
          type="number"
          placeholder="コーディング"
          onChange={handleChange}
        />
      </div>
      <div>
        <button onClick={handleSubmit}>送る</button>
      </div>
    </>
  );
}

export default App;
