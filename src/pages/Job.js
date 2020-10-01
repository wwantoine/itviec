import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Container, Form, FormControl, Button } from "react-bootstrap";
import JobCard from "../components/jobCard";
import { useDispatch, useSelector } from "react-redux";
import { jobAction } from "../redux/action/jobAction";

const QUERYSTR_PREFIX = "q";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Job = () => {
  const dispatch = useDispatch();
  const [jobList, setJobList] = useState([]);
  const history = useHistory();
  const query = useQuery();
  const originalList = useSelector((state) => state.job.originalJobList);
  let [keyword, setKeyword] = useState(query.get(QUERYSTR_PREFIX));

  const handleSearch = (event) => {
    let filteredJobs = originalList;
    if (event) {
      event.preventDefault();
      history.push(`/?${QUERYSTR_PREFIX}=${encodeURIComponent(keyword)}`);
    }
    if (keyword) {
      filteredJobs = originalList.filter((job) =>
        job.title.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    console.log("filteredJobs", filteredJobs);
    setJobList(filteredJobs);
  };

  const getJobData = () => {
    dispatch(jobAction.getJobData());
  };

  const goToJobDetail = (id) => {
    history.push(`/detail/${id}`);
  };

  useEffect(() => {
    getJobData();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [originalList]);

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
