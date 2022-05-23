/* eslint-disable no-sparse-arrays */
import "./App.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import LandingPage from "./Components/LandingPage/LandingPage";
import "bootstrap/dist/css/bootstrap.min.css";
import MyPo from "./Components/MyPoPage/MyPo";
import SinglePoDetails from "./Components/MyPoPage/SinglePoDetails/SinglePoDetails";
import PoHistory from "./Components/MyPoPage/PoHistory/PoHistory";
import ManageProfile from "./Components/MyPoPage/ManageProfile/ManageProfile";
import People from "./Components/MyPoPage/People/People";
import Disclaimer from "./Components/Disclaimer/Disclaimer";
import WhoWeAre from "./Components/WhoWeAre/WhoWeAre";
import ContactPage from "./Components/ContactPage/ContactPage";
import Login from "./Components/LoginRegistration/Login/Login";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./Components/LandingPage/NavBar/NavBar";
import CreateNewPo from "./Components/MyPoPage/CreateNewPo/CreateNewPo";
import Footer from "./Components/LandingPage/Footer/Footer";
import RootBrand from "./Components/MyPoPage/RootBrand/RootBrand";
import ForgetPassword from "./Components/LoginRegistration/ForgetPassWord/ForgetPassword";
import MultiStepsRegistrationForm
    from "./Components/LoginRegistration/MultiStepsRegistrationForm/MultiStepsRegistrationForm";
import CongratulationBox from "./Components/LoginRegistration/CongratulationBox/CongratulationBox";
import modules from "../src/modules/index";
import ViewAllPage from "./Components/LandingPage/ViewAllPage/ViewAllPage";
import PoDetailsViewPage from "./SupplierComponents/PoDetailsViewPage/PoDetailsViewPage";
import ManageOffer from "./SupplierComponents/SupplierPo/ManageOffer/ManageOffer";
import SubmitOffer from "./SupplierComponents/SupplierPoDetailsView/SubmitOffer/SubmitOffer";
import PoSearch from "./SupplierComponents/PoSearchViewPage/PoSearch";
import SearchPOItem from "./SupplierComponents/search/PoSearch";
import FavPo from "./Components/MyPoPage/FavPo/FavPo";
import ReviewPage from "./SupplierComponents/ReviewPage/ReviewPage";
import PendingPoDetails from "./Components/MyPoPage/PendingPoDetails/PendingPoDetails";
import CompletedPoDetails from "./Components/MyPoPage/CompletedPoDetails/CompletedPoDetails";
import DeclineCard from "./Components/MyPoPage/PoHistory/POHistoryDetails/DeclineCard/DeclineCard";
import DeclineManageOffer from "./SupplierComponents/SuppliermanageOfferDecline/DeclinedManageOffer/DeclineManageOffer";
import ExpiredCard from "./Components/MyPoPage/PoHistory/POHistoryDetails/ExpiredCard/ExpiredCard";
import CancelledOfferBox from "./SupplierComponents/SupplierPoHistory/CancelledOfferBox/CancelledOfferBox";
import CompletedOrdersWithRating
    from "./SupplierComponents/SupplierOrders/CompletedOrdersWithRating/CompletedOrdersWithRating";
import CompletedOrdersWithReviews
    from "./SupplierComponents/SupplierOrders/CompletedOrdersWithReviews/CompletedOrdersWithReviews";
import PrivateRoute from "./Components/privateRoute/PrivateRoute";
import ResetPassword from "./Components/LoginRegistration/ResetPassword/ResetPassword";
import PaymentStatusCard from "./SupplierComponents/AfterPaymentView/PaymentStatusCard/PaymentStatusCard";
import PendingPoDetailsPage from "./Components/MyPoPage/PendingPoDetails/PendingPoDetailsPage/PendingPoDetailsPage";
import ChatBot from "./Components/MyPoPage/MessageCenter/ChatBot/ChatBot";
import { getUser } from "./Components/LoginRegistration/Login/_redux/Action";
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import ManageSupplierPoOffers from "./SupplierComponents/manageOffers/supplier/ManageSupplierPoOffers";
import SupplierActiveOfferDetails from "./SupplierComponents/manageOffers/supplier/SupplierActiveOfferDetails";
import SupplierCancelledOfferDetails from "./SupplierComponents/manageOffers/supplier/SupplierCancelledOfferDetails";
import RequesterPendingOfferDetails from "./SupplierComponents/manageOffers/requester/RequesterPendingOfferDetails";
import RequesterAcceptedOfferDetails from "./SupplierComponents/manageOffers/requester/RequesterAcceptedOfferDetails";
import RequesterCompletedOfferDetails from "./SupplierComponents/manageOffers/requester/RequesterCompletedOfferDetails";
import ManageRequesterPoOffers from "./SupplierComponents/manageOffers/requester/ManageRequesterPoOffers";
import OrdersDetails from "./SupplierComponents/OrderStatus/ongoing";
import OrdersCompleted from "./SupplierComponents/OrderStatus/Completed";

