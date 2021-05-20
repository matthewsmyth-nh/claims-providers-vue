<template>
    
        <div class="flex flex-col items-center my-12">
          <div class="flex text-gray-700">
              <div @click="changeDisplayNumbersBackword" class="h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left w-6 h-6">
                      <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
              </div>
              <div class="flex h-12 font-medium rounded-full bg-gray-200 bg-primary-30">
                  <div @click="changePage(firstDisplayNumber)" class="w-12 focus:bg-primary-50 hover:bg-primary-50 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">{{firstDisplayNumber}}</div>
                  <div @click="changePage(firstDisplayNumber+1)" v-if="validPage(firstDisplayNumber+1)" class="w-12 hover:bg-primary-50 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full ">{{firstDisplayNumber+1}}</div>
                  <div @click="changePage(firstDisplayNumber+2)" v-if="validPage(firstDisplayNumber+2)" class="w-12 hover:bg-primary-50 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">{{firstDisplayNumber+2}}</div>
                  <div class="w-12 bg-primary-80 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">{{currentPageNumber}}</div>
                  <div @click="changePage(firstDisplayNumber+3)" v-if="validPage(firstDisplayNumber+3)" class="w-12 hover:bg-primary-50 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">{{firstDisplayNumber+3}}</div>
                  <div @click="changePage(firstDisplayNumber+4)" v-if="validPage(firstDisplayNumber+4)" class="w-12 hover:bg-primary-50 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">{{firstDisplayNumber+4}}</div>
                  <div @click="changePage(firstDisplayNumber+5)" v-if="validPage(firstDisplayNumber+5)" class="w-12 hover:bg-primary-50 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">{{firstDisplayNumber+5}}</div>
                  <div class="w-12 hover:bg-primary-50 h-12 md:hidden flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full bg-teal-600 text-white">{{firstDisplayNumber}}</div>
              </div>
              <div @click="changeDisplayNumbersForward" class="h-12 w-12 ml-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right w-6 h-6">
                      <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
              </div>
          </div>
      </div>

</template>

<script>

export default{
    data : function(){
        return{
            currentPageNumber : 1,
            firstDisplayNumber : 1
        }
    },
    props : ['lastNumber'],
    methods : {
        changePage(pageNumber){
            this.currentPageNumber = pageNumber;
            this.$parent.changePageTo(pageNumber);
        },
        changeDisplayNumbersForward(){
            if(this.firstDisplayNumber <= this.lastNumber-6){
                this.firstDisplayNumber += 6;
            }
        },
        changeDisplayNumbersBackword(){
            if(this.firstDisplayNumber > 1){
                this.firstDisplayNumber -= 6;
            }
        },
        validPage(pageNumber){
            if(pageNumber >this.lastNumber){
                 return false;
            }
           return true;
        }
    }
}
</script>