import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Container, Form, FormControl, Button } from "react-bootstrap";
import JobCard from "../components/jobCard";

const QUERYSTR_PREFIX = "q";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Job = () => {
  const [jobList, setJobList] = useState([]);
  const [originalJobs, setOriginalJobs] = useState([]);
  const history = useHistory();
  let query = useQuery();
  let [keyword, setKeyword] = useState(query.get(QUERYSTR_PREFIX));

  const handleSearch = (e) => {
    let filteredJobs = originalJobs;
    if (e) {
      e.preventDefault();
      history.push(`/jobs/?${QUERYSTR_PREFIX}=${encodeURIComponent(keyword)}`);
    }
    if (keyword) {
      filteredJobs = originalJobs.filter((job) =>
        job.title.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    console.log("filteredJobs", filteredJobs);
    setJobList(filteredJobs);
  };

  const getJobData = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_SERVER_URL}/jobs`;
      const response = await fetch(url);
      const data = await response.json();
      console.log("data", data);
      setJobList(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const goToJobDetail = (id) => {
    history.push(`/detail/${id}`);
  };

  useEffect(() => {
    getJobData();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [originalJobs]);

  return (
    <Container>
      <Form inline onSubmit={(event) => handleSearch(event)}>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          onChange={(event) => setKeyword(event.target.value)}
        />
        <Button type="submit" variant="outline-success">
          Search
        </Button>
      </Form>
      {jobList &&
        jobList.map((item) => (
          <JobCard job={item} key={item.id} goToJobDetail={goToJobDetail} />
        ))}
    </Container>
  );
};

export default Job;
