
// node.js library that concatenates classes (strings)
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
// reactstrap components
import {
  Button,
  Card,
  CardHeader,

  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

import MUIDataTable from "mui-datatables";

// core components
// import {
//   chartOptions,
//   parseOptions,
// } from "../variables/charts";

import Header from "../components/Headers/Header";

const Index = () => {
  // if (window.Chart) {
  //   parseOptions(Chart, chartOptions());
  // }

  const columns = ["Name", "Company", "City", "State"];
  
  const data = [
  ["Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT"],
  ["Bob Herm", "Test Corp", "Tampa", "FL"],
  ["James Houston", "Test Corp", "Dallas", "TX"],
  ];
  
  const options = {
  filterType: 'checkbox',
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Page visits</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>

<MUIDataTable
  title={"Employee List"}
  data={data}
  columns={columns}
  options={options}
/>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
