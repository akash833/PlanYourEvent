import React from "react";
import Layout from "./components/layout";
import { Row, Col } from "react-grid-system";
import { useRouter } from "next/router";

const analytics = () => {
  const router = useRouter();

  const getDailyAnalytics = [
    {
      seriesNo: "01",
      image1: "/assets/images/iconRoun.png",
      desc: "The Story of Danau Toba",
      saleNo: "435",
      saleText: "Sale",
      image2: "/assets/images/ic_stat.png",
      image3: "/assets/images/VectorColor.png",
    },
    {
      seriesNo: "02",
      image1: "/assets/images/iconRoun.png",
      desc: "Live Choir in Sydney 2020",
      saleNo: "241",
      saleText: "Sale",
      image2: "/assets/images/ic_stat.png",
      image3: "/assets/images/VectorRed.png",
    },
    {
      seriesNo: "03",
      image1: "/assets/images/iconRoun.png",
      desc: "Jakarta Indie Music Festival 2020",
      saleNo: "325",
      saleText: "Sale",
      image2: "/assets/images/ic_stat.png",
      image3: "/assets/images/VectorColor.png",
    },
    {
      seriesNo: "04",
      image1: "/assets/images/iconRoun.png",
      desc: "Artist Performing Festival In Aus..",
      saleNo: "435",
      saleText: "Sale",
      image2: "/assets/images/ic_stat.png",
      image3: "/assets/images/VectorRed.png",
    },
    {
      seriesNo: "05",
      image1: "/assets/images/iconRoun.png",
      desc: "[LIVE] Football Charity Event 2020",
      saleNo: "270",
      saleText: "Sale",
      image2: "/assets/images/ic_stat.png",
      image3: "/assets/images/VectorColor.png",
    },
  ];

  return (
    <Layout>
      <div className="text-sm py-2 px-6">
        <span style={{ color: "#13B497" }}>Dashboard /</span> Analytics
      </div>
      <Row className="mt-5">
        <Col md={6}>
          <div className="selling-board">
            <div className="flex justify-between text-white">
              Best Selling
              <div className="flex">
                <span className="this-week"> This week</span>
                <img
                  src={`${router.basePath}/assets/images/ic_chevron_down.png`}
                  className="ic-image"
                />
              </div>
            </div>
            <div className="flex tuesday-input text-white text-sm">
              Tuesday
              <div>215,523 pcs</div>
            </div>
            <div className="flex justify-between">
              <img
                src={`${router.basePath}/assets/images/pieCharts.png`}
                className="w-1/2"
              />
              <div className="mt-5 mb-auto">
                <img src={`${router.basePath}/assets/images/barChart.png`} />

                <img src={`${router.basePath}/assets/images/x-info.png`} />
              </div>
            </div>
          </div>
          <Row className="mt-5">
            <Col md={6}>
              <div className="total-sold-ticket-card">
                <div className="flex justify-between">
                  <span className="text-white">456k Pcs</span>
                  <div className="flex this-week">
                    Daily
                    <img
                      src={`${router.basePath}/assets/images/ic_chevron_down.png`}
                      className="ic-image"
                    />
                  </div>
                </div>
                <div className="this-week">Ticket Sold</div>
                <div className="mt-5">
                  <img
                    src={`${router.basePath}/assets/images/progressbar.png`}
                  />
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="total-sold-ticket-card">
                <div className="flex justify-between">
                  <span className="text-white">451509</span>
                  <div className="flex this-week">
                    This Week
                    <img
                      src={`${router.basePath}/assets/images/ic_chevron_down.png`}
                      className="ic-image"
                    />
                  </div>
                </div>
                <div className="this-week">Sales</div>
                <div className="mt-5">
                  <img
                    src={`${router.basePath}/assets/images/MaskGraph2.png`}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={6}>
              <div className="total-sold-ticket-card">
                <div className="flex justify-between">
                  <span className="text-white">$456623</span>
                  <div className="flex this-week">
                    Monthly
                    <img
                      src={`${router.basePath}/assets/images/ic_chevron_down.png`}
                      className="ic-image"
                    />
                  </div>
                </div>
                <div className="this-week">Income</div>
                <div className="mt-5">
                  <img src={`${router.basePath}/assets/images/MaskGraph.png`} />
                </div>
              </div>
            </Col>

            <Col md={6}>
              <div className="total-sold-ticket-card">
                <div className="flex justify-between">
                  <img
                    src={`${router.basePath}/assets/images/pieChartround.png`}
                    className="pichart"
                  />
                  <div>
                    <div className="flex this-week justify-end">
                      This Week
                      <img
                        src={`${router.basePath}/assets/images/ic_chevron_down.png`}
                        className="ic-image"
                      />
                    </div>
                    <div>
                      <img
                        src={`${router.basePath}/assets/images/legend.png`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div className="mt-5 selling-board">
            <div className="flex justify-between text-white">
              Trending Items
              <img
                src={`${router.basePath}/assets/images/ic_moreVertical.png`}
                className="ic-image"
              />
            </div>
            {getDailyAnalytics.map((e: any) => (
              <div className="mt-5 flex justify-between sales-table">
                <div className="text-white text-sm">{e.seriesNo}</div>
                <div>
                  <img src={e.image1} />
                </div>
                <div className="text-white text-sm">{e.desc}</div>
                <div>
                  <div className="text-digit">{e.saleNo}</div>
                  <div className="text-sm">{e.saleText}</div>
                </div>
                <div>
                  <img src={e.image2} />
                </div>
                <div>
                  <img src={e.image3} />
                </div>
              </div>
            ))}
          </div>
        </Col>
        <Col md={6}>
          <div className="sales-comparison">
            <div className="flex justify-between text-white">
              Sales Comparison
              <div className="flex text-3xl">
                <span className="text-white"> 94% </span>
                <img
                  src={`${router.basePath}/assets/images/ic_chevron_down.png`}
                  className="ic-image"
                />
              </div>
            </div>
            <div className="text-white">Than last day</div>
            <div>
              <img src={`${router.basePath}/assets/images/bars.png`} />
            </div>
            <div>
              <img src={`${router.basePath}/assets/images/x-info1.png`} />
            </div>
          </div>
          <div className="mt-5 selling-board">
            <div>
              <img src={`${router.basePath}/assets/images/title.png`} />
            </div>
            <div className="mt-5 flex">
              <div>
                <img src={`${router.basePath}/assets/images/y-info.png`} />
              </div>
              <div>
                <img src={`${router.basePath}/assets/images/linesgraph.png`} />
              </div>
            </div>
            <div className="mt-5">
              <img src={`${router.basePath}/assets/images/x-info.png`} />
            </div>
          </div>
          <div className="mt-6 selling-board">
            <div className="flex last-card">
              <img src={`${router.basePath}/assets/images/ic_stat.png`} />
              <div className="this-week">
                Income
                <div className="text-white text-xl">$1425142</div>
              </div>
              <div className="this-week">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis
              </div>
            </div>
          </div>
          <div className="mt-6 selling-board">
            <div className="flex last-card">
              <img src={`${router.basePath}/assets/images/ic_stat_trade.png`} />
              <div className="this-week">
                Customer
                <div className="text-white text-xl">109511</div>
              </div>
              <div className="this-week">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis
              </div>
            </div>
          </div>
          <div className="mt-6 selling-board">
            <div className="flex last-card">
              <img src={`${router.basePath}/assets/images/ic_statRound.png`} />
              <div className="this-week">
                Last than Year
                <div className="text-white text-xl">59%</div>
              </div>
              <div className="this-week">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default analytics;
