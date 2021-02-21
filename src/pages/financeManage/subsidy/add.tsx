import React, { FC, useState} from 'react'
import { Input, Button, Space, Form } from 'antd'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/types'
import { setPanes } from '@/store/actions'
import '@/assets/style/subsidy.scss'
import { saveProgramme } from '@/api/subsidy'

const AddPage:FC = (props) =>{
  const history = useHistory()
  const panes = useSelector((state:RootState) => state.layoutReducer.panes)
  const dispatch = useDispatch()
  const location = useLocation()
  const [form] = Form.useForm();

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

    const [dataList, setDataList] = useState([
      {id:'1', disabilityLevel:'一级', disabilityNature:'因战', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'', total:'ccc1'},
      {id:'2', disabilityLevel:'一级', disabilityNature:'因公', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'', total:'ccc1'},
      {id:'3', disabilityLevel:'一级', disabilityNature:'因病', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'', total:'ccc1'},
      {id:'4', disabilityLevel:'二级', disabilityNature:'因战', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'', total:'ccc1'},
      {id:'5', disabilityLevel:'二级', disabilityNature:'因公', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'', total:'ccc1'},
      {id:'6', disabilityLevel:'二级', disabilityNature:'因病', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'', total:'ccc1'},
      {id:'7', disabilityLevel:'三级', disabilityNature:'因战', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'', total:'ccc1'},
      {id:'8', disabilityLevel:'三级', disabilityNature:'因公', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'', total:'ccc1'},
      {id:'9', disabilityLevel:'三级', disabilityNature:'因病', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'', total:'ccc1'},
      {id:'10', disabilityLevel:'四级', disabilityNature:'因战', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'', total:'ccc1'},
      {id:'11', disabilityLevel:'四级', disabilityNature:'因公', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'',  total:'ccc1'},
      {id:'12', disabilityLevel:'四级', disabilityNature:'因病', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'', total:'ccc1'},
      {id:'13', disabilityLevel:'五级', disabilityNature:'因战', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'',  total:'ccc1'},
      {id:'14', disabilityLevel:'五级', disabilityNature:'因公', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'', total:'ccc1'},
      {id:'15', disabilityLevel:'五级', disabilityNature:'因病', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'', total:'ccc1'},
      {id:'16', disabilityLevel:'六级', disabilityNature:'因战', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'', total:'ccc1'},
      {id:'17', disabilityLevel:'六级', disabilityNature:'因公', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'',  total:'ccc1'},
      {id:'18', disabilityLevel:'六级', disabilityNature:'因病', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'', total:'ccc1'},
      {id:'19', disabilityLevel:'七级', disabilityNature:'因战', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'', total:'ccc1'},
      {id:'20', disabilityLevel:'七级', disabilityNature:'因公', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'',  total:'ccc1'},
      {id:'21', disabilityLevel:'七级', disabilityNature:'因病', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'', total:'ccc1'},
      {id:'22', disabilityLevel:'八级', disabilityNature:'因战', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'', total:'ccc1'},
      {id:'23', disabilityLevel:'八级', disabilityNature:'因公', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'', total:'ccc1'},
      {id:'24', disabilityLevel:'八级', disabilityNature:'因病', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'', total:'ccc1'},
      {id:'25', disabilityLevel:'九级', disabilityNature:'因战', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'', total:'ccc1'},
      {id:'26', disabilityLevel:'九级', disabilityNature:'因公', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'', total:'ccc1'},
      {id:'27', disabilityLevel:'九级', disabilityNature:'因病', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'', total:'ccc1'},
      {id:'28', disabilityLevel:'十级', disabilityNature:'因战', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'', total:'ccc1'},
      {id:'29', disabilityLevel:'十级', disabilityNature:'因公', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'',  total:'ccc1'},
      {id:'30', disabilityLevel:'十级', disabilityNature:'因病', regularPension:'aaa1', nursingSubsidy:'bbb1', liquidGasSubsidy:'ccc1', outpatientSubsidy:'',festivalSubsidy:'', additionalFestivalSubsidy:'', priceSubsidy:'', deathBenefit:'', pensionInsuranceSubsidy:'', medicalInsuranceSubsidy:'', total:'ccc1'},
    ])

    const datas:any={
      '1aaa1': "22",
      '1bbb1': "ee",
      '1ccc1': "www",
      '2aaa2': '',
      '2bbb2': '',
      '2ccc2': '',
      '3aaa3': '',
      '3bbb3': '',
      '3ccc3': '',
      '4aaa4': '',
      '4bbb4': '',
      '4ccc4': '',
      '5aaa5': '',
      '5bbb5': '',
      '5ccc5': '',
      '6aaa6': '',
      '6bbb6': '',
      '6ccc6': '',
      '7aaa7': '',
      '7bbb7': '',
      '7ccc7': '',
      '8aaa8': '',
      '8bbb8': '',
      '8ccc8': '',
    }

    const handleSubmit= async(state:string)=>{

    }

    const handleClose=()=>{
      deletePane(location.pathname)
      history.push({
        pathname:'/financeManage',
        state:{
          refresh: true
        }
      })
    }

    const getSmallObj=(id:string)=>{
      let nObj:any={}
      for(let i in datas){
        let n = i.replace(id, '')
        if(i.indexOf(id)>-1){
          nObj[n] = datas[i]? datas[i]:null
        }
      }
      return nObj
    }

    const onFinish = (values: any) => {
      let arr:any=[]
      dataList.forEach(item=>{
        arr.push(getSmallObj(item.id)) 
      })
      console.log('arr', arr)
    }

    return (
      <>
      <div  className="content form-content">
        <ul className="title">
          <li>
            <span className="form-item sort">残疾等级</span><span className="form-item  sort">残疾性质</span><span className="form-item">定期抚恤</span>
            <span className="form-item">护理费</span><span className="form-item">液化气</span><span className="form-item">门诊补</span><span className="form-item">春节、八一节慰问金</span><span className="form-item">一至四级残疾军人、70岁以上五至六级</span>
            <span className="form-item">物价补贴</span><span className="form-item">死亡抚恤</span><span className="form-item">养老保险资助</span>
            <span className="form-item">基本医疗保险资助</span><span className="form-item">合计</span>
          </li>
        </ul>
        <Form  form={form} name="control-hooks" onFinish={onFinish}>
        <ul className="cont">
          {
            dataList.map((item:any)=>
              <li key={item.id}>
                <div className="form-item  sort">
                  {item.disabilityLevel}
                </div>
                <div className="form-item  sort">
                  {item.disabilityNature}
                </div>
                <Form.Item name={item.id+item.regularPension} className="form-item">
                  <Input />
                </Form.Item>
                <Form.Item name={item.id+item.nursingSubsidy} className="form-item">
                  <Input />
                </Form.Item>
                <Form.Item name={item.id+item.liquidGasSubsidy} className="form-item">
                  <Input />
                </Form.Item>
                <Form.Item name={item.id+item.outpatientSubsidy} className="form-item">
                  <Input />
                </Form.Item>
                <Form.Item name={item.id+item.festivalSubsidy} className="form-item">
                  <Input />
                </Form.Item>
                <Form.Item name={item.id+item.additionalFestivalSubsidy} className="form-item">
                  <Input />
                </Form.Item>
                <Form.Item name={item.id+item.priceSubsidy} className="form-item">
                  <Input />
                </Form.Item>
                <Form.Item name={item.id+item.deathBenefit} className="form-item">
                  <Input />
                </Form.Item>
                <Form.Item name={item.id+item.pensionInsuranceSubsidy} className="form-item">
                  <Input />
                </Form.Item>
                 <Form.Item name={item.id+item.medicalInsuranceSubsidy} className="form-item">
                  <Input />
                </Form.Item>
                <div className="form-item right">{item.total}</div>
                {/* <span><Input type="text" value={item.a}/></span>
                <span><Input type="text" value={item.b}/></span>
                <span><Input type="text" value={item.c}/></span> */}
              </li>
            )
          }
          {/* <li><span><input type="text"/></span></li>
          <li><span><input type="text"/></span></li>
          <li><span><input type="text"/></span></li>
          <li><span><input type="text"/></span></li> */}
        </ul>
        <div className="form-footer center">
          <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          {/* <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
          <Button type="link" htmlType="button" onClick={onFill}>
            Fill form
          </Button> */}
            {/* <Button type="primary" onClick={()=>handleSubmit('0')}>
              保存
            </Button>
            <Button type="primary" onClick={()=>handleSubmit('1')}>
              提交
            </Button>
            <Button onClick={handleClose}>
              关闭
            </Button> */}
          </Space>
        </div>
        </Form>
      </div>
    </>
  )
}

export default AddPage