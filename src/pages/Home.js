import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { Line, Bar } from "react-chartjs-2";
import { fetchDashboardlistData } from "../reducer/thunks";
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spin } from 'antd';
import Loader from "../components/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [barChartData, setBarChartData] = useState(null);
  const [weeklyLineChar, setweeklyLineChart] = useState(null);

  // Destructuring with different names to avoid conflict
  const {
    data: Dashboardlistres,
    loading: bannerLoading,
    error: bannerError,
  } = useSelector((state) => state.data);
  document.title = "Winter Bear";
  document.getElementsByTagName("META")[2].content = "Winter Bear";

  const salesData = [1000, 1200, 800, 1500, 1100, 1300];

  const lineChartData = {
    labels: ["Mon", "Tue", "Wed", "ths", "fir", "sat", "sun"],
    datasets: [
      {
        label: "Monthly Sales (Line)",
        data: salesData,
        fill: true,
        borderColor: "#fbaf41",
        tension: 0.4,
      },
    ],
  };

  const getLineChartData = (chartYears) => {
    const months = Object.keys(chartYears);

    const datasets = [
      {
        label: "Sales (Line)",
        data: months.map((month) => chartYears[month]),
        fill: true,
        borderColor: "#fbaf41",
        tension: 0.4,
      },
    ];

    return {
      labels: months.map((month) => capitalizeFirstThreeLetters(month)),
      datasets: datasets,
    };
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const options1 = {
    scales: {
      x: {
        display: false,
        beginAtZero: true,
      },
      y: {
        display: false,
        beginAtZero: true,
      },
    },
  };

  const capitalizeFirstThreeLetters = (string) => {
    if (string.length >= 3) {
      return string.substring(0, 3).toUpperCase();
    } else {
      // If the string has fewer than 3 characters, just capitalize the entire string
      return string.toUpperCase();
    }
  };

  const getBarChartData = (chartYears) => {
    const months = Object.keys(chartYears);

    const datasets = [
      {
        label: "Sales",
        data: months.map((month) => chartYears[month]),
        backgroundColor: months.map((_, index) =>
          index % 2 === 0 ? "#fbaf41" : "rgba(75, 192, 192, 1)"
        ),
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barThickness: 12,
        borderRadius: 20, // Set the border radius for all bars
      },
    ];

    return {
      labels: months.map((month) => capitalizeFirstThreeLetters(month)),
      datasets: datasets,
    };
  };



  useEffect(() => {
    const fetchData = async () => {
      console.log('call the');
      // Dispatch action to fetch data
      await dispatch(fetchDashboardlistData());

      // Check if the data is available and not undefined
      if (Dashboardlistres && Dashboardlistres.chartYears) {
        // Process the data and update the state
        const chartData = getBarChartData(Dashboardlistres.chartYears);
        setBarChartData(chartData);
      }
      if (Dashboardlistres && Dashboardlistres.last7DaysAmount) {
        const weeklyLineChartData = getLineChartData(
          Dashboardlistres.last7DaysAmount
        );
        console.log(weeklyLineChartData, "weeklyLineChartData");
        setweeklyLineChart(weeklyLineChartData);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="position-relative">
      <Header />
      <div className="container-fluid  ">
        <div className="row ">
          <Sidebar />
          <div className="col-md-10  bg-light dashboard">
            <div className="main px-5 my-5">
              <div className="row">
                <div className="col-md-8">
                  <p className="fs-3 fw-semibold text-start col-md-6 col-12">
                    {" "}
                    Dashboard Overview
                  </p>
                </div>
                <div className="col-md-4">
                
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 row">
                  <div className="col-md-3">
                    <div className="overview mt-3 px-3 py-3 bg-white ">
                      <div className="row d-flex">
                        <div className="col-4">
                          <div className="text-dark text-center">
                            <span className="icon text-light ">
                              <img
                                src="assets/images/today-order.png"
                                className=""
                                alt=""
                              />
                            </span>
                          </div>
                        </div>
                        <div className="col-8 d-flex align-self-center justify-content-center">
                          <div className="details text-center">
                          <p className="fw-semibold fs-6 mb-0 text-secondary">
                                Today Order
                              </p>
                              <p className="fw-normal fs-6 mb-0 text-secondary-emphasis">
                                Rs.{" "}
                                {
                                  Dashboardlistres?.orders?.today_order
                                    .total_amount
                                }
                              </p>
                          </div>
                        </div>
                      </div>
                      <div className="overview-details">
                        <div className="row mb-0 px-3 mt-2 border-top ">
                          <div className="col-6">
                            <p className="fw-semibold small my-1 text-secondary">
                              Cash :
                            </p>
                            <p className="fw-normal fs-6 mb-0 text-secondary-emphasis">
                              Rs.{" "}
                              {
                                Dashboardlistres?.orders?.today_order
                                  .total_amount_cash
                              }
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="fw-semibold small my-1 text-secondary">
                              Card
                            </p>
                            <p className="fw-normal fs-6 mb-0 text-secondary-emphasis">
                              Rs.{" "}
                              {
                                Dashboardlistres?.orders?.today_order
                                  .total_amount_card
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*first item complete*/}
                  <div className="col-md-3 ">
                    <div className="overview mt-3 px-3 py-3 bg-white">
                      <div className="row d-flex">
                        <div className="col-4   ">
                          <div className="text-dark   text-center">
                            <span className="icon  text-light ">
                              <img
                                src="assets/images/yesterday-order.png"
                                className="   "
                                alt=""
                              />
                            </span>
                          </div>
                        </div>
                        <div className="col-8 d-flex align-self-center justify-content-center">
                          <div className="details text-center">
                            <div>
                              <p className="fw-semibold fs-6 mb-0 text-secondary">
                                Yesterday Order
                              </p>
                              <p className="fw-normal fs-6 mb-0 text-secondary-emphasis">
                                Rs.{" "}
                                {
                                  Dashboardlistres?.orders?.yesterday_order
                                    .total_amount_card
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="overview-details">
                        <div className="row mb-0 mt-2 px-3 border-top ">
                          <div className="col-6">
                            <p className="fw-semibold small my-1 text-secondary">
                              Cash :
                            </p>
                            <p className="fw-normal fs-6 mb-0 text-secondary-emphasis">
                              Rs.{" "}
                              {
                                Dashboardlistres?.orders?.yesterday_order
                                  .total_amount_cash
                              }
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="fw-semibold small my-1 text-secondary">
                              Card
                            </p>
                            <p className="fw-normal fs-6 mb-0 text-secondary-emphasis">
                              Rs.{" "}
                              {
                                Dashboardlistres?.orders?.yesterday_order
                                  .total_amount_card
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*2ed item complete*/}
                  <div className="col-md-3 ">
                    <div className="overview mt-3 px-3 py-3 bg-white">
                      <div className="row d-flex">
                        <div className="col-4   ">
                          <div className="text-dark   text-center">
                            <span className="icon  text-light ">
                              <img
                                src="assets/images/month-order.png"
                                className="   "
                                alt=""
                              />
                            </span>
                          </div>
                        </div>
                        <div className="col-8 d-flex align-self-center justify-content-center">
                          <div className="details text-center">
                            <div>
                              <p className="fw-semibold fs-6 mb-0 text-secondary">
                                Month Order
                              </p>
                              <p className="fw-normal fs-6 mb-0 text-secondary-emphasis">
                                Rs.{" "}
                                {
                                  Dashboardlistres?.orders?.months_order
                                    .total_amount_card
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="overview-details">
                        <div className="row mb-0 mt-2 px-3 border-top ">
                          <div className="col-6">
                            <p className="fw-semibold small my-1 text-secondary">
                              Cash :
                            </p>
                            <p className="fw-normal fs-6 mb-0 text-secondary-emphasis">
                              Rs.{" "}
                              {
                                Dashboardlistres?.orders?.months_order
                                  .total_amount_cash
                              }
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="fw-semibold small my-1 text-secondary">
                              Card
                            </p>
                            <p className="fw-normal fs-6 mb-0 text-secondary-emphasis">
                              Rs.{" "}
                              {
                                Dashboardlistres?.orders?.months_order
                                  .total_amount_card
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*3rd item complete*/}
                  <div className="col-md-3 ">
                    <div className="overview mt-3 px-3 py-3 bg-white">
                      <div className="row d-flex">
                        <div className="col-4   ">
                          <div className="text-dark   text-center">
                            <span className="icon  text-light ">
                              <img
                                src="assets/images/all-time-order.png"
                                className="   "
                                alt=""
                              />
                            </span>
                          </div>
                        </div>
                        <div className="col-8 d-flex align-self-center justify-content-center">
                          <div className="details text-center">
                            <div>
                              <p className="fw-semibold fs-6 mb-0 text-secondary">
                                All Time Sales
                              </p>
                              <p className="fw-normal fs-6 mb-0 text-secondary-emphasis">
                                Rs.{" "}
                                {
                                  Dashboardlistres?.orders?.total_order
                                    .total_amount_card
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="overview-details">
                        <div className="row mb-0 mt-2 px-3 border-top ">
                          <div className="col-6">
                            <p className="fw-semibold small my-1 text-secondary">
                              Cash :
                            </p>
                            <p className="fw-normal fs-6 mb-0 text-secondary-emphasis">
                              Rs.{" "}
                              {
                                Dashboardlistres?.orders?.total_order
                                  .total_amount_cash
                              }
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="fw-semibold small my-1 text-secondary">
                              Card
                            </p>
                            <p className="fw-normal fs-6 mb-0 text-secondary-emphasis">
                              Rs.{" "}
                              {
                                Dashboardlistres?.orders?.total_order
                                  .total_amount_card
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*4th item complete*/}
                </div>
              </div>
              {/*start 2 item*/}
              <div className="row my-4">
                <div className="col-md-12">
                  <p className="fs-3 fw-semibold"> Sales</p>
                  <div className="row p-3">
                    <div className="col-md-6 bg-white rounded pt-5">
                      {barChartData && barChartData.labels && (
                        <Bar data={barChartData} options={options} />
                      )}
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <div className="overview p-2 bg-white">
                            <div className="row d-flex">
                              <div className="col-4  home2">
                                <div className="text-dark fs-2 fw-normal text-center mt-2 mb-2">
                                  <span className="">
                                  <img
                                src="assets/images/cart.svg"
                                className="fa-solid  text-gray"
                                alt=""
                              />
                                    {/* <i className="fa-solid fa-cart-shopping text-gray " /> */}
                                  </span>
                                </div>
                              </div>
                              <div className="col-8 d-flex align-self-center justify-content-center ">
                                <div className="details text-center">
                                  <div>
                                    <p className="fw-semibold fs-6 mb-0 text-secondary">
                                      Total Order
                                    </p>
                                    <p className="fw-normal fs-6 mb-0 text-secondary-emphasis">
                                     {" "}
                                      {Dashboardlistres?.sales?.canceled_order}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/*first item complete*/}
                        <div className="col-md-6  mb-3">
                          <div className="overview p-2 bg-white">
                            <div className="row d-flex">
                              <div className="col-4  home2 ">
                                <div className="text-dark fs-2 fw-normal text-center mt-2 mb-2">
                                  <span className="">
                                    {/* <i className="fa-solid fa-clock text-gray " /> */}
                                    <img
                                src="assets/images/time.svg"
                                className="fa-solid  text-gray"
                                alt=""
                              />
                                  </span>
                                </div>
                              </div>
                              <div className="col-8 d-flex align-self-center justify-content-center">
                                <div className="details text-center">
                                  <div>
                                    <p className="fw-semibold fs-6 mb-0 text-secondary">
                                      Pending Order{" "}
                                    </p>
                                    <p className="fw-normal fs-6 mb-0 text-secondary-emphasis">
                                      {" "}{Dashboardlistres?.sales?.pending_order}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/*2ed item complete*/}
                        <div className="col-md-6  mb-3">
                          <div className="overview p-2 bg-white">
                            <div className="row d-flex">
                              <div className="col-4 home2">
                                <div className="text-dark fs-2 fw-normal text-center mt-2 mb-2">
                                  <span className="">
                                    {/* <i className="fa-solid fa-bus text-gray " /> */}
                                    <img
                                src="assets/images/driver.svg"
                                className="fa-solid  text-gray"
                                alt=""
                              />
                                  </span>
                                </div>
                              </div>
                              <div className="col-8 d-flex align-self-center justify-content-center">
                                <div className="details text-center">
                                  <div>
                                    <p className="fw-semibold fs-6 mb-0 text-secondary">
                                      {" "}
                                      Order Process
                                    </p>
                                    <p className="fw-normal fs-6 mb-0 text-secondary-emphasis">
                                      {" "}{Dashboardlistres?.sales?.processing_order}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/*3rd item complete*/}
                        <div className="col-md-6  mb-3">
                          <div className="overview p-2 bg-white">
                            <div className="row d-flex">
                              <div className="col-4  home2 ">
                                <div className="text-dark fs-2 fw-normal text-center mt-2 mb-2">
                                  <span className="">
                                    {/* <i className="fa-solid fa-truck text-gray " /> */}
                                    <img
                                src="assets/images/note.svg"
                                className="fa-solid  text-gray"
                                alt=""
                              />
                                  </span>
                                </div>
                              </div>
                              <div className="col-8 d-flex align-self-center justify-content-center">
                                <div className="details text-center">
                                  <div>
                                    <p className="fw-semibold fs-6 mb-0 text-secondary">
                                      {" "}
                                      Order Delivered
                                    </p>
                                    <p className="fw-normal fs-6 mb-0 text-secondary-emphasis">
                                       {" "}{Dashboardlistres?.sales?.delivered_order}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/*4ed item complete*/}
                        <div className="col-md-6  mb-3">
                          <div className="overview p-2 bg-white">
                            <div className="row d-flex">
                              <div className="col-4  home2 ">
                                <div className="text-dark fs-2 fw-normal text-center mt-2 mb-2">
                                  <span className="">
                                    {/* <i className="fa-solid fa-clock text-gray " /> */}
                                    <img
                                src="assets/images/timelist.svg"
                                className="fa-solid  text-gray"
                                alt=""
                              />
                                  </span>
                                </div>
                              </div>
                              <div className="col-8 d-flex align-self-center justify-content-center">
                                <div className="details text-center">
                                  <div>
                                    <p className="fw-semibold fs-6 mb-0 text-secondary">
                                    Order Completed 
                                    </p>
                                    <p className="fw-normal fs-6 mb-0 text-secondary-emphasis">
                                     {" "}{Dashboardlistres?.sales?.completed_order}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/*5rd item complete*/}
                        <div className="col-md-6  mb-3">
                          <div className="overview p-2 bg-white">
                            <div className="row d-flex">
                              <div className="col-4  home2 ">
                                <div className="text-dark fs-2 fw-normal text-center mt-2 mb-2">
                                  <span className="">
                                    {/* <i className="fa-solid fa-box text-gray " /> */}
                                    <img
                                src="assets/images/box.svg"
                                className="fa-solid  text-gray"
                                alt=""
                              />
                                  </span>
                                </div>
                              </div>
                              <div className="col-8 d-flex align-self-center justify-content-center">
                                <div className="details text-center">
                                  <div>
                                    <p className="fw-semibold fs-6 mb-0 text-secondary">
                                    Shipped Order 
                                    </p>
                                    <p className="fw-normal fs-6 mb-0 text-secondary-emphasis">
                                    {" "}{Dashboardlistres?.sales?.shipped_order}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*4th item complete*/}
                  </div>
                </div>
              </div>
              {/*start 3 item*/}
              <div className="row my-4">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-6">
                      <p className="fs-3 fw-semibold">Weekly Sales</p>
                      <div className="row p-3">
                      <div className=" bg-white rounded pt-4">
                        {weeklyLineChar && weeklyLineChar.labels && (
                          <Line data={weeklyLineChar} options={options} />
                        )}
                        {/* <Line data={lineChartData} options={options} /> */}
                      </div>

                      </div>
                     
                      {/*  <img src="assets/images/graph2.png" className="img-fluid" /> */}
                    </div>
                    {/* <div className="col-md-6  mb-3">
                      <p className="fs-3 fw-semibold">Best Selling Product</p>
                     

                      <div className="row  mx-auto  px-3 py-3 bg-white">
                      <div className="container   ">
                        <div className="row justify-content-center px-1 ">
                          <div className="col-md-3 col-6 mb-3 rouneded">
                            <div className="circle">
                              <div className="text"> 60%</div>
                            </div>
                          </div>
                          <div className="col-md-3 col-6 mb-3 rouneded">
                            <div className="circle">
                              <div className="text">60%</div>
                            </div>
                          </div>
                          <div className="col-md-3 col-6 mb-3 rouneded">
                            <div className="circle">
                              <div className="text">60%</div>
                            </div>
                          </div>
                          <div className="col-md-3 col-6 mb-3 rouneded">
                            <div className="circle">
                              <div className="text">60%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                        <div className="col-12">
                          <div className="row">
                            <div className="col-md-3 col-6">
                              Lorem
                            </div>
                            <div className="col-md-9 col-6 ">
                              <div
                                className="progress mt-3 mb-3"
                                role="progressbar"
                                aria-label="Example 1px high"
                                aria-valuenow={25}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ height: 2 }}
                              >
                                <div
                                  className="progress-bar progress-bar-striped bg-danger"
                                  style={{ width: "25%" }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-3 ps-2">Lorem</div>
                            <div className="col-9 ">
                              <div
                                className="progress mt-3 mb-3"
                                role="progressbar"
                                aria-label="Example 1px high"
                                aria-valuenow={25}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ height: 2 }}
                              >
                                <div
                                  className="progress-bar progress-bar-striped bg-warning"
                                  style={{ width: "25%" }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-3 ps-2">Lorem </div>
                            <div className="col-9 ">
                              <div
                                className="progress mt-3 mb-3"
                                role="progressbar"
                                aria-label="Example 1px high"
                                aria-valuenow={25}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ height: 2 }}
                              >
                                <div
                                  className="progress-bar progress-bar-striped bg-success"
                                  style={{ width: "25%" }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-3 ps-2">Lorem</div>
                            <div className="col-9 ">
                              <div
                                className="progress mt-3 mb-3"
                                role="progressbar"
                                aria-label="Example 1px high"
                                aria-valuenow={25}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ height: 2 }}
                              >
                                <div
                                  className="progress-bar"
                                  style={{ width: "25%" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    {/*4th item complete*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {!Dashboardlistres && <Loader/>}
     
    </div>
  );
};

export default Home;
