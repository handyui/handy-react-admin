import { request } from '@/utils/api.request'

/***==============优抚信息================= */

// 删除优抚信息
export const deletePreferential = (id:string) => request.get('/veteransPreferential/deletePreferential', {id})

// 批量删除优抚信息
export const deletePreferentialList = (ids:string) => request.get('/veteransPreferential/deletePreferentialList', {ids})

// 根据优抚id查询优抚信息
export const getPreferential = (id:string) => request.get('/veteransPreferential/getPreferential', {id})

/* 查询优抚信息列表
{
  "current": 1,
  "name": "",
  "organizationId": "",
  "sex": "string",
  "size": 5,
  "state": "",
  "type": "sc"
}
*/
export const getPreferentialPage = (data:any) => request.post('/veteransPreferential/getPreferentialPage', data)

/* 新增/修改优抚信息
{
    "abilityLive": "string",
    "applyType": "string",
    "belongPeriod": "string",
    "conscriptsConvertDate": "string",
    "conscriptsEndDate": "2020-12-25T09:50:38.421Z",
    "conscriptsStartDate": "2020-12-25T09:50:38.421Z",
    "disabilityBelong": "string",
    "disabilityLevel": "string",
    "disabilityNature": "string",
    "employmentSituation": "string",
    "fiveGuarantees": "string",
    "identificationBasis": "string",
    "ionelyOldPeople": "string",
    "joinArmyDate": "2020-12-25T09:50:38.421Z",
    "joinParty": "2020-12-25T09:50:38.421Z",
    "laborCapacity": "string",
    "medicalInsurance": "string",
    "mentalDisease": "string",
    "militaryCode": "string",
    "otherPreferentialIdentity": "string",
    "otherSafeguards": "string",
    "outArmyDate": "2020-12-25T09:50:38.421Z",
    "pensionSecurityType": "string",
    "preferentialId": "string",
    "preferentialTreatmentType": "string",
    "remarks": "string",
    "retireIdNumber": "string",
    "state": "string",
    "subsistenceAllowances": "string",
    "type": "string",
    "version": 0,
    "veteransBankInfo": {
      "bankAccount": "string",
      "bankAccountNo": "string",
      "bankAddress": "string",
      "bankName": "string",
      "id": "string",
      "preferentialId": "string",
      "remarks": "string"
    },
    "veteransBaseInfoAddReq": {
      "actualAddress": "string",
      "birthDate": "2020-12-25T09:50:38.421Z",
      "domicile": "string",
      "educationDegree": "string",
      "fixedTelephone": "string",
      "health": "string",
      "householdAddress": "string",
      "householdAddressType": "string",
      "householdType": "string",
      "idCardNo": "string",
      "idPhoto": "string",
      "maritalStatus": "string",
      "name": "string",
      "nameUsedBefore": "string",
      "nation": "string",
      "organizationId": "string",
      "phone": "string",
      "politicalIdentity": "string",
      "remarks": "string",
      "sex": "string",
      "signingIssuingOrganization": "string",
      "termValidityEnd": "2020-12-25T09:50:38.421Z",
      "termValidityStart": "2020-12-25T09:50:38.421Z",
      "version": 0,
      "veteransId": "string",
      "wechatQq": "string",
      "whetherHk": "string"
    },
    "veteransFamilyInfo": {
      "agedSize": 0,
      "familySize": 0,
      "id": "string",
      "preferentialId": "string",
      "remarks": "string",
      "underAgeSize": 0
    },
    "veteransHouseInfo": {
      "houseArea": 0,
      "houseStatus": "string",
      "houseType": "string",
      "id": "string",
      "preferentialId": "string",
      "remarks": "string",
      "roomsNumber": 0
    },
    "veteransId": "string",
    "veteransMartyrFamily": {
      "familyId": "string",
      "holderName": "string",
      "martyrCertificateNo": "string",
      "martyrName": "string",
      "preferentialId": "string",
      "relation": "string",
      "remarks": "string",
      "sacrificeDate": "2020-12-25T09:50:38.421Z"
    },
    "veteransTypeInfo": {
      "applyType": "string",
      "disabilityPeriod": "string",
      "disabilitySituation": "string",
      "id": "string",
      "ionelyOldPeople": "string",
      "isOrphan": "string",
      "joinParty": "string",
      "levelAdjustment": "string",
      "nuclearRelatedSituation": "string",
      "preferentialId": "string",
      "remarks": "string",
      "situationRemark": "string"
    },
    "workUnit": "string"
  }*/
export const savePreferential = (data:any) => request.post('/veteransPreferential/savePreferential', data)

// 审批操作相关接口
export const saveAudit = (data:any) => request.post('/auditRecords/saveAudit', data)

// 根据军人id查询军人信息
export const getSoldierInfo = (id:any) => request.get('/veteransBaseInfo/getPreferential', {id})

// 查询军人信息列表
export const getVeteransPage = (data:any) => request.post('/veteransBaseInfo/getVeteransPage', data)
