import { adminUrls } from '../../config/urlConfig'
import { HTTP } from '../core/http.service'

export class BenepayUserService {
  
    static uploadSettlementFile = async (req) => {
        // const result = await HTTP.post("https://ki6f28zlli.execute-api.eu-west-2.amazonaws.com/dev/v2/uploadSettlement", {name: "name"} )
        const result = await HTTP.post(adminUrls.uploadSettlementFile, req )
        if (result.status == 200) {
          return result;
        }
        return undefined;
    }

    static getFromProvidedResult = async (req) => {
        const result = await HTTP.post(adminUrls.getFromProvidedResult, req )  
        if (result.status == 200) {
          return result;
        }
        return undefined;
    }

    static getGeneratedByBenepayResult = async (req) => {
      const result = await HTTP.post(adminUrls.getGeneratedByBenepayResult, req )  
      if (result.status == 200) {
        return result;
      }
      return undefined;
    }

    static downloadFromSettlementFile = async (fileId) => {
      const url = `${adminUrls.downloadFromSettlementFile}/${fileId}`
      const result = await HTTP.get(url)
      if (result.status == 200) {
        return result;
      }
      return undefined;
    }

    static downloadGeneratedByBenepayFile = async (fileId) => {
      const url = `${adminUrls.downloadGeneratedByBenepayFile}/${fileId}`
      const result = await HTTP.get(url)
      if (result.status == 200) {
        return result;
      }
      return undefined;
    }

    static getAllMerchants = async() => {
      const url = `${adminUrls.getAllMerchants}`
      const result = await HTTP.get(url)
      if (result.status == 200) {
        return result;
      }
      return undefined;
    }

    static getMerchants = async () => {
        const result = await HTTP.get(adminUrls.getMerchants);
        console.log("results",result)
        if (result.data) {
            return result;
        }
        return undefined;

    }

    static getAllProviders = async (fileId) => {
      const url = `${adminUrls.getAllProviders}`
      const result = await HTTP.get(url)
      if (result.status == 200) {
        return result;
      }
      return undefined;
    }

    static getAllBroadcasts = async () => {
      const result = await HTTP.get(adminUrls.getAllBroadcasts);
      console.log("all broadcasts", result.data)
      if(result.data){
        return result;
      } 
      return undefined;
    }

    static createBroadcast = async (req) => {
      const result = await HTTP.post(adminUrls.createBroadcast, req);
      if(result.data){
        return result;
      } 
      return undefined;
    }

    static updateBroadcast = async (messageId, req) => {
      const result = await HTTP.post(adminUrls.updateBroadcast + `${messageId}`, req);
      if(result.data){
        return result;
      } 
      return undefined;
    }

    static deleteBroadcast = async (messageId) => {
      const result = await HTTP.post(adminUrls.deleteBroadcast + `${messageId}`);
      if(result.data){
        return result;
      } 
      return undefined;
    }
    
}