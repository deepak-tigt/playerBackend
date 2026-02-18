import birthdayBonusService from "./birthdayBonus.service.js"
import anniversaryBonusService from "./anniversaryBonus.service.js"

class DailyBonusCronService { 
    async run(){
        console.log("daily bonus job stated");

        const result = {
            birthday: null,
            anniversary: null,
        };
        
        // birthday service 
        try{
            result.birthday = await birthdayBonusService.run();
            console.log("birthday bonus completed");
        }
        catch(error){
            console.log("error in the birthday bonus service",error);
        }

        try{
            result.anniversary = await anniversaryBonusService.run();
            console.log("anniversary bonus completed");
        }
        catch(error){
            console.log("error in the anniversary bonus service",error);
        }

        return result;
    }

    
}

export default new DailyBonusCronService();