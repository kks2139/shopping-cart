const UT = {
    request : async (api: string)=>{
        try {
            const result = await fetch(api);
            if(result.status !== 200){
                throw new Error('문제가 발생하였습니다.');
            }
            return result.json();
        }catch(ex){
            console.error(ex);
        }
    }
}

export default UT;