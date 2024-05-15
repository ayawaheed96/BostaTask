import { useState } from 'react'
import bostaLogo from '../../../assets/bostaAr.svg'
import bostaLogoEn from '../../../assets/bostaEn.svg'
import styles from './styles.module.css'
import searchIcon from '../../../assets/search.svg'
import { useDispatch, useSelector } from 'react-redux'
import changeLang from '../../../store/actions/changeLang'
import changeShipmentID from '../../../store/actions/changeShipmentID'
import menu from '../../../assets/menu.svg'
import en from '../../../../en'
import ar from '../../../../ar'

const Header = () => {
  const [shipmentId,setShipmentId] = useState('')
  const [showFollow,setShowFollow] = useState(false)
  const [showLang,setShowlang] = useState(false)
  const [showHeader,setShowHeader] = useState(false)
  const {lang} = useSelector(state=>state.language)
  const dispatch = useDispatch()
  const t = lang === 'ENG' ? en : ar
  const searchHandler = () => {
    if(shipmentId){
      const id = Number(shipmentId)
      dispatch(changeShipmentID(id))
      setShipmentId('')
      setShowFollow(false)
    }
  }
  const {header} = t
  const changeLanguage = (language:string) =>{
      dispatch(changeLang(language))
      setShowlang(false)
  }

  return (
    <div className={styles.container} style={lang === 'AR'?{direction:'rtl'} :{direction:'ltr'}}>
        <div>
          { lang === 'AR' ?
           <img src={bostaLogo} alt='logo' />
           :
           <img src={bostaLogoEn} alt='logo' />
          }
        </div>
        <div className={styles.mid}>
            <h6>{header.home}</h6>
            <h6>{header.pricing}</h6>
            <h6>{header.call}</h6>
        </div>
        <div className={styles.last}>
            <h6 onClick={()=>{setShowFollow(prev =>!prev)}} className={`${styles.relative} ${showFollow && styles.redText}`}
            >{header.follow}</h6>
            <h6>{header.login}</h6>
            <h6 onClick={()=>setShowlang(prev=>!prev)}>
              <span className={styles.lang}>{header.lang}</span>
              </h6>
        </div>
        <div className={styles.menu} onClick={()=>setShowHeader(prev =>!prev)}>
          <img src={menu} alt='menu'/>
        </div>
        {
          showFollow && 
          <div className={`${styles.followContainer}  ${lang === 'AR'?styles.followPosLeft:styles.followPosRight}`}>
            <p>{header.follow}</p>
            <div className={styles.searchBox}>
            <input 
                placeholder={header.followPlaceHolder} 
                value={shipmentId} 
                onChange={(e)=>setShipmentId(e.target.value)} 
                className={styles.input}
              />
              <div className={styles.searchIcon} onClick={searchHandler}>
                <img src={searchIcon} alt='search'/>
              </div>
            </div>
          </div>
        }

        {
          showLang && 
          <div className={`${styles.langContainer} ${lang === 'AR'?styles.langPosLeft:styles.langPosRight}`}>
            <p onClick={()=>changeLanguage('ENG')}>ENG</p>
            <p onClick={()=>changeLanguage('AR')}>عربي</p>
          </div>
        }
        {
          showHeader && 
          <div className={`${styles.headerContainer} ${lang === 'AR'?styles.headerPosLeft:styles.headerPosRight}`}>
            <div className={styles.headerWrapper}>
              <h6>{header.home}</h6>
              <h6>{header.pricing}</h6>
              <h6>{header.call}</h6>
              <h6>{header.follow}</h6>
              <h6>{header.login}</h6>
              <h6><span className={styles.lang}>{header.lang}</span></h6>
            </div>
          </div>
        }
    </div>
  )
}

export default Header