function App() {
    // eslint-disable-next-line no-sparse-arrays
    const { i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(localStorage.getItem('language'));
    }, [i18n]);

    const routes = [
        {
            path: "/myPo",
            sidebar: () => <RootBrand> </RootBrand>,
            main: () => <MyPo />,
        },
        {
            path: "/manageOffer",
            sidebar: () => <RootBrand> </RootBrand>,
            main: () => <ManageRequesterPoOffers />,
        },
        {
            path: "/poHistory",
            sidebar: () => <RootBrand> </RootBrand>,
            main: () => <PoHistory />,
        },
        {
            path: "/people",
            sidebar: () => <RootBrand> </RootBrand>,
            main: () => <People />,
        },
        ,
        {
            path: "/favPo",
            sidebar: () => <RootBrand> </RootBrand>,
            main: () => <FavPo />,
        },
        {
            path: "/manageProfile",
            sidebar: () => <RootBrand> </RootBrand>,
            main: () => <ManageProfile />,
        },
        {
            path: "/messageCenter/:companyId",
            sidebar: () => <RootBrand> </RootBrand>,
            main: () => <ChatBot />,
        },
        {
            path: "/createNewPo",
            sidebar: () => <RootBrand> </RootBrand>,
            main: () => <CreateNewPo />,
        },
        {
            path: "/supplierManageOffer",
            sidebar: () => <RootBrand> </RootBrand>,
            main: () => <ManageSupplierPoOffers />,
        },
        {
            path: "/orderStatus",
            sidebar: () => <RootBrand> </RootBrand>,
            main: () => <ManageOffer />,
        },
        {
            path: "/reviews",
            sidebar: () => <RootBrand />,
            main: () => <ReviewPage />,
        },
    ];


    return (
        <div className="pageContainer mx-auto">
            <Router>
                <header className="container">
                    <NavBar />
                </header>
                <hr className="horizontalHr" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            {/* {loggedIn !== null && ( */}
                            <Switch>
                                {routes.map((route, index) => (
                                    <PrivateRoute
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        children={<route.sidebar />}
                                    />
                                ))}
                            </Switch>
                            {/* )} */}
                        </div>
                        <div className="col-md-9 ">
                            {/* {loggedIn !== null && ( */}
                            <Switch>
                                {routes.map((route, index) => (
                                    <PrivateRoute
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        children={<route.main />}
                                    />
                                ))}
                            </Switch>
                            {/* )} */}
                        </div>
                    </div>
                    {/*module*/}

                    <div className="App-content">
                        {modules.map((module) => (
                            <Route {...module.routeProps} key={module.name} />
                        ))}
                    </div>
                </div>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>

                    <Route path="/search" exact>
                        <SearchPOItem />
                    </Route>

                    <Route path="/posearch/:catId">
                        <PoSearch />
                    </Route>

                    <Route path="/poDetailsView/:id">
                        <PoDetailsViewPage />
                    </Route>

                    <Route path="/signup">
                        <MultiStepsRegistrationForm />
                    </Route>

                    <Route path="/forgetPassword">
                        <ForgetPassword />
                    </Route>

                    <Route path="/reset_password">
                        <ResetPassword />
                    </Route>

                    <Route exact path="/">
                        <LandingPage />
                    </Route>

                    <Route path="/congratulations">
                        <CongratulationBox />
                    </Route>

                    <Route path="/viewAll">
                        <ViewAllPage />
                    </Route>

                    <Route path="/whoWeAre">
                        <WhoWeAre />
                    </Route>

                    <Route path="/contactUs">
                        <ContactPage />
                    </Route>

                    <Route path="/disclaimer">
                        <Disclaimer />
                    </Route>

                    <Route exact path="/singlePoDetails/:id">
                        <SinglePoDetails />
                    </Route>

                    <Route exact path="/singleDetailsActive/:id">
                        <SinglePoDetails />
                    </Route>

                    <Route exact path="/pendingPoDetails/:id">
                        <PendingPoDetailsPage />
                    </Route>

                    <Route path="/payment">
                        <SubmitOffer />
                    </Route>

                    <Route path="/pending">
                        <PendingPoDetails />
                    </Route>

                    <Route path="/completed">
                        <CompletedPoDetails />
                    </Route>

                    <Route path="/paymentConfirmed">
                        <PaymentStatusCard />
                    </Route>

                    <Route path="/checking">
                        <DeclineCard />
                        <DeclineManageOffer />
                        <ExpiredCard />
                        <CancelledOfferBox />
                        <CompletedOrdersWithRating />
                        <CompletedOrdersWithReviews />
                    </Route>

                    <Route path="/orders/ongoing/:id">
                        <OrdersDetails />
                    </Route>
                    <Route path="/orders/completed/:id">
                        <OrdersCompleted />
                    </Route>
                    <Route path="/supplier-manage-offer/active/:id">
                        <SupplierActiveOfferDetails />
                    </Route>

                    <Route path="/supplier-manage-offer/cancel/:id">
                        <SupplierCancelledOfferDetails />
                    </Route>

                    <Route path="/requester-manage-offer/pending/:id">
                        <RequesterPendingOfferDetails />
                    </Route>

                    <Route path="/requester-manage-offer/accepted/:id">
                        <RequesterAcceptedOfferDetails />
                    </Route>

                    <Route path="/requester-manage-offer/completed/:id">
                        <RequesterCompletedOfferDetails />
                    </Route>
                </Switch>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
