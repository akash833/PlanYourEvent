import React from "react";
import Layout from "./components/layout";
import { Row, Col } from "react-grid-system";
import { useRouter } from "next/router";

const mainDashboard = () => {
  const router = useRouter();

  const events = [
    {
      name: "Olivia Johanson",
      min: 2,
      type: "Event AB",
    },
    {
      name: "Griezerman",
      min: 4,
      type: "Event FG",
    },
    {
      name: "Olivia Johanson",
      min: 6,
      type: "Event BG",
    },
    {
      name: "Olivia Johanson",
      min: 8,
      type: "Event AB",
    },
  ];

  const lastCard = [
    {
      coverImg: "/assets/images/coverImage.png",
      year: "Last than Year",
      persent: "Medan, Indonesia",
      persentText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis",
      dollerImg: "/assets/images/iconDoll.png",
      dollerRs: "$12300",
      dollerImg2: "/assets/images/iconStore.png",
      dollerRs2: "561 pcs Left",
      dollerImg3: "/assets/images/iconData.png",
      dollerRs3: "24 June 2020",
    },
    {
      coverImg: "/assets/images/coverImage.png",
      year: "Last than Year",
      persent: "Medan, Indonesia",
      persentText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis",
      dollerImg: "/assets/images/iconDoll.png",
      dollerRs: "$12300",
      dollerImg2: "/assets/images/iconStore.png",
      dollerRs2: "561 pcs Left",
      dollerImg3: "/assets/images/iconData.png",
      dollerRs3: "24 June 2020",
    },
    {
      coverImg: "/assets/images/coverImage.png",
      year: "Last than Year",
      persent: "Medan, Indonesia",
      persentText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis",
      dollerImg: "/assets/images/iconDoll.png",
      dollerRs: "$12300",
      dollerImg2: "/assets/images/iconStore.png",
      dollerRs2: "561 pcs Left",
      dollerImg3: "/assets/images/iconData.png",
      dollerRs3: "24 June 2020",
    },
  ];

  const handleViewDetails = () =>{
    debugger
    router.push("/order-list");
  }

  return (
    <Layout>
      <Row>
        <Col md={6}>
          <div className="mt-5 ticket-sold-today">
            <div className="flex justify-between text-white">
              Ticket Sold Today
              <img src={`${router.basePath}/assets/images/subInfo.png`} />
            </div>
            <div className="text-white text-2xl">
              456502<span className="ml-2 text-xs">pcs</span>
            </div>
            <div className="mt-5">
              <img src={`${router.basePath}/assets/images/progressbar2.png`} />
            </div>
            <div className="mt-5 sold-today">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad mini
            </div>
            <button
              className="mt-5 flex text-white view-detail"
              onClick={handleViewDetails}
            >
              <span className="view-detail2">View details</span>
              <img
                src={`${router.basePath}/assets/images/arrow.png`}
                className="imgArr"
              />
            </button>
          </div>
        </Col>
        <Col md={6}>
          <Row className="mt-5">
            <Col md={6}>
              <div className="total-sold-ticket-card-main-dashboard">
                <div className="flex justify-between p-3">
                  <span className="text-white">456k Pcs</span>
                  <div className="flex this-week">
                    Daily
                    <img
                      src={`${router.basePath}/assets/images/ic_chevron_down.png`}
                      className="ic-image"
                    />
                  </div>
                </div>
                <div className="this-week p-3">Ticket Sold</div>
                <div className="mt-5">
                  <img
                    src={`${router.basePath}/assets/images/progressbar.png`}
                  />
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="total-sold-ticket-card-main-dashboard">
                <div className="flex justify-between p-3">
                  <span className="text-white">451509</span>
                  <div className="flex this-week">
                    This Week
                    <img
                      src={`${router.basePath}/assets/images/ic_chevron_down.png`}
                      className="ic-image"
                    />
                  </div>
                </div>
                <div className="this-week p-3">Sales</div>
                <img src={`${router.basePath}/assets/images/Group12.png`} />
              </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={6}>
              <div className="total-sold-ticket-card-main-dashboard">
                <div className="flex justify-between p-3">
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
            <Col md={6}>
              <div className="total-sold-ticket-card-main-dashboard">
                <div className="flex justify-between p-3">
                  <span className="text-white">$456623</span>
                  <div className="flex this-week">
                    Monthly
                    <img
                      src={`${router.basePath}/assets/images/ic_chevron_down.png`}
                      className="ic-image"
                    />
                  </div>
                </div>
                <div className="this-week p-3">Income</div>
                <div className="mt-5">
                  <img src={`${router.basePath}/assets/images/MaskGraph.png`} />
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={8}>
          <div>
            <img
              src={`${router.basePath}/assets/images/salesRevenue.png`}
              className="mt-5 salesReve"
            />
          </div>
        </Col>
        <Col md={4}>
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

            <div className="mt-5 mb-auto">
              <img src={`${router.basePath}/assets/images/barChart.png`} />

              <img src={`${router.basePath}/assets/images/x-info.png`} />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={4}>
          <div className="graph latest-sale-main width-100 p-8">
            <div className="flex justify-between py-6">
              <p className="text-white">Latest Sales</p>
              <img
                src={`${router.basePath}/assets/images/ic_moreVertical.png`}
                className="ic-image"
              />
            </div>

            {events.map((ev) => (
              <div key={ev.name} className="flex py-5">
                <div className="w-2/12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 110 104"
                    fill="none"
                    className="max-w-full"
                  >
                    <ellipse
                      cx="54.6"
                      cy="51.794"
                      rx="54.6"
                      ry="51.3275"
                      fill="#13B497"
                    />
                    <path
                      d="M50.1988 34.3903L26.3677 56.793C25.7911 57.3351 25.7911 58.214 26.3677 58.756L32.0231 64.0725C32.4341 64.4589 33.0478 64.5826 33.5912 64.3887C35.7607 63.6146 38.2214 64.1098 39.8601 65.6503C41.4987 67.1907 42.0255 69.504 41.2021 71.5434C40.9958 72.0542 41.1274 72.6312 41.5384 73.0175L47.1939 78.3341C47.7706 78.8761 48.7055 78.8761 49.2821 78.3341L73.1132 55.9313L50.1988 34.3903Z"
                      fill="white"
                    />
                    <path
                      d="M82.8322 44.8319L77.1767 39.5154C76.7657 39.129 76.1519 39.0052 75.6086 39.1992C73.4391 39.9733 70.9785 39.478 69.3398 37.9375C67.7012 36.3971 67.1744 34.0839 67.9978 32.0444C68.204 31.5337 68.0723 30.9567 67.6614 30.5703L62.0059 25.2538C61.4293 24.7118 60.4943 24.7118 59.9177 25.2538L52.287 32.4272L75.2015 53.9683L82.8322 46.7949C83.4088 46.2529 83.4088 45.374 82.8322 44.8319Z"
                      fill="white"
                    />
                  </svg>
                </div>

                <div className="name w-10/12">
                  <p>Olivia Johanson</p>
                  <div className="flex justify-between">
                    <small>Event AB</small>
                    <small>{ev.min}m ago</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Col>
        <Col md={8}>
          <div className="selling-board-new">
            {lastCard.map((e: any) => (
              <div className="flex last-card-new">
                <img src={e.coverImg} />
                <div className="this-week">
                  {e.year}
                  <div className="persent-text">{e.persent}</div>
                  <div className="mt-3 this-week-new">{e.persentText}</div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <img src={e.dollerImg} />
                    <div className="mt-2 text-white text-xs">{e.dollerRs}</div>
                  </div>
                  <div>
                    <img src={e.dollerImg2} />
                    <div className="mt-2 text-white text-xs">{e.dollerRs2}</div>
                  </div>
                  <div>
                    <img src={e.dollerImg3} />
                    <div className="mt-2 text-white text-xs">{e.dollerRs3}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default mainDashboard;
