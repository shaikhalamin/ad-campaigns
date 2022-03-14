import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form, Accordion, ListGroup } from "react-bootstrap";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Layout from "../layouts/Layout";
import {
  getCampaign,
  prepareFormData,
  updateCampaign,
} from "../../helpers/api.helpers";

import { BASEURL } from "../../helpers/api.helpers";

const campaignSchema = yup
  .object({
    name: yup.string().required("Campaign name is required"),
    from: yup.date("From must be date type").required("From date is required"),
    to: yup.date(" To must be date type").required("To date is required"),
    daily_budget: yup.number().positive().required(),
    total_budget: yup.number().positive().required(),
    files: yup.mixed().notRequired(),
  })
  .required();

function EditCampaign() {
  const { id } = useParams();
  let navigate = useNavigate();

  const [uploadedImages, setUploadedImages] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    resolver: yupResolver(campaignSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (id) {
      getCampaign(id).then((res) => {
        const { images, name, from, to, daily_budget, total_budget } = res.data;
        setValue("name", name);
        setValue("from", from);
        setValue("to", to);
        setValue("daily_budget", daily_budget);
        setValue("total_budget", total_budget);
        images.length > 0 && setUploadedImages(images);
      });
    }
  }, [setValue, id]);

  const onSubmit = async (data) => {
    const payload = prepareFormData(data, "PUT");

    updateCampaign(id, payload)
      .then((res) => {
        navigate(`/`);
      })
      .catch((err) => {
        alert(err?.response?.data?.message);
      });
  };

  return (
    <>
      <Layout>
        <Row className="mt-3 mb-5 border">
          <Col lg={12}>
            <Link
              to="/"
              className="text-dark btn btn-outline-info text-dark mb-5"
            >
              Back to List
            </Link>
            <h4 className="text-center mb-3 mt-3">Edit Advertise Campaign</h4>
            <Row>
              <Col md={{ span: 8, offset: 2 }} className="mb-5">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="Name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        {...register("name")}
                        autoComplete="off"
                      />
                      {errors?.name && (
                        <p className="text-danger">{errors?.name?.message}</p>
                      )}
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="FromDate">
                      <Form.Label>From Date</Form.Label>
                      <Form.Control
                        type="text"
                        {...register("from")}
                        autoComplete="off"
                      />
                      {errors?.from && (
                        <p className="text-danger">{errors?.from?.message}</p>
                      )}
                    </Form.Group>

                    <Form.Group as={Col} controlId="ToDate">
                      <Form.Label>To Date</Form.Label>
                      <Form.Control
                        type="text"
                        {...register("to")}
                        autoComplete="off"
                      />
                      {errors?.to && (
                        <p className="text-danger">{errors?.to?.message}</p>
                      )}
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="dailyBudget">
                      <Form.Label>Daily budget</Form.Label>
                      <Form.Control
                        type="number"
                        {...register("daily_budget")}
                        autoComplete="off"
                      />
                      {errors?.daily_budget && (
                        <p className="text-danger">
                          {errors?.daily_budget?.message}
                        </p>
                      )}
                    </Form.Group>

                    <Form.Group as={Col} controlId="totalBudget">
                      <Form.Label>Total budget</Form.Label>
                      <Form.Control
                        type="number"
                        {...register("total_budget")}
                        autoComplete="off"
                      />
                      {errors?.total_budget && (
                        <p className="text-danger">
                          {errors?.total_budget?.message}
                        </p>
                      )}
                    </Form.Group>
                  </Row>

                  {uploadedImages.length > 0 && (
                    <Accordion defaultActiveKey="0" className="mb-2 mt-1">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          Uploaded Campaign List
                        </Accordion.Header>
                        <Accordion.Body>
                          <ListGroup horizontal>
                            {uploadedImages.map((image, index) => (
                              <ListGroup.Item key={index}>
                                <img
                                  src={`${BASEURL}/uploads/files/${image.url}`}
                                  alt={`${image.url}`}
                                  className="img-fluid"
                                />
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  )}

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="dailyBudget">
                      <Form.Label>Upload Files</Form.Label>
                      <Form.Control
                        type="file"
                        multiple
                        {...register("files")}
                      />
                      {errors?.files && (
                        <p className="text-danger">{errors?.files?.message}</p>
                      )}
                    </Form.Group>
                  </Row>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Layout>
    </>
  );
}

export default EditCampaign;
