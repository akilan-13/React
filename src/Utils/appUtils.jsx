import _ from "lodash";

export const paginationRange=(totalPages,currentPage,recordPerPage,siblings)=>{
    const totalPageInArray=5+siblings;
    if(totalPageInArray>=totalPages){
        return _.range(1,totalPages+1);
     }
     const leftSiblingIndex=Math.max(currentPage-siblings,1);
     const rightSiblingIndex=Math.min(currentPage+siblings,totalPages)
     
 
    const showLeftDots=leftSiblingIndex>=5;
    const showRightDots=rightSiblingIndex<totalPages-5;
 
    if(!showLeftDots && showRightDots){
     const leftItems=3+3*siblings;
     const leftRange=_.range(1,leftItems+1);
     return [...leftRange,"...",totalPages]
    }
    else if(showLeftDots && !showRightDots){
     const rightItems=1+2*siblings;
     const rightRange=_.range(totalPages-rightItems+1,totalPages+1);
     return [1,"...",...rightRange]
    }
    else{
     const middleRange=_.range(leftSiblingIndex,rightSiblingIndex+1)
     return [1,1+1,"...",...middleRange,"...",totalPages]
    }
}

export const phoneValidation=phone=>{
    const phnregex=/^\d{10}$/;
    return phnregex.test(phone)
}
export const emailValidation=email=>{
    const emailRegex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email)
}
export const passwordValidation=password=>{
    const passRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_+=]).{8,}$/;
    return passRegex.test(password)
}

