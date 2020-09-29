import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobDetail = ({ name }) => {
  const { id } = useParams();

  const getDetailData = async () => {
    const url = `${process.env.REACT_APP_BACKEND_SERVER_URL}/jobs/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("jobdata", data);
  };

  useEffect(() => {
    getDetailData();
  }, []);

  return (
    <div>
      <h1>Detail Page</h1>
      <h2>{name}</h2>
    </div>
  );
};

export default JobDetail;
