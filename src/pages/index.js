import Footer from "../components/Footer";
import disableScroll from 'disable-scroll';
import {useEffect} from "react";
import Redirect from "react-router-dom/es/Redirect";

const MainPage = () => {
    useEffect(() => {
        disableScroll.on();
    },[])
    return (
        <div className="container mainpage">
            <img className="d-block m-auto mt-3 mb-3" src="/img/logo.svg"/>
            <h2 className="text-center mt-5 mb-5">Мобильное приложение <br/>доступно для скачивания</h2>
            <div className="row">
                <div className="col-md-5 m-auto mainpage--link d-flex justify-content-between">
                    <div className="mainpage--link--content d-flex flex-column justify-content-around">
                        <div>
                            <h3 className="heading">Приложение в <br/>App Store</h3>
                            <p>Скачайте для iOS</p>
                            <a href="#">
                                <img src="/img/apple.svg" />
                            </a>
                        </div>


                        <div>
                            <img src="/img/qr.svg" />
                            <p>Отсканируйте, чтобы скачать</p>
                        </div>
                    </div>
                    <div className="phone">
                        <img src="/img/iPhone1.png" />
                    </div>
                </div>
                <div className="col-md-5 m-auto mainpage--link d-flex justify-content-between">
                    <div className="mainpage--link--content d-flex flex-column justify-content-around">
                        <div>
                            <h3 className="heading">Приложение в <br/>Play market</h3>
                            <p>Скачайте для Android</p>
                            <a href="#">
                                <img src="/img/googleplay.png" />
                            </a>
                        </div>
                        <div>
                            <img src="/img/qr.svg" />
                            <p>Отсканируйте, чтобы скачать</p>
                        </div>
                    </div>
                    <div className="phone">
                        <img src="/img/iphone22.svg" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )

}

export default MainPage;