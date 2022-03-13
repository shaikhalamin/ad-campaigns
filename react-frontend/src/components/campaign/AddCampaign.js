import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Layout from "../layouts/Layout";
import { prepareFormData, saveCampaign } from "../../helpers/api.helpers";

const campaignSchema = yup
  .object({
    name: yup.string().required("Campaign name is required"),
    from: yup.date("From must be date type").required("From date is required"),
    to: yup.date(" To must be date type").required("To date is required"),
    daily_budget: yup.number().positive().required(),
    total_budget: yup.number().positive().required(),
    files: yup
      .mixed()
      .test("required", "Files required", (value) => value.length > 0),
  })
  .required();

function AddCampaign() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(campaignSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const payload = prepareFormData(data);
    saveCampaign(payload)
      .then((res) => {
        console.log(res);
        reset();
      })
      .catch((err) => {
        //alert(err.message);
        console.log(err);
      });
  };

  return (
    <>
      <Layout>
        <Row className="mt-5 mb-5 border">
          <Col lg={12}>
            <Link
              to="/create"
              className="text-dark btn btn-outline-info text-dark mb-5"
            >
              Back to List
            </Link>
            <h4 className="text-center mb-3 mt-5">Create Advertise Campaign</h4>

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

export default AddCampaign;
