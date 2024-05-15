import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import question from '../../../assets/question.png'
import delivered from '../../../assets/delivered.png'
import en from '../../../../en'
import ar from '../../../../ar'
import { useSelector } from "react-redux";

type TshinpmentProps = {
  shipmentId: number;
};
const ShipmentDetails = ({ shipmentId }: TshinpmentProps) => {
  const [details, setDetails] = useState();
  const {lang} = useSelector(state=>state.language)
  const t = lang === 'ENG' ? en : ar
  const {shipmentProgress,shipmentTitle,shipmentDetails,deliveryAddress} = t
  const {subTitle,first,second,third,fourth,address,problemTitle,btnTxt} = shipmentDetails;
  const detailsArr = [first,second,third,fourth]
  const fetchData = async (id: number) => {
    try {
      const response = await axios.get(
        `https://tracking.bosta.co/shipments/track/${id}`
      );
      const data = response.data;
      setDetails(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (shipmentId) {
      fetchData(shipmentId);
    }
  }, [shipmentId]);
  console.log(details);
  return (
    <>
      <div className={styles.container} style={lang === 'AR'?{direction:'rtl'} :{direction:'ltr'}}>
        <div className={styles.progressContainer}>
          <div className={styles.header}>
            <div className={styles.sec}>
              <p className={styles.title}>{shipmentProgress.shipmentNo}{shipmentId}</p>
              <p className={styles.success}>{shipmentProgress.status}</p>
            </div>
            <div className={styles.sec}>
              <p className={styles.title}>{shipmentProgress.created}</p>
              <p>{shipmentProgress.date}</p>
            </div>
            <div className={styles.sec}>
              <p className={styles.title}>{shipmentProgress.merchantName}</p>
              <p>{shipmentProgress.merchant}</p>
            </div>
            <div className={styles.sec}>
              <p className={styles.title}>{shipmentProgress.deliveryDate}</p>
              <p>{shipmentProgress.lastDate}</p>
            </div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.statusWrapper}>
            <div className={styles.bar}>
              <img src={delivered} alt="deliverd"/>
            </div>
            <div className={styles.status}>
              <p>{shipmentProgress.created}</p>
              <p>{shipmentProgress.received}</p>
              <p>{shipmentProgress.onWay}</p>
              <p>{shipmentProgress.delivered}</p>
            </div>
          </div>
        </div>

        <div className={styles.detailsContainer}>
          <div className={styles.details}>
            <h2 className={styles.subTitle}>{shipmentTitle}</h2>
            <div className={styles.mainWrapper}>
                <div className={styles.mainHeader}>
                  <p className={styles.para}>{subTitle.branch}</p>
                  <p className={styles.para}>{subTitle.date}</p>
                  <p className={styles.para}>{subTitle.time}</p>
                  <p className={styles.detail}>{subTitle.details}</p>
                </div>
                <div className={styles.mainBody}>
                   { detailsArr.map(phase =>
                   (<div key={phase.details} className={styles.row}>
                        <p className={`${styles.para} ${styles.text}`}>{phase.branch}</p>
                        <p className={`${styles.para} ${styles.text}`}>{phase.date}</p>
                        <p className={`${styles.para} ${styles.text}`}>{phase.time}</p>
                        <p className={`${styles.detail} ${styles.text}`}>{phase.details}</p>
                    </div>))}
                    {/* <div className={styles.row}>
                        <p className={`${styles.para} ${styles.text}`}>مدينة نصر</p>
                        <p className={`${styles.para} ${styles.text}`}>05/04/2020</p>
                        <p className={`${styles.para} ${styles.text}`}>12:30 pm</p>
                        <p className={`${styles.detail} ${styles.text}`}>تم إستلام الشحنة من التاجر</p>
                    </div>
                    <div className={styles.row}>
                        <p className={`${styles.para} ${styles.text}`}>مدينة نصر</p>
                        <p className={`${styles.para} ${styles.text}`}>05/04/2020</p>
                        <p className={`${styles.para} ${styles.text}`}>12:30 pm</p>
                        <p className={`${styles.detail} ${styles.text}`}>الشحنة خرجت للتسليم</p>
                    </div>
                    <div className={styles.row}>
                        <p className={`${styles.para} ${styles.text}`}>مدينة نصر</p>
                        <p className={`${styles.para} ${styles.text}`}>05/04/2020</p>
                        <p className={`${styles.para} ${styles.text}`}>12:30 pm</p>
                        <p className={`${styles.detail} ${styles.text}`}>تم التسليم</p>
                    </div> */}

                </div>

            </div>

          </div>
          <div className={styles.address}>
            <h2 className={styles.subTitle}>{deliveryAddress}</h2>
            <div className={styles.block}>
                <p className={styles.addTitle}>{address}</p>
            </div>
            <div className={styles.askWrapper}>
                <img  src={question} alt='ask'/>
                <div className={styles.ask}>
                    <h2>{problemTitle}</h2>
                    <div className={styles.btn}>{btnTxt}</div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShipmentDetails;
