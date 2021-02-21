import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle} from 'react'
import { Button, message as Message, Space } from 'antd'
import FormInfo from './formInfo'
import { FormInstance } from 'antd/lib/form'
import {savePlace, getPlace} from '@/api/placeInfo'
import {formatToDateTime} from '@/utils/dateUtil'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { matchPath } from 'react-router'
import { RootState } from '@/store/types'
import { setPanes } from '@/store/actions'
import { Spin } from 'antd'

interface DetailProps {
  modalType?:string
}

// 创建一个context，默认值是edit
export const Context = React.createContext({modalType:'edit'} as any)

const DetailPage = forwardRef<any, DetailProps>((props, ref) => {
    const {modalType} = props
    const history = useHistory()
    const location = useLocation()
    const  {state} = location

    const panes = useSelector((state:RootState) => state.layoutReducer.panes)
    const dispatch = useDispatch()

    const [isLoading, setLoading] =useState(false)

    const [size, setSize] = useState()
    const [detailType, setType]= useState(modalType)
    const [resData, setResult] = useState()
    const [fileList, setFileList] =useState([])
    const [veteransId, setVeteransId] =useState('')
    const _isCancelled = useRef(false)

    const formRef = useRef<FormInstance>(null)

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

    const getDetail=async(placeId:string)=>{
        setLoading(true)
        const {result, code}:any = await getPlace(placeId)
        if(code === 200 && !_isCancelled.current){
          // dispatch(SetPlaceInfo(result))
          console.log('ssssssss', formRef)
          setResult(result)
          setFileList(result.fileList)
          setVeteransId(result.veteransId)
          // console.log('veteransId', result.veteransId)
          const {birthDate, termValidityEnd, termValidityStart} = result.veteransBaseInfo
          formRef.current && formRef.current!.setFieldsValue({
            ...result,
            ...result.veteransBaseInfo,
            birthDate: birthDate ? moment(birthDate) : null,
            termValidityEnd: termValidityEnd ? moment(termValidityEnd) : null,
            termValidityStart: termValidityStart ? moment(termValidityStart) : null,
          })
          formRef.current && (formRef as any).current.setfileList(result.fileList)
        }
        setLoading(false)
    }

    const checkUrls = () =>{
      let url = location.pathname.split('/').slice(0, 3).join('/')
      let aUrl = matchPath(location.pathname, {path: `${url}/:id`, exact: true})
      return aUrl
    }

    const getDatas=()=>{
      const a:any = checkUrls()
      console.log('a' , a)
      if(a && a.params!.id){
        getDetail(a.params!.id)
      }
    }

    useEffect(()=>{
      return ()=>{
        _isCancelled.current = true
      }
    }, [])

    useEffect(()=>{
      if(state && (state as any).refresh){
        getDatas() 
      }
    }, [state])

    const handleClose=()=>{
      deletePane(location.pathname)
      history.push({
        pathname:'/placeInfo',
        state:{
          refresh: true
        }
      })
    }
  
    const handleSubmit= async(state:string)=>{
      try {
        const data =  formRef.current && await formRef.current!.validateFields() 
        const {actualAddress, domicile, educationDegree, fixedTelephone, health, householdAddress, householdAddressType, householdType,
          idCardNo, idPhoto, maritalStatus, name, nameUsedBefore, nation, organizationId,
          phone, politicalIdentity, remarks, sex, signingIssuingOrganization, veteransId, wechatQq, whetherHk,
          birthDate, termValidityEnd, termValidityStart, fileIds, 
          houseType, mainDemands, mainDifficulties, medicalInsurance, pensionBenefits, personnelType, ...rest
        } = data
        const params={
          placeId: detailType === 'edit'? (resData as any).placeId : null,
          version: detailType === 'edit'? (resData as any).version : null,
          veteransId:  detailType === 'edit'? veteransId : null,
          type: detailType === 'edit'? (resData as any).type : null,
          // fileIds:["96436ed2289eebd9e9b41893672c5c6f", "46c04891aa0ae8e6075628f1239d0e3f"],
          fileIds: (formRef as any).current.getfileIds(),
          houseType: houseType.toString(),
          mainDemands: mainDemands.toString(),
          mainDifficulties: mainDifficulties.toString(),
          medicalInsurance: medicalInsurance.toString(),
          pensionBenefits: pensionBenefits.toString(),
          personnelType: personnelType.toString(),
          state,
          // "agentOrNot": "string",
          // "disabledWelfare": "string",
          // "fileIds": ["string"],
          // "houseType": "string",
          // "housingFunds": "string",
          // "mainDemands": "string",
          // "mainDifficulties": "string",
          // "medicalInsurance": "string",
          // "pensionBenefits": "string",
          // "personAnnualIncome": "string",
          // "personnelType": "string",
          // "socialAssistance": "string",
          // "specificDemands": "string",
          // "state": state,
          // "statePension": "string",
          // "type": "string",
          // "version": 0,
          ...rest,
          veteransBaseInfoAddReq: {
            veteransId: detailType === 'edit'? veteransId : null,
            version: detailType === 'edit'? (resData as any).veteransBaseInfo.version : null,
            actualAddress,
            birthDate: birthDate?formatToDateTime(birthDate):null,
            domicile,
            educationDegree,
            fixedTelephone,
            health,
            householdAddress,
            householdAddressType,
            householdType,
            idCardNo,
            idPhoto,
            maritalStatus,
            name,
            nameUsedBefore,
            nation,
            organizationId,
            phone,
            politicalIdentity,
            remarks,
            sex,
            signingIssuingOrganization,  
            "termValidityEnd": termValidityEnd?formatToDateTime(termValidityEnd):null,
            "termValidityStart": termValidityStart?formatToDateTime(termValidityStart):null,
            wechatQq,
            whetherHk,
          }
        }

        const {code}:any = await savePlace(params) 
        if(code===200){
          Message.success('操作成功')
          handleClose()
        }

      } catch(err) {
        console.log(err)
      } 
    }

    useImperativeHandle(ref, () => ({
      resData:resData?resData:{},
      close:handleClose,
      forceUpdate:getDatas
    }))

    return ( 
      <Context.Provider value={{modalType: detailType, resData:resData, fileList:resData?(resData as any).fileList:[], veteransId:resData?(resData as any).veteransId:null}}>
        <div className="content form-content">
        <Spin spinning={isLoading}>
          <FormInfo ref={formRef} />
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
          </Spin>
        </div>
     </Context.Provider>
  )
})

export default DetailPage