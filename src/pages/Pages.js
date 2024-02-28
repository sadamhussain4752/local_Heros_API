import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import GalleryModal from "../components/GalleryModal";
import { fetchStorebanner, fetchFaqlist } from "../reducer/thunks";
import { useDispatch, useSelector } from "react-redux";
import FaqModal from "../components/FaqModal";

const Pages = () => {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("home");
  const [faqmodalopen, setFaqModel] = useState(false);
  const [faqId, setfaqId] = useState(false);
  const [modals, setModals] = useState({
    banner: false,
    about: false,
    faq: false,
    event: false,
  });

  const {
    loading: getOrderUserLoading,
    Ordererror: getOrderUserError,
    GetBannerList: GetBannerListResponse,
  } = useSelector((state) => state.GetBannerList);
  console.log(GetBannerListResponse);
  const {
    loading: loader,
    Ordererror: errorlist,
    GetFaqList: GetFaqListResponse,
  } = useSelector((state) => state.GetFaqList);
  console.log(GetFaqListResponse);

  useEffect(() => {
    dispatch(fetchStorebanner(1));
    dispatch(fetchFaqlist(1));
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleModalClose = (modalKey) => {
    setModals((prevModals) => ({ ...prevModals, [modalKey]: false }));
  };

  const handleModalOpen = (modalKey, tabId,id) => {
    console.log(modalKey);

    setModals((prevModals) => ({ ...prevModals, [modalKey]: true }));
    if (tabId === "settings") {
      setFaqModel(!faqmodalopen);
      setfaqId(id)
    }
  };

  const renderTabContent = (tabId, sectionTitle,id) => (
    <div
      className={`tab-pane card-page fade ${activeTab === tabId ? "show active" : ""}`}
      id={`v-pills-${tabId}`}
      role="tabpanel"
      aria-labelledby={`v-pills-${tabId}-tab`}
      tabIndex="0"
    >
      <div className="row px-3 my-3 bg-light mx-3">
        <div className="col-8 px-3">
          <p className="bg-light py-3 mb-0 ps-5">{sectionTitle}</p>
        </div>
        <div className="col-2 col-md-3 bg-light py-2 text-end">
          <button
            className="border-0 bg-main text-white btn rounded-pill"
            onClick={() => handleModalOpen(sectionTitle.toLowerCase(), tabId,id)}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header />

      <div className="container-fluid  pages">
        <div className="row">
          <Sidebar />

          <div className="col-md-10 bg-light px-md-4 my-md-4 px-3 py-3">
            <div className="row">
              <div className="col-12">
                <p className="fs-3 fw-semibold ">Pages</p>
              </div>
              <div className="col-lg-3 bg-light">
                <div
                  className="nav flex-column nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  {[
                    { id: "home", title: "Home" },
                    { id: "profile", title: "About" },
                    { id: "settings", title: "Faq's" },
                    { id: "messages", title: "Events" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      className={`nav-link accBtn card-page bg-transparent w-100 ${
                        activeTab === tab.id ? "active" : ""
                      }`}
                      id={`v-pills-${tab.id}-tab`}
                      data-bs-toggle="pill"
                      data-bs-target={`#v-pills-${tab.id}`}
                      type="button"
                      role="tab"
                      aria-controls={`v-pills-${tab.id}`}
                      aria-selected={activeTab === tab.id ? "true" : "false"}
                      onClick={() => handleTabClick(tab.id)}
                    >
                      <div className="row bg-white ">
                        <div className="col-8">
                          <p className="my-3 text-dark bg-white px-3 text-start">
                            {tab.title}
                          </p>
                        </div>
                        <div className="col-4 bg-white py-3">
                          <div className="form-check mb-0">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id={`flexRadioDefault-${tab.id}`}
                              checked={activeTab === tab.id}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="col-lg-9 col-12">
                <div
                  className="tab-content mt-2 px-3 py-4 bg-white card-page"
                  id="v-pills-tabContent"
                >
                  {renderTabContent("home", "Banner")}
                  {renderTabContent("profile", "About")}
                  {/* {renderTabContent("settings", "General")} */}
                  {GetFaqListResponse?.faqs?.map((item) =>
                    renderTabContent("settings", item.title,item)
                  )}

                  {/* {renderTabContent("settings", "Return/Exchange/Cancel")}
                  {renderTabContent("settings", "Payment Method")}
                  {renderTabContent("settings", "Rewards")} */}
                  {renderTabContent("messages", "Event")}
                  {renderTabContent("settings1", "Events")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {GetBannerListResponse && GetBannerListResponse?.banners && (
        <GalleryModal
          onClose={() => handleModalClose("banner")}
          visible={modals.banner}
          title={"Banner"}
          itemvalues={GetBannerListResponse?.banners}
        />
      )}

      <GalleryModal
        onClose={() => handleModalClose("about")}
        visible={modals.about}
        title={"About"}
        itemvalues={GetBannerListResponse?.banners}
      />

      {/* <GalleryModal
        onClose={() => handleModalClose("faq")}
        visible={modals.faq}
        title={"Faq's"}
        itemvalues={GetBannerListResponse?.banners}

      /> */}

      <FaqModal
        itemvalues={faqId}
        onClose={() => {
          setFaqModel(!faqmodalopen);
        }}
        title={"Faq"}
        visible={faqmodalopen}
      />

      {/* <GalleryModal
        onClose={() => handleModalClose("event")}
        visible={modals.event}
        title={"Event"}
      /> */}

      <Footer />
    </>
  );
};

export default Pages;
