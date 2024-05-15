import styles from './styles.module.css'
import Header from "../../components/common/Header/Header"
import ShipmentDetails from '../../components/common/ShipmentDetails/ShipmentDetails'
import { useSelector } from 'react-redux'
const MainLayout = () => {
    const {shipmentId} = useSelector(state=>state.shipmentId)
  return (
        <div className={styles.wrapper}>
            <header>
                <Header/>
            </header>
            <body>
                <ShipmentDetails shipmentId={shipmentId} />
            </body>
        </div>
  )
}

export default MainLayout