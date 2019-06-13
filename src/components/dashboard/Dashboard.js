import React from 'react';
import './reduction.css';
//import 'react-circular-progressbar/dist/styles.css'; 
import { Row, Col, Card, CardHeader, CardBody, CardTitle, CardSubtitle, Button, Breadcrumb, BreadcrumbItem, Badge, Container, Progress } from 'reactstrap';
import { Line, Pie, Doughnut, Bar, Radar, Polar } from 'react-chartjs-2';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
//import { getColor } from '../../utils/colors';
//import { randomNum } from '../../utils/demos';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
//import Icon from '@material-ui/core/Icon';
import Icon from '@mdi/react'
import { mdiStarCircle } from '@mdi/js'
import Drafts from '@material-ui/icons/Drafts';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pein: this.props.match.params.pein,
            pageNumber: 1,
            perPage: 10,
            sortIndex: 0,
            formErrors: [],
            fullName: '',
            email: '',
            rolesList: [],
            userRoles: '',
            orderBy: ['moduleEN']
        }

        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

        this.staticLineData = { "labels": ["January", "February", "March", "April", "May", "June", "July"], "datasets": [{ "label": "Dataset 1", "backgroundColor": " #6a82fb", "borderColor": " #6a82fb", "borderWidth": 1, "data": [678, 7, 761, 484, 475, 161, 390], "fill": false }, { "label": "Dataset 2", "backgroundColor": " #fc5c7d", "borderColor": " #fc5c7d", "borderWidth": 1, "data": [279, 169, 278, 495, 682, 411, 20], "fill": false }] };

        this.barData = { "labels": ["January", "February", "March"], "datasets": [{ "label": "Dataset 1", "backgroundColor": ["#44af69", "#5d89a8", "#d14f57"], "borderColor": " #6a82fb", "borderWidth": 1, "data": [130, 385, 289], "fill": false }] };

        this.pieData = { "labels": ["January", "February", "March", "April", "June"], "datasets": [{ "label": "Dataset 1", "backgroundColor": ["#44af69", "#5d89a8", "#d14f57", "yellow", "orange"], "borderWidth": 1, "data": [130, 385, 289, 57, 415], "fill": false }] };

        this.barOptions = {
            maintainAspectRatio: true,
            scales: {
                xAxes: [{
                    //ticks:{ padding: 20},
                    gridLines: {
                        display: false,
                        drawBorder: false
                    }
                }],
                yAxes: [{
                    ticks: { display: false },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    }
                }]
            },
            legend: {
                position: 'right',
                size: '50%',
                display: false
            }
        };

        this.spendingLineData = { "labels": ["January", "February", "March", "April", "May"], "datasets": [{ "label": "Spendings", "backgroundColor": " #6a82fb", "borderColor": " #6a82fb", "borderWidth": 1, "data": [678, 7, 761, 484, 475], "fill": false }] };
        this.savingsLineData = { "labels": ["January", "February", "March", "April", "May"], "datasets": [{ "label": "Savings", "backgroundColor": "green", "borderColor": " #6a82fb", "borderWidth": 1, "data": [678, 7, 761, 484, 475], "fill": false }] };
        this.foregoneSavingsLineData = { "labels": ["January", "February", "March", "April", "May"], "datasets": [{ "label": "F Savings", "backgroundColor": "brown", "borderColor": " #6a82fb", "borderWidth": 1, "data": [678, 7, 761, 484, 475], "fill": false }] };
    }

    componentDidMount() {
        //this.getRandomData(this.genLineData({ fill: false }, { fill: false }));
    }

    componentWillUnmount() {
        this.unmount = true;
    }
    /*          
    genLineData = (moreData = {}, moreData2 = {}) => {
        return {
            labels: this.months,
            datasets: [
                {
                    label: 'Dataset 1',
                    backgroundColor: getColor('primary'),
                    borderColor: getColor('primary'),
                    borderWidth: 1,
                    data: [
                        randomNum(),
                        randomNum(),
                        randomNum(),
                        randomNum(),
                        randomNum(),
                        randomNum(),
                        randomNum(),
                    ],
                    ...moreData,
                },
                {
                    label: 'Dataset 2',
                    backgroundColor: getColor('secondary'),
                    borderColor: getColor('secondary'),
                    borderWidth: 1,
                    data: [
                        randomNum(),
                        randomNum(),
                        randomNum(),
                        randomNum(),
                        randomNum(),
                        randomNum(),
                        randomNum(),
                    ],
                    ...moreData2,
                },
            ],
        };
    };

    genPieData = () => {
        return {
            datasets: [
                {
                    data: [randomNum(), randomNum(), randomNum(), randomNum(), randomNum()],
                    backgroundColor: [
                        getColor('primary'),
                        getColor('secondary'),
                        getColor('success'),
                        getColor('info'),
                        getColor('danger'),
                    ],
                    label: 'Dataset 1',
                },
            ],
            labels: ['Data 1', 'Data 2', 'Data 3', 'Data 4', 'Data 5'],
        };
    };
    */


    getRandomData(json) {
        //Get the file contents
        //var file = new File([JSON.stringify(json)], "export.json", { type: "application/json" });

        //Save the file contents as a DataURI
        var dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(json));

        //Write it as the href for the link
        //var link = document.getElementById('link').href = dataUri;
        let elem = document.createElement("a");

        elem.href = dataUri;
        elem.download = "export.json";

        document.body.append(elem);
        elem.click();
        elem.remove();
        elem = null;
        //<Bar data={this.genLineData({ fill: false }, { fill: false })} />
        //<Line data={this.genLineData({ fill: false }, { fill: false })} />
    }

    render() {
        return <div className='rolesPage pageWrapper newRolesPage'>
            <h1 className='medium'>Dashboard</h1>

            <div className='wrapper'>
                <Container>
                    <Row className="pills">
                        <Col md={{ span: 6, offset: 6 }}><Badge pill>Year: 2017</Badge><Badge pill>Subsidiary: All</Badge><Badge pill>Managers: All</Badge></Col>
                    </Row>
                    <Row>
                        <Col className="colTitle" >SUPPLIER COMPLIANCE STATS</Col>
                    </Row>
                    <Row className="statsBox">
                        {/* circle charts*/}
                        <Col xl={8} lg={4} md={6} className="circleCols" style={{ marginLeft: -30 }}>
                            <Card className="circleCharts">
                                <CardBody>
                                    <CircularProgressbarWithChildren value={100}
                                        styles={buildStyles({
                                            pathColor: `rgba(62, 152, 199, ${100 / 100})`,
                                            textColor: '#f88',
                                            trailColor: '#d6d6d6',
                                            backgroundColor: '#3e98c7',
                                        })}>
                                        <div style={{ fontSize: 12, marginTop: -5 }}><span>804</span></div>
                                        <div><p>SUPPLIERS</p></div>
                                    </CircularProgressbarWithChildren>
                                </CardBody>
                            </Card>
                            <Card className="circleCharts">
                                <CardBody>
                                    <CircularProgressbarWithChildren value={61}
                                        styles={buildStyles({
                                            pathColor: `rgba(106, 188, 147, ${100 / 100})`,
                                            textColor: '#f88',
                                            trailColor: '#d6d6d6',
                                            backgroundColor: '#3e98c7',
                                        })}>
                                        <div style={{ fontSize: 12, marginTop: -5 }}><span>61%</span></div>
                                        <div><p>CONTRACTED</p></div>
                                    </CircularProgressbarWithChildren>
                                </CardBody>
                            </Card>
                            <Card className="circleCharts">
                                <CardBody>
                                    <CircularProgressbarWithChildren value={39}
                                        styles={buildStyles({
                                            pathColor: `rgba(209, 79, 87, ${100 / 100})`,
                                            textColor: '#f88',
                                            trailColor: '#d6d6d6',
                                            backgroundColor: '#3e98c7',
                                        })}>
                                        <div style={{ fontSize: 12, marginTop: -5 }}><span>39%</span></div>
                                        <div><p>UNLISTED</p></div>
                                    </CircularProgressbarWithChildren>
                                </CardBody>
                            </Card>
                        </Col>


                        <div style={{ borderLeft: "2px solid gray", height: "180px", marginTop: "10px", marginLeft: "20px" }}></div>

                        <Col xl={4} lg={4} md={6} style={{paddingTop: 15}}> {/* badges */}
                            <List component="nav" aria-label="Contacts">
                                <ListItem button>
                                    <ListItemIcon>
                                        <Icon path={mdiStarCircle}
                                            size={1}
                                            horizontal
                                            vertical
                                            rotate={35}
                                            color="orange"
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary="8  Gold Partner" />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon>
                                        <Icon path={mdiStarCircle}
                                            size={1}
                                            horizontal
                                            vertical
                                            rotate={35}
                                            color="gray"
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary="55  Silver Partner" />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon>
                                        <Icon path={mdiStarCircle}
                                            size={1}
                                            horizontal
                                            vertical
                                            rotate={35}
                                            color="#bf8c46"
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary="100  Bronze Partner" />
                                </ListItem>
                            </List>
                        </Col>
                    </Row>
                    <Row className="statsBox">
                        <Col xl={4} lg={4} md={4}> {/* line charts*/}
                            <Card>
                                <CardHeader>Total Spending $2,113,507</CardHeader>
                                <CardBody>
                                    <Line data={this.spendingLineData} />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xl={4} lg={4} md={4}>
                            <Card>
                                <CardHeader>Savings $96,788</CardHeader>
                                <CardBody>
                                    <Line data={this.savingsLineData} />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xl={4} lg={4} md={4}>
                            <Card>
                                <CardHeader>Foregone Savings $526,536</CardHeader>
                                <CardBody>
                                    <Line data={this.foregoneSavingsLineData} />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row style={{ backgroundColor: "#f7f7f7" }}>
                        <div>&nbsp;</div>
                    </Row>
                    <Row className="statsBox" >
                        <Col xl={6} lg={12} md={12} style={{ marginLeft: "-25px" }} className="progressCards"> {/* progress bars*/}
                            <Card>
                                <CardTitle>RATE OF CONTRACT COMPLIANCE BY SUPPLIER CATEGORY</CardTitle>
                                <CardSubtitle style={{ display: "flex" }}>
                                    <div><span>Category & <br />Toy Supplier</span></div>
                                    <div><span># Suppliers</span></div>
                                    <div><span> Share of managed suppliers</span></div>
                                </CardSubtitle>
                                <CardBody >
                                    <Col xl={3}>
                                        <Row className="progressCategory">Category 1</Row>
                                        <Row className="progressSupplier">Supplier 0056</Row>
                                    </Col>
                                    <Col className="progressNumberSuppliers">610</Col>
                                    <Col className="progressBar"><Progress value={75} max="100" color="success">75%</Progress></Col>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody >
                                    <Col xl={3}>
                                        <Row className="progressCategory">Category 2</Row>
                                        <Row className="progressSupplier">Supplier 0149</Row>
                                    </Col>
                                    <Col className="progressNumberSuppliers">15</Col>
                                    <Col className="progressBar"><Progress value={47} max="100" color="orange">47%</Progress></Col>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <Col xl={3}>
                                        <Row className="progressCategory">Category 3</Row>
                                        <Row className="progressSupplier">Supplier 0007</Row>
                                    </Col>
                                    <Col className="progressNumberSuppliers">105</Col>
                                    <Col className="progressBar"><Progress value={84} max="100" color="info">84%</Progress></Col>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <Col xl={3}>
                                        <Row className="progressCategory">Category 4</Row>
                                        <Row className="progressSupplier">Supplier 0208</Row>
                                    </Col>
                                    <Col className="progressNumberSuppliers">20</Col>
                                    <Col className="progressBar"><Progress value={57} max="100" color="brown">57%</Progress></Col>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <Col xl={3}>
                                        <Row className="progressCategory">Category 5</Row>
                                        <Row className="progressSupplier">Supplier 0149</Row>
                                    </Col>
                                    <Col className="progressNumberSuppliers">29</Col>
                                    <Col className="progressBar"><Progress value={47} max="100" color="danger">47%</Progress></Col>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <Col xl={3}>
                                        <Row className="progressCategory">Category 6</Row>
                                        <Row className="progressSupplier">Supplier 0401</Row>
                                    </Col>
                                    <Col className="progressNumberSuppliers">25</Col>
                                    <Col className="progressBar"><Progress value={33} max="100" color="yellow">33%</Progress></Col>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col xl={6} lg={12} md={12} style={{ width: "auto" }}> {/* charts */}
                            <Card>
                                <CardBody>
                                    <Bar data={this.barData} options={this.barOptions} />
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <Pie data={this.pieData} />
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <Doughnut data={this.pieData} />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row style={{ backgroundColor: "#f7f7f7" }}>
                        <div>&nbsp;</div>
                    </Row>
                </Container>
            </div>
        </div>
    }
}

export default Dashboard;