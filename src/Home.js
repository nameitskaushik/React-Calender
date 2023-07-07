import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Scheduler from "./Schedular";

const Home = () => {
  const usenavigate = useNavigate();
  const [customerlist, listupdate] = useState(null);

  useEffect(() => {}, []);

  return (
    <div>
      <h1 className="text-center">Welcome to React Calender</h1>
      <Scheduler />
    </div>
  );
};

export default Home;
