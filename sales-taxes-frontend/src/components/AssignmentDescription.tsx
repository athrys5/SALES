import { Col, Row } from "antd";

const AssignmentDescription: React.FC = () => {
  return (
    <Row justify={"center"}>
      <Col span={12}>
        <h1>Sales taxes problem</h1>
        <hr></hr>
        <p>
          This problem requires some kind of input. You are free to implement
          any mechanism for feeding input into your solution (for example, using
          hard coded data within a unit test). You should provide sufficient
          evidence that your solution is complete by, as a minimum, indicating
          that it works correctly against the supplied test data.
        </p>
        <h2>PROBLEM: SALES TAXES</h2>
        <hr></hr>
        <p>
          <b>Basic sales tax</b> is applicable at a rate of 10% on all goods,
          except books, food, and medical products that are exempt. Import duty
          is an additional sales tax applicable on all imported goods at a rate
          of 5%, with no exemptions. When I purchase items I receive a receipt
          which lists the name of all the items and their price (including tax),
          finishing with the total cost of the items, and the total amounts of
          sales taxes paid. The rounding rules for sales tax are that for a tax
          rate of n%, a shelf price of p contains (np/100 rounded up to the
          nearest 0.05) amount of sales tax. Write an application that prints
          out the receipt details for these shopping baskets...
        </p>
        <h1>General requirements</h1>
        <hr></hr>
        <ul>
          <li>
            You may use whatever programming language/platform you prefer. Use
            something that you know well.
          </li>
          <li>
            You must release your work with an OSI-approved open source license
            of your choice.
          </li>
          <li>
            You must deliver the sources of your application, with a README that
            explains how to compile and run it.
          </li>
          <li>Add the code to your own Github account and send us the link.</li>
        </ul>
        <p>
          <b>IMPORTANT:</b> Implement the requirements focusing on writing the
          best code you can produce.
        </p>
      </Col>
    </Row>
  );
};

export default AssignmentDescription;
