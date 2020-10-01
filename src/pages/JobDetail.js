import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge, Container, Row, Col, Button } from "react-bootstrap";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import moment from "moment";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const history = useHistory();

  const getDetailData = async () => {
    const url = `${process.env.REACT_APP_BACKEND_SERVER_URL}/jobs/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("jobdata", data);
    setJob(data);
  };

  useEffect(() => {
    getDetailData();
  }, []);

  return (
    <Container>
      {job && (
        <Row>
          <Col>
            <img src={job.img} />
          </Col>
          <Col xs={10}>
            <h2>{job.title}</h2>
            <div>
              {job.tags.map((tag) => (
                <Badge variant="secondary" className="badge-style">
                  {tag}
                </Badge>
              ))}
            </div>
            <div style={{ paddingTop: "10px", color: "grey" }}>
              <FontAwesomeIcon
                icon={faDollarSign}
                style={{ marginRight: "10px" }}
              />{" "}
              {job.salary}
            </div>
            <div style={{ color: "grey" }}>
              <FontAwesomeIcon
                icon={faMapMarker}
                style={{ marginRight: "10px" }}
              />{" "}
              {job.city} District {job.district}
            </div>
            <div style={{ color: "blue" }}>
              <FontAwesomeIcon
                icon={faCalendar}
                style={{ marginRight: "10px" }}
              />
              {moment(job.time).fromNow()}
            </div>
            <div style={{ paddingTop: "20px" }}>
              <h2>Benefit</h2>
              <ul className="benefit-list" style={{ fontSize: "18px" }}>
                {job.benefits.map((benefit) => (
                  <li>{benefit}</li>
                ))}
              </ul>
            </div>
            <div style={{ paddingTop: "20px" }}>
              <h2>Description</h2>
              <div>{job.description}</div>
            </div>
            <Button
              variant="danger"
              style={{ width: "100%", marginTop: "30px", fontSize: "18px" }}
            >
              Apply Now
            </Button>
            <a href="" onClick={() => history.push("/")}>
              Back to main page
            </a>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default JobDetail;
