/* eslint-disable no-unreachable */
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle} from 'react'
import {  Tabs, Button, message as Message, Space } from 'antd'
import { BIPreferential, BIJoinBattle, BIThreeGenera, 
  BIInCountryside, BISeniorStaff, BIIllness, BISenior,
  BIUraniumMining, BIMartyr, BIMartyrFamily} from './baseInfo'
import { TypeInfor, Lifenfor, MedicalInfor, FilesInfor, OtherInfor} from '.'
import { FormInstance } from 'antd/lib/form'
import {savePreferential, getPreferential, getSoldierInfo} from '@/api/preferential'
import {formatToDateTime} from '@/utils/dateUtil'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/types'
import { setPanes } from '@/store/actions'
import { matchPath } from 'react-router'
import moment from 'moment'
import { AvatarUpload } from '@/components/upload'
import { Spin } from 'antd'
import SoldierModal from './soldierModal'
import '@/assets/style/soldierManage.scss'

const { TabPane } = Tabs

interface DetailProps {
  modalType?:string // 新增 编辑 详情 审核
  preType?:string // 优抚类型
}

// 创建一个context，默认值是edit
export const Context = React.createContext({modalType:'edit'} as any)

const DetailPage = forwardRef<any, DetailProps>((props, ref) => {
  const {modalType, preType} = props
    const history = useHistory()
    // const dispatch = useDispatch()
    const location = useLocation()
    const {pathname, state} = location
    const _isCancelled = useRef(false)

    const panes = useSelector((state:RootState) => state.layoutReducer.panes)
    const dispatch = useDispatch()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [detailType, setType]= useState(modalType)
    const [resData, setResult] = useState({} as any)
    const [fileList, setFileList] =useState([])
    const [isLoading, setLoading] =useState(false)

    const formRef1 = useRef<FormInstance>(null)
    const formRef2 = useRef<FormInstance>(null)
    const formRef3 = useRef<FormInstance>(null)
    const formRef4 = useRef<FormInstance>(null)
    const formRef5 = useRef<FormInstance>(null)
    const formRef6 = useRef<FormInstance>(null)

    const uploadRef = useRef<any>(null)
    const soldieRef = useRef<any>(null)

    
    const [index, setIndex] = useState('0')

    const deletePane=(url:string)=>{
      const index = panes.findIndex((item:any)=> {
          return item.menuPath === url
      })
      if(index > 0){
          const arr = panes
          arr.splice(index, 1)
          dispatch(setPanes([...arr]))
      }
    }

    const getDetail=async(preferentialId:string)=>{
        setLoading(true)
        const {result, code}:any = await getPreferential(preferentialId)
        if(code === 200 && !_isCancelled.current){
            // dispatch(SetData(result))
            setResult(result)
          const {joinArmyDate, outArmyDate, conscriptsStartDate, conscriptsEndDate,
            fileList, veteransBaseInfo, veteransMartyrFamily,
            retireIdNumber, militaryCode, abilityState, identificationBasis, applyType,
          belongPeriod,
          joinParty,
          conscriptsConvertDate,
          mentalDisease, fiveGuarantees, otherPreferentialIdentity, ionelyOldPeople,
          cancelTime } = result
          const {birthDate} = veteransBaseInfo

           let threeGeneraObj = {}
          //  if(preType === '300027002'){
            threeGeneraObj={
                ...veteransMartyrFamily,
                sacrificeDate: veteransMartyrFamily.sacrificeDate ? moment(veteransMartyrFamily.sacrificeDate) : null,
                approvalMartyrsTime: veteransMartyrFamily.approvalMartyrsTime ? moment(veteransMartyrFamily.approvalMartyrsTime) : null,
                revolutionaryTime: veteransMartyrFamily.revolutionaryTime ? moment(veteransMartyrFamily.revolutionaryTime) : null
              }
          //  }

          let joinBattleObj = {
            retireIdNumber,
            militaryCode,
            abilityState,
            identificationBasis
          }

          formRef1.current && formRef1.current!.setFieldsValue({
            ...result.veteransBaseInfo,
            applyType,
            birthDate:  birthDate ? moment(birthDate) : null,
            joinArmyDate: joinArmyDate? moment(joinArmyDate) : null,
            outArmyDate: outArmyDate? moment(outArmyDate) : null,
            conscriptsStartDate: conscriptsStartDate ? moment(conscriptsStartDate) : null,
            conscriptsEndDate: conscriptsEndDate ? moment(conscriptsEndDate) : null,
            abilityLive: result.abilityLive,
            disabilityBelong: result.disabilityBelong,
            disabilityLevel: result.disabilityLevel,
            disabilityNature: result.disabilityNature,
            laborCapacity: result.laborCapacity,
            employmentSituation: result.employmentSituation,
            workUnit: result.workUnit,
            preferentialTreatmentType: result.preferentialTreatmentType,
            subsistenceAllowances: result.subsistenceAllowances,
            ...threeGeneraObj,  // 三属
            ...joinBattleObj, // 参战涉核
            belongPeriod,
            joinParty: joinParty ? moment(joinParty) : null,
            mentalDisease,
            fiveGuarantees, otherPreferentialIdentity, ionelyOldPeople,conscriptsConvertDate,
            cancelTime: cancelTime ? moment(cancelTime) : null,
          })
          // console.log('result.veteransTypeInfo', result.veteransTypeInfo)
          formRef2.current && formRef2.current!.setFieldsValue({...result.veteransTypeInfo})
          formRef3.current && formRef3.current!.setFieldsValue({
            bankAccount:result.veteransBankInfo.bankAccount,
            bankAccountNo:result.veteransBankInfo.bankAccountNo,
            bankName:result.veteransBankInfo.bankName,
            bankAddress:result.veteransBankInfo.bankAddress
          })

          formRef4.current && formRef4.current!.setFieldsValue({
            medicalInsurance:result.medicalInsurance,
            otherSafeguards:result.otherSafeguards,
            pensionSecurityType:result.pensionSecurityType
          })


          formRef6.current && formRef6.current!.setFieldsValue({
            houseType:result.veteransHouseInfo.houseType,
            houseStatus:result.veteransHouseInfo.houseStatus,
            houseArea:result.veteransHouseInfo.houseArea,
            roomsNumber:result.veteransHouseInfo.roomsNumber,
            familySize:result.veteransFamilyInfo.familySize,
            underAgeSize:result.veteransFamilyInfo.underAgeSize,
            agedSize:result.veteransFamilyInfo.agedSize,
          })

          // const res:any = await getAttachFileByOwner({"ownerId": result.veteransId})
          // if(res.code == '200' && !_isCancelled.current){
          setFileList(fileList)
          // }

        }
        
        setLoading(false)
    }

    const checkUrls = () =>{
      let url = location.pathname.split('/').slice(0,4).join('/')
      let aUrl = matchPath(location.pathname, {path: `${url}/:id`, exact: true})
      return aUrl
    }

    const getDatas=()=>{
      const a:any = checkUrls()
      if(a && a.params!.id){
        setIndex('0')
        getDetail(a.params!.id)
      }
    }

    useEffect(()=>{
      return ()=>{
        _isCancelled.current = true
      }
    }, [])

    // useEffect(()=>{
    //   if(state && (state as any).refresh){
    //     getDatas() 
    //     console.log('sssssss', pathname)
    //   }
    // }, [state])

    const handleClose=()=>{
      deletePane(location.pathname)
      let url = location.pathname.split('/').slice(0,3).join('/')
      history.push({
        pathname: url,
        state:{
          refresh: true
        }
      })
    }

    const hasTypeInfo=()=>{
      const white = ['300027001', '300027008', '300027002']
      return white.indexOf(preType as string) > -1 ? true : false
    }

    const isMartyr = () =>{
      console.log('aaa', preType === '300027009', preType)
      return preType === '300027009'
    }
  
    const handleSubmit= async(state:string)=>{
      try {
        const data1 =  formRef1.current && await formRef1.current!.validateFields() 
        const data2 =  hasTypeInfo() && formRef2.current && await formRef2.current!.validateFields() 
        const data3 =  formRef3.current && await formRef3.current!.validateFields() 
        const data4 =  formRef4.current && await formRef4.current!.validateFields() 
        // const data5 =  formRef5.current && await formRef5.current!.validateFields() 
        const data6 =  formRef6.current && await formRef6.current!.validateFields() 

      const veteransBankInfo={
        ...data3
      }
      const veteransBaseInfo={
        ...data1,
        birthDate: data1.birthDate ? formatToDateTime(data1.birthDate) : null,
        updateTime: formatToDateTime(new Date()),
        idPhoto: (uploadRef as any).current.getfileIds()
      }
      const veteransFamilyInfo={
        ...data6
      }
      const veteransHouseInfo={
        ...data6
      }
      
      const veteransTypeInfo={
        ...data2
      }


      const {joinArmyDate, outArmyDate, abilityLive, conscriptsEndDate, conscriptsStartDate, disabilityBelong, disabilityLevel, disabilityNature,
        employmentSituation, laborCapacity, remarks, subsistenceAllowances, workUnit, preferentialTreatmentType,
        abilityState, retireIdNumber, militaryCode, identificationBasis,
        holderName, martyrCertificateNo, martyrName, relation, sacrificeDate, applyType, approvalMartyrsTime, 
        sacrificeNativePlace, revolutionaryTime, livingUnit, previousPosition, sacrificePlace, burialPlaceType, burialPlace, martyrsDeeds, martyrLogo,
        belongPeriod,
        joinParty,
        mentalDisease,
        conscriptsConvertDate, fiveGuarantees, otherPreferentialIdentity,
        cancelTime
       } = data1
      const {medicalInsurance, otherSafeguards, pensionSecurityType} = data4

      const veteransMartyrFamily={ // 三属烈士信息
        preferentialId: detailType === 'edit'? (resData as any).preferentialId : null,
        familyId: detailType === 'edit'? (resData as any).veteransMartyrFamily.familyId : null,
        holderName, martyrCertificateNo, martyrName, relation, remarks,
        sacrificeNativePlace, livingUnit, previousPosition, sacrificePlace, martyrLogo,
        burialPlaceType, burialPlace, martyrsDeeds, 
        revolutionaryTime: revolutionaryTime?formatToDateTime(revolutionaryTime):null,
        sacrificeDate: sacrificeDate?formatToDateTime(sacrificeDate):null,
        approvalMartyrsTime: approvalMartyrsTime?formatToDateTime(approvalMartyrsTime):null,
      }

      const params = {
        "preferentialId": detailType === 'edit'? (resData as any).preferentialId : null,
        "veteransId":  detailType === 'edit'? (resData as any).veteransId : null,
        "version":detailType === 'edit'?  (resData as any).version : null,
        fileIds:(formRef5 as any).current.getfileIds(),
        abilityLive,
        applyType,
        conscriptsConvertDate,
        joinArmyDate: joinArmyDate?formatToDateTime(joinArmyDate):null,
        outArmyDate: outArmyDate?formatToDateTime(outArmyDate):null,
        "conscriptsEndDate": conscriptsEndDate?formatToDateTime(conscriptsEndDate):null,
        "conscriptsStartDate": conscriptsStartDate?formatToDateTime(conscriptsStartDate):null,
        "disabilityBelong": disabilityBelong,
        "disabilityLevel": disabilityLevel,
        "disabilityNature": disabilityNature,
        "employmentSituation": employmentSituation,
        fiveGuarantees,
        ionelyOldPeople: hasTypeInfo() ? data2.ionelyOldPeople: data1.ionelyOldPeople,
        "laborCapacity": laborCapacity,
        "medicalInsurance": medicalInsurance && medicalInsurance.toString(),
        otherPreferentialIdentity,
        "otherSafeguards": otherSafeguards && otherSafeguards.toString(),
        "pensionSecurityType":  pensionSecurityType && pensionSecurityType.toString(),
        "preferentialTreatmentType": preferentialTreatmentType ,
        remarks,
        "state": state,
        "subsistenceAllowances": subsistenceAllowances,
        "type": preType,
        "veteransBankInfo": detailType === 'edit'? Object.assign((resData as any).veteransBankInfo, veteransBankInfo) : veteransBankInfo,
        "veteransBaseInfoAddReq": detailType === 'edit' ? Object.assign((resData as any).veteransBaseInfo, veteransBaseInfo) : veteransBaseInfo,
        "veteransFamilyInfo":  detailType === 'edit' ? Object.assign((resData as any).veteransFamilyInfo, veteransFamilyInfo) : veteransFamilyInfo,
        "veteransHouseInfo":  detailType === 'edit' ? Object.assign((resData as any).veteransHouseInfo, veteransHouseInfo) : veteransHouseInfo,
        "veteransMartyrFamily": detailType === 'edit' ? Object.assign({}, (resData as any).veteransMartyrFamily, veteransMartyrFamily) : veteransMartyrFamily,
        "veteransTypeInfo": detailType === 'edit'? Object.assign({}, (resData as any).veteransTypeInfo, veteransTypeInfo) : veteransTypeInfo,
        "workUnit": workUnit,
        abilityState,
        retireIdNumber, // 参战--退役军人证件号
        militaryCode,  // 参战--部队代码
        identificationBasis,
        belongPeriod, // 在乡复原
        joinParty: joinParty?formatToDateTime(joinParty):null, // 入党时间
        mentalDisease, // 带病回乡 是否精神病
        cancelTime: cancelTime?formatToDateTime(cancelTime):null,
      }

      const {code}:any = await savePreferential(params) 
      if( code===200 ){
        Message.success('操作成功')
        handleClose()
      }

      } catch(err) {
        console.log(err)
        // console.log(Message.error(err.errorFields[0].errors[0]))
      }  
    }

    useImperativeHandle(ref, () => ({
      resData:resData?resData:{},
      close:handleClose,
      forceUpdate:getDatas
    }))
  
    const onTabClick=(key: string, event: MouseEvent|any)=>{
      setIndex(key)
    }

    const handleChoose=()=>{
      (soldieRef as any).current.showModal(resData.veteransId?resData.veteransId:'')
    }

    const getSoldierInfoData= async(veteransId:string)=>{
      setLoading(true)
        const {result, code}:any = await getSoldierInfo(veteransId)
        if(code === 200 && !_isCancelled.current){
          const {veteransBankInfo, veteransFamilyInfo, veteransHouseInfo, fileList, idPhoto, ...rest} = result
          const {birthDate, veteransId, version} = rest
          formRef1.current && formRef1.current!.setFieldsValue({
            ...rest,
            birthDate:  birthDate ? moment(birthDate) : null
          })
          formRef3.current && formRef3.current!.setFieldsValue({
            bankAccount: veteransBankInfo ? veteransBankInfo.bankAccount:null,
            bankAccountNo: veteransBankInfo ?veteransBankInfo.bankAccountNo:null,
            bankName: veteransBankInfo ?veteransBankInfo.bankName:null,
            bankAddress: veteransBankInfo ?veteransBankInfo.bankAddress:null
          })
          formRef6.current && formRef6.current!.setFieldsValue({
            houseType:veteransHouseInfo ?veteransHouseInfo.houseType:null,
            houseStatus:veteransHouseInfo ?veteransHouseInfo.houseStatus:null,
            houseArea:veteransHouseInfo ?veteransHouseInfo.houseArea:null,
            roomsNumber:veteransHouseInfo ?veteransHouseInfo.roomsNumber:null,
            familySize:veteransFamilyInfo ?veteransFamilyInfo.familySize:null,
            underAgeSize:veteransFamilyInfo ?veteransFamilyInfo.underAgeSize:null,
            agedSize:veteransFamilyInfo ?veteransFamilyInfo.agedSize:null,
          })

          setFileList(fileList)
              
          setResult({
            ...resData, 
            fileList,
            veteransId, 
            veteransHouseInfo: {...resData.veteransHouseInfo, veteransId},
            veteransFamilyInfo: {...resData.veteransFamilyInfo, veteransId},
            veteransBaseInfo: {...resData.veteransBaseInfo, veteransId, version, idPhoto},
            veteransBankInfo: {...resData.veteransBankInfo, veteransId},
          });
          // (uploadRef as any).current.setfileList(resData.veteransBaseInfo.idPhoto)
        }
        setLoading(false)
        
    }

    const renderBaseInfo=(preType:string)=>{
      switch(preType){
        case "300027001": return <BIPreferential ref={formRef1} />; break;     // 伤残                     
        case "300027008": return <BIJoinBattle ref={formRef1} />; break;   // 参战涉核
        case "300027002": return <BIThreeGenera ref={formRef1} />; break;   // 三属
        case "300027003": return <BIInCountryside ref={formRef1} />; break;   // 在乡复原军人
        case "300027007": return <BISeniorStaff ref={formRef1} />; break;   // 五老人员
        case "300027004": return <BIIllness ref={formRef1} />; break;   // 带病回乡
        case "300027005": return <BISenior ref={formRef1} />; break;   // 60岁以上
        case "300027006": return <BIUraniumMining ref={formRef1} />; break;   // 铀矿开采
        case "300027009": return <BIMartyr ref={formRef1} />; break;   // 烈士
        case "300027010": return <BIMartyrFamily ref={formRef1} />; break;   // 烈士子女
        default: return null;
      }
    }

    return (
      <Context.Provider value={{modalType: detailType, resData: resData, fileList:fileList}} >
        <div className="preferential-detail">
        <Spin spinning={isLoading}>
          <div className="rightInfor">
            <AvatarUpload ref={uploadRef} ownerId={resData.veteransId?resData.veteransId:''} fileId={resData.veteransBaseInfo?resData.veteransBaseInfo.idPhoto:''} className="avatar"/> 
            <SoldierModal ref={soldieRef} callback={getSoldierInfoData}/>
           {(detailType==='add'|| detailType === 'edit')?<Button onClick={handleChoose}>选择已有军人</Button>:''} 
          </div>
          <div className="leftInfor">
            <Tabs defaultActiveKey='0' activeKey={index} type="card" onTabClick={onTabClick}>
              <TabPane tab='基本信息' key={0}>
                {renderBaseInfo(preType as string)}
              </TabPane>
              {
                hasTypeInfo() ? <TabPane tab='类别信息' key={1} forceRender={true}>
                <TypeInfor ref={formRef2} />
              </TabPane> :''
              }{
                !isMartyr() ? <>
                <TabPane tab='开户银行信息' key={2} forceRender={true}>
                  <Lifenfor ref={formRef3} />
                </TabPane>
                <TabPane tab='医疗养老' key={3} forceRender={true}>
                  <MedicalInfor ref={formRef4} />
                </TabPane>
                <TabPane tab='户口簿退伍等档案' key={4} forceRender={true}>
                  <FilesInfor ref={formRef5} />
                </TabPane>
                <TabPane tab='其它信息' key={5} forceRender={true}>
                  <OtherInfor ref={formRef6} />
                </TabPane>
                </> : ''
              }
            </Tabs>
            {detailType!=='detail'?
              <div className="form-footer center">
                <Space>
                  <Button type="primary" onClick={()=>handleSubmit('0')}>
                    保存
                  </Button>
                  <Button type="primary" onClick={()=>handleSubmit('1')}>
                    提交
                  </Button>
                  <Button onClick={handleClose}>
                    关闭
                  </Button>
                </Space>
              </div>:''
            }
        </div>
        </Spin>
      </div>
    </Context.Provider>
  )
})

export default DetailPage