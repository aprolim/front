<!-- components/HeroSection/HeroContent.vue - VERSIÓN CORREGIDA -->
<template>
  <!-- Imagen en la derecha -->
  <div class="absolute top-4 right-6 md:right-4 z-30">
    <img 
      src="/senadores.svg"
      alt="Logo del Senado" 
      class="w-12 h-12 md:w-16 md:h-16 object-contain"
    />
  </div>
  
  <!-- Contenedor principal con la franja incluida -->
  <div class="relative z-10 mx-auto md:pt-20 md:mt-32 md:mt-53">
    <!-- Primera parte: contenido centrado -->
    <div class="container px-6 md:px-12">
      <div class="max-w-4xl mx-auto">
        <!-- Logo/Texto que se transforma -->
        <div class="mb-8 md:mb-12 transition-all duration-500" :class="{ 'transform scale-90 md:scale-95': scrolled }">
          <!-- Versión compacta (al hacer scroll) -->
          <div 
            class="transition-all duration-500 flex items-center gap-4"
            :class="scrolled ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'"
          >
            <div>
              <h2 class="text-2xl md:text-3xl font-bold text-white">Camara de senadores</h2>
              <p class="text-sm text-white/80">Estado Plurinacional de Bolivia</p>
            </div>
          </div>
        </div>

        <!-- Botones del hero -->
        <div 
          class="md:mt-12 grid grid-cols-2 md:grid-cols-5 gap-6 transition-all duration-500"
          ref="heroButtons"
          :class="{ 'opacity-0 h-0 overflow-hidden': scrolled }"
        >
          <!-- Botones aquí (igual que antes) -->
          <NuxtLink 
            to="/la-institucion" 
            class="px-8 py-4 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center group relative"
            title="Información Institucional del Senado"
          >
            <div class="backdrop-blur-sm relative">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M3 21h18M5 21V11h3V6h8v5h3v10M9 9h1m1.5 0h1m1.5 0h1M7 13h3m-3 2.5h3m-3 2.5h3m4-5h3m-3 2.5h3m-3 2.5h3M11 21v-3h2v3M12 6V2l4 1.5-4 1.5" 
                  stroke="white" 
                  stroke-width="0.8" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                />
              </svg>
              <div class="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#8B1A1A]/20 to-[#F9E076]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mb-2">
              <div class="relative">
                <div class="px-4 py-2 bg-[#E03636] backdrop-blur-sm text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 shadow-xl border border-white/10">
                  La Instituci&oacute;n
                  <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-b-[#E03636]"></div>
                </div>
              </div>
            </div>
          </NuxtLink>

          <NuxtLink 
            to="/la-institucion" 
            class="px-8 py-4 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center group relative"
            title="Información Institucional del Senado"
          >
            <div class="backdrop-blur-sm relative">
              <svg width="100" height="100" viewBox="8 13 84 84" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="31" cy="28" r="8.5"/>
                  <path d="M18 52.5 C18 43 24 40 31 40 C38 40 44 43 44 52.5" />
                  <line x1="23.5" y1="48" x2="23.5" y2="54" />
                  <circle cx="69" cy="28" r="8.5"/>
                  <path d="M56 52.5 C56 43 62 40 69 40 C76 40 82 43 82 52.5" />
                  <line x1="76.5" y1="48" x2="76.5" y2="54" />
                  <circle cx="50" cy="40" r="9"/>
                  <path d="M35 66 C35 56 42 53 50 53 C58 53 65 56 65 66" />
                  <line x1="39.5" y1="62" x2="39.5" y2="67" />
                  <line x1="60.5" y1="62" x2="60.5" y2="67" />
                  <path d="M50 53 L53.5 59 L50 65 L46.5 59 Z" fill="none" />
                  <line x1="50" y1="53" x2="50" y2="59" />
                  <path d="M21 58 C21 78 35 88 50 88 C65 88 79 78 79 58" />
                  <path d="M29 65 C29 78 38 83 50 83 C62 83 71 78 71 65" />
                </g>
              </svg>
              <div class="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#8B1A1A]/20 to-[#F9E076]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mb-2">
              <div class="relative">
                <div class="px-4 py-2 bg-[#E03636] backdrop-blur-sm text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 shadow-xl border border-white/10">
                  Legisladores y Representaci&oacute;n
                  <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-b-[#E03636]"></div>
                </div>
              </div>
            </div>
          </NuxtLink>

          <NuxtLink 
            to="/la-institucion" 
            class="px-8 py-4 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center group relative"
            title="Información Institucional del Senado"
          >
            <div class="backdrop-blur-sm relative">
              
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 390.99 404.1137"><title>MAZO</title><path d="M367.4827,328.424v41.33c0,6.7754-1.3566,10.1631-8.818,11.5182-14.2444,2.0326-22.384,12.8732-22.384,26.424,0,12.8732,8.8179,22.3587,22.384,25.7464,3.3915.6775,5.4265,4.7428,8.14,6.7754-3.3916,1.355-6.1048,4.0652-9.4963,4.0652-92.2494,0-184.4988.6775-277.4265,0-21.0274,0-35.95-16.9384-36.6284-38.62V89.9307c0-31.1667,18.3142-49.46,50.1945-49.46H352.56c10.1746,0,14.9227,5.42,14.9227,15.5833V236.9564c0,8.1305,2.7132,12.1957,9.4963,15.5834,15.601,7.4529,31.202,16.2609,46.1247,25.0689,12.21,6.7754,14.2444,14.2283,6.783,25.7465-6.1047,10.163-12.8878,21.0036-18.9925,31.1667-7.4614,11.5181-14.2444,12.1957-25.7756,5.42a160.1411,160.1411,0,0,0-17.6358-11.5182ZM324.75,224.0832V105.5141c-12.2095-3.3877-22.3841-8.808-27.81-20.3261-1.3565-2.0326-5.4264-4.0652-8.14-4.0652H178.2358c-2.7132,0-6.783.6775-8.14,2.71-5.4265,12.8733-16.2793,18.2936-28.4888,21.6812V314.8733c12.2095,3.3877,22.384,8.8081,27.81,21.6812.6783,2.0327,5.4265,2.71,8.818,2.71,35.95,0,71.9.6775,108.5287,0,4.07,0,7.4613-4.0652,10.8528-6.7754,6.7831-4.7427,12.2095-11.5181,18.9926-14.9058,7.4613-4.0652,11.5311-16.2609,4.7481-21.6812-21.7057-15.5834-44.09-30.4892-69.8653-48.7827-.6783,10.1631,0,16.9384-2.035,23.7138s-4.7481,15.5834-9.4962,18.9711-14.2444,2.71-19.6709,0c-16.2793-8.808-31.88-18.9711-47.4813-28.4566-6.783-4.0652-12.8877-9.4856-10.8528-18.2936,2.0349-9.4855,6.783-16.9384,17.6359-18.971,3.3915-.6775,6.783-4.0652,8.8179-6.7754,12.2095-19.6486,25.0973-39.2972,36.6285-58.9458,2.0349-3.3877.6783-8.13,2.0349-12.1957,2.0349-7.4529,3.3915-16.2609,8.14-21.6812,5.4265-6.7754,13.5661-4.7427,21.0275-.6775,16.2793,10.1631,32.5586,18.9711,48.16,30.4892,4.7481,3.3877,10.8528,12.1957,9.4963,16.9384-2.035,6.7754-8.818,12.8733-14.9227,18.2936-4.07,4.0652-10.1746,6.7753-17.6359,12.1956,16.9576,8.13,29.167,14.9058,43.4114,22.3587Zm29.8454,144.3156c.6783-2.0326,1.3566-2.71,1.3566-3.3877V335.1994c0-18.2935-.6783-19.6486-19.6708-27.779,3.3915,13.5507-2.7133,18.9711-15.6011,21.0036-5.4264.6776-9.4962,9.4856-14.2443,14.2283-2.7133,2.71-6.1048,7.4529-8.818,7.4529-42.7332.6776-86.1447.6776-128.8778,0-2.7132,0-7.4614-3.3877-8.14-6.0978-3.3915-10.8406-10.1745-16.2609-20.3491-16.9385-8.818-.6775-10.1746-4.7427-10.1746-12.8732V105.5141c0-8.13,2.7133-11.5182,10.8529-12.1957,9.4963-.6775,16.9576-6.0979,18.9925-15.5834,1.3566-7.4529,5.4264-8.13,12.2095-8.13H295.5824c6.783,0,10.8528.6775,12.8877,8.808,1.3566,5.42,8.14,10.163,13.5661,13.5507,4.07,2.71,9.4963,2.0326,15.6011,3.3877V217.3078c0,14.2283,4.07,18.9711,18.9925,21.0037V52.6662H112.44V368.3988Zm-21.0274,12.1957c-84.788,0-168.8978,0-253.0075.6775-6.783,0-14.9227,5.42-19.6708,10.8406-6.7831,7.4529-6.7831,17.616-2.0349,26.424,4.7481,9.4855,12.8878,14.2283,23.7406,14.2283H328.8194a8.6122,8.6122,0,0,0,4.07-.6775c-10.8529-23.0363-10.8529-29.1342.6783-51.4929ZM98.1959,366.3662v-313.7C69.7071,50.6336,56.141,63.5068,56.141,90.6083V375.1742C69.7071,372.464,83.2732,369.7538,98.1959,366.3662Zm276.07-48.1052c8.14-13.5508,16.2794-26.424,25.0973-40.6523-31.88-17.616-63.0823-33.8769-94.9626-51.4929-6.1048,10.1631-12.2095,20.3262-18.9926,30.4892,29.8455,20.3262,59.0125,40.6523,88.8579,61.656ZM238.6049,255.9275c14.9227-23.7138,29.1671-46.75,43.4115-71.1415-14.2444-8.8079-28.4888-17.6159-42.7332-27.1015-14.9227,23.7139-29.1671,47.4277-44.09,71.1415C210.1161,238.3115,224.3605,247.12,238.6049,255.9275ZM304.4,168.5251a12.7018,12.7018,0,0,0-4.07-4.7427c-16.2793-10.1631-32.5587-20.3262-49.5162-29.8117-2.0349-1.3551-8.818.6775-9.4963,2.0326-.6783,3.3877,0,8.808,2.0349,10.8406,15.601,10.1631,31.88,20.3261,48.16,29.8117C297.6173,180.7208,303.7221,176.6556,304.4,168.5251ZM243.353,276.2537c-4.07-4.7428-4.7481-6.7754-6.783-7.4529-16.9576-10.8406-33.9152-21.0037-51.5511-31.1668-2.0349-1.3551-7.4614.6775-8.14,2.0326-1.3566,3.3877-1.3566,9.4856,0,10.1631,16.9576,10.8406,33.9152,21.6812,50.8728,31.8443,3.3916,1.355,9.4963-3.3878,15.601-5.42ZM381.7271,327.069c7.4613,1.355,16.2793,4.7427,17.6359,2.71,8.818-12.1957,16.2793-25.0689,24.4189-38.62-6.1047-3.3877-10.1745-5.42-14.9226-8.13C400.0413,297.2573,392.58,310.8081,381.7271,327.069ZM278.6249,212.5651c-6.1048,9.4855-10.8529,18.2935-16.9577,27.1015,4.7482,3.3877,8.818,6.7754,14.2444,10.1631,6.1048-10.1631,11.5312-18.9711,17.6359-29.1342A161.86,161.86,0,0,1,278.6249,212.5651Z" transform="translate(-43.2532 -40.4705)" fill="#fff"/></svg>


              <div class="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#8B1A1A]/20 to-[#F9E076]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mb-2">
              <div class="relative">
                <div class="px-4 py-2 bg-[#E03636] backdrop-blur-sm text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 shadow-xl border border-white/10">
                  Gesti&oacute;n Legislativa
                  <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-b-[#E03636]"></div>
                </div>
              </div>
            </div>
          </NuxtLink>

          <NuxtLink 
            to="/la-institucion" 
            class="px-8 py-4 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center group relative"
            title="Información Institucional del Senado"
          >
            <div class="backdrop-blur-sm relative">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 418 425" width="100" height="100"><title>cultura</title><path d="M362.3443,250.26a81.163,81.163,0,0,1-31.5213,10.328,119.7279,119.7279,0,0,0,8.2229,9.6395,29.5829,29.5829,0,0,1,6.8525,16.5248c.6852,11.705-4.7968,20.6559-14.39,26.8527-10.2787,6.8854-20.5574,13.0822-30.8361,19.279-24.6688,15.8362-50.0229,31.6724-74.6918,47.5087a119.0655,119.0655,0,0,1-12.3344,7.5739,6.2328,6.2328,0,0,0-.6852-3.4427c-1.37-12.3936-5.482-23.41-13.02-33.05-16.4459-21.3445-32.8918-42.0005-49.3377-63.3449-23.2984-29.6069-45.9115-58.5253-69.21-88.1322a181.7028,181.7028,0,0,1-14.39-19.9675c-6.1672-11.0165-6.1672-22.033.6852-33.0495,7.5377-11.0165,17.8164-15.8362,30.8361-13.7707,12.3344,2.0656,20.5574,9.6395,23.9836,20.656s2.0557,22.7216-6.8525,31.6725a72.8908,72.8908,0,0,1-7.5377,6.1968c6.1673,8.2624,12.3345,15.8362,19.1869,24.0986l47.282-26.8527c27.41-15.8363,54.82-30.984,82.2295-46.82,5.482-3.4427,11.6492-5.5083,16.4459-9.64,18.5017-15.1477,26.0394-35.1152,20.5574-59.2138-7.5377-35.1152-45.2262-55.7711-78.8033-42a247.0275,247.0275,0,0,0-30.1508,15.1477c-28.78,14.4592-57.5607,29.6069-86.341,44.0661-13.02,6.8853-26.0393,13.0821-38.3738,19.9674-13.7049,7.5739-22.6131,19.9675-27.41,35.1152-1.37,4.1312-1.37,8.2624-2.741,12.3936v8.9509q1.0278,5.1641,2.0557,10.328c2.741,11.0165,8.223,19.9674,14.39,28.9183,19.1869,24.7872,39.059,49.5744,58.2459,74.3616,23.2984,29.6069,45.9115,59.2137,69.21,88.8207,8.9082,11.705,9.5935,26.1642,1.37,37.8692s-22.6131,15.8363-35.6328,11.7051a31.9,31.9,0,0,1-21.2426-29.6069c0-11.7051,5.482-20.656,15.0754-26.8528a2.3894,2.3894,0,0,1,1.37-.6885c-6.1672-8.2624-12.3344-16.5248-19.1868-24.7872a59.7418,59.7418,0,0,0-18.5017,18.59c-15.7606,24.7871-13.02,55.7711,6.8525,76.427,10.9639,11.7051,23.9836,17.9019,39.7442,19.279a2.51,2.51,0,0,1,2.0558.6885h7.5377c.6852,0,1.37-.6885,2.0557-.6885a60.7887,60.7887,0,0,0,24.6688-7.5739c7.5377-4.1312,14.39-8.9509,21.9279-13.7706,23.2984-15.1477,47.282-29.6069,70.58-44.7546,24.6689-15.8363,49.3377-30.984,74.0066-46.82,21.2426-13.7706,30.8361-33.05,28.78-58.5252,0-10.328-5.4819-20.656-13.02-29.6069ZM137.5836,107.7338c28.78-15.1477,57.5607-29.6069,86.341-44.7546,12.3344-6.1968,28.095-2.7542,35.6328,8.2624,8.2229,12.3935,6.8524,28.23-4.1115,37.8693a24.6126,24.6126,0,0,1-6.8525,4.82c-30.836,17.2133-60.9868,35.1151-91.8229,52.3284-.6852,0-.6852.6886-2.0557.6886q0-34.0824-28.78-53.7056c4.7967-2.0656,8.223-4.1311,11.6492-5.5082Z" transform="translate(-30 -27)" style="fill:#fff"/><path d="M438.4065,66.4218a130.4181,130.4181,0,0,0-52.7639,15.8363,21.7018,21.7018,0,0,0-9.5934,9.6394,98.2341,98.2341,0,0,0-7.5377,22.7216,51.7783,51.7783,0,0,1-2.741-11.0165c-.6852-3.4427,0-7.5738,0-11.0165-.6852,0-.6852,0-1.3705.6885a183.48,183.48,0,0,0-35.6327,24.7872c-.6853.6885-1.37,1.377-1.37,2.0656a85.7667,85.7667,0,0,0-6.1672,26.1642c0,3.4427-.6853,7.5738-.6853,11.705-1.37-2.7541-2.741-4.82-3.4262-6.8853a41.1573,41.1573,0,0,1-4.1115-18.59,151.1142,151.1142,0,0,0-13.7049,15.8363C288.3378,163.5049,280.8,180.03,283.5411,199.3086a62.2391,62.2391,0,0,0,5.4819,19.2789c15.0754-15.1477,30.1509-29.6069,47.9672-41.3119-28.0951,33.0495-50.7082,70.23-71.9509,110.1652,7.5377-2.0656,15.0754-4.82,21.9279-6.8853.6852,0,1.37-.6886,2.0557-1.3771L295.19,268.85c6.1673-10.328,13.02-21.3445,19.1869-31.6725.6853-.6885,1.37-1.377,2.0558-1.377,13.02,1.377,25.3541-2.7542,36.3181-8.9509,11.6491-6.8854,20.5573-15.8363,28.78-26.1643,2.0557-2.7541,4.7967-5.5082,6.8524-8.9509-10.2787.6885-23.2983-1.3771-27.41-4.82h.6852a87.3261,87.3261,0,0,0,34.2623-8.9509c1.3705-.6886,3.4263-2.0656,4.1115-3.4427,5.482-8.9509,10.2787-18.59,15.7607-27.5413,1.37-2.0656,2.0557-4.82,3.4262-6.8853a74.9408,74.9408,0,0,1-24.6688-2.0656,2.3889,2.3889,0,0,0,1.37-.6885,73.2943,73.2943,0,0,0,26.0394-8.951c2.0557-.6885,3.4262-2.7541,4.7967-4.1311,7.5377-11.7051,12.3344-24.0987,16.4459-37.1808A197.9463,197.9463,0,0,0,448,67.799v-.6885c-2.0558-.6887-5.482-.6887-9.5935-.6887Z" transform="translate(-30 -27)" style="fill:#fff"/><path d="M252.02,202.0627c-30.8361,17.9019-61.6722,36.4923-92.5082,54.3941,4.7967,6.8853,9.5934,13.0821,14.39,19.2789,30.8361-18.59,61.6721-36.4922,93.1935-54.394-5.482-6.8854-10.2787-13.0822-15.0754-19.279Z" transform="translate(-30 -27)" style="fill:#fff"/><path d="M203.3672,314.9821c9.5934-5.5083,19.1869-11.0165,28.78-17.2133l2.0557-2.0657q7.1952-14.4591,14.39-28.9183l4.1115-8.2624H252.02c-20.5573,12.3936-41.8,24.7871-63.0426,37.1807,4.7968,6.1968,9.5935,12.3937,14.39,19.279Z" transform="translate(-30 -27)" style="fill:#fff"/></svg>
              <div class="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#8B1A1A]/20 to-[#F9E076]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mb-2">
              <div class="relative">
                <div class="px-4 py-2 bg-[#E03636] backdrop-blur-sm text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 shadow-xl border border-white/10">
                  Cultura y Patrimonio Legislativo
                  <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-b-[#E03636]"></div>
                </div>
              </div>
            </div>
          </NuxtLink>

          <NuxtLink 
            to="/la-institucion" 
            class="px-8 py-4 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center group relative"
            title="Información Institucional del Senado"
          >
            <div class="backdrop-blur-sm relative">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="40 40 400 400" width="100" height="100">
              <title>manos</title>
              
              
              <path fill="#ffffff" d="M238.371,238.1017a10.4336,10.4336,0,0,0-9.7737,7.0508c-1.629,5.4238-3.8009,11.39-5.43,16.8136q-2.4433,6.5085-4.8869,13.0169c-.5429,1.0848-1.0859,2.7119-2.7149,2.1695s-1.6289-1.6271-1.6289-3.2542v-36.339h-.543V201.22a9.5316,9.5316,0,0,0-10.3168-9.7628,10.1072,10.1072,0,0,0-9.2307,10.3051v45.5594c-.543.5423-1.086,1.6271-1.629,1.6271s-1.086-1.0848-1.629-1.6271V189.8305a9.7738,9.7738,0,0,0-19.5475,0v57.4916c-.5429.5423-1.0859,1.6271-1.6289,1.6271s-1.629-1.0848-2.172-1.6271V197.4238c0-5.9661-4.3439-10.8475-9.7737-10.8475-5.9729,0-9.7738,4.8814-9.7738,10.8475v47.7288c0,1.6271.543,3.2542-1.6289,3.2542-1.629,0-2.172-1.0847-2.172-3.2542V211.5255a8.9756,8.9756,0,0,0-2.7149-7.0509,9.2908,9.2908,0,0,0-10.86-2.7118c-3.8009,1.6271-6.5159,4.8813-6.5159,9.22v87.8644c0,6.5085,1.629,11.39,5.9729,16.2712,7.6018,9.22,10.86,19.5254,10.3167,31.4577,0,1.6271.543,2.17,1.629,2.17h65.1583c1.629,0,1.629-.5424,1.629-1.6272-1.629-11.39,1.6289-21.1525,9.7737-28.7458,8.1448-8.1355,14.6607-17.3559,17.9186-28.2033,4.3439-13.5593,8.1448-27.1187,11.9457-40.1356.543-1.6271,0-3.2543,0-4.8814a10.4337,10.4337,0,0,0-9.7738-7.0509Z"/>
              
              <path fill="#ffffff" d="M380.0905,245.1525a9.3063,9.3063,0,0,0-9.2308-7.0508,10.4335,10.4335,0,0,0-9.7737,7.0508c-3.2579,9.7628-7.0589,19.5255-10.3168,29.2882,0,.5423-.543,1.0847-.543,1.6271a4.1175,4.1175,0,0,1-2.1719,1.0847c-.543,0-1.086-1.0847-1.629-1.6271v-1.0847c0-16.2712,0-33.0848-.543-49.356v-22.78a9.754,9.754,0,0,0-3.8009-8.1356,9.1143,9.1143,0,0,0-10.3167-1.0848c-3.8009,1.6272-5.43,4.8814-5.43,8.678v46.1017c-.543.5424-1.0859,1.6271-1.6289,1.6271a2.4462,2.4462,0,0,1-1.629-1.6271V190.3729c0-7.5933-8.1448-12.4746-14.6606-8.678-3.8009,2.1695-4.8869,5.4237-4.8869,9.7627,0,18.4407,0,36.339.543,54.78v1.6271c-.543.5424-1.086,1.6271-1.629,1.6271s-1.629-1.0847-2.172-1.6271,0-1.0847,0-1.6271V197.9661c0-5.9661-4.3439-10.3051-9.7738-10.3051s-9.7737,4.339-9.7737,10.3051V246.78c0,1.6271,0,2.7118-2.172,2.7118-1.6289,0-1.6289-1.0847-1.6289-2.7118V209.8983c-.543-4.339-4.3439-7.5932-8.6878-8.1356-5.9728-.5423-10.86,3.7966-10.86,10.3051V299.39c0,6.5084,1.6289,11.9321,5.9728,16.8135a41.6372,41.6372,0,0,1,9.7738,21.6949c.5429,3.7966.5429,7.0509,1.0859,10.8475h64.6155c1.086,0,2.172,0,1.629-1.6272-1.629-11.39,2.172-21.6949,10.3168-29.8305a61.7,61.7,0,0,0,17.3755-27.661c3.8009-13.0169,7.6018-26.5763,11.4027-39.5932,1.086-1.0847,1.086-3.2542.543-4.8814Z"/>
              
              <path fill="#ffffff" d="M270.4072,194.7119c1.086.5423,1.629,0,2.172-1.0848,2.7149-10.8474,13.0316-16.2712,23.8914-12.4745,1.0859.5423,1.629,0,2.1719-.5424l4.8869-4.8814c.543-.5423,1.086-1.6271,1.629-2.1695,3.2579-10.3051,5.9728-20.61,9.2307-30.9152a11.93,11.93,0,0,0,.543-4.339c-.543-4.339-4.3439-8.1356-8.6878-8.1356a9.9364,9.9364,0,0,0-10.3167,6.5085c-3.8009,10.3051-7.0588,20.61-10.86,30.3728-.543,1.0848-1.086,2.1695-2.172,1.6272-1.629,0-1.629-1.6272-1.629-2.7119v-36.339h-.5429V93.8305c0-3.7966-1.086-6.5085-4.3439-8.678s-6.5159-2.7118-9.7738-.5423-5.43,4.8813-5.43,8.6779V139.39c-.543.5424-1.086,1.6271-2.172,1.6271a2.4462,2.4462,0,0,1-1.629-1.6271V82.983c0-5.9661-4.3438-10.305-9.7737-10.305s-9.7738,4.3389-9.7738,10.305v56.9492c0,.5423-1.0859,1.6271-1.6289,2.1695a4.1184,4.1184,0,0,1-2.172-1.0848,3.2583,3.2583,0,0,1-.5429-2.1695V90.0339c0-4.339-1.629-7.5932-5.43-9.22-6.5158-3.2542-14.1176,1.6272-14.1176,9.22v49.8983c0,1.0847-.543,2.1695-1.629,2.1695a1.9878,1.9878,0,0,1-2.172-2.1695V105.22a9.7276,9.7276,0,0,0-9.7737-9.7627c-5.43,0-9.7738,4.339-9.7738,10.3051v69.4237c0,1.6271.543,2.1695,1.629,3.2542a34.824,34.824,0,0,1,5.43,7.0509,2.5085,2.5085,0,0,0,2.7149,1.6271,38.5068,38.5068,0,0,1,7.6018-.5424c7.6018,1.0848,14.6607,8.1356,14.6607,17.8983v34.7119c0,.5424.5429,1.0848.5429,1.6271.543-.5423,1.086-.5423,1.629-1.0847a17.7478,17.7478,0,0,1,22.2624-5.4238c2.172,1.0848,2.172,1.0848,2.172-1.6271V215.322c-1.086-14.644,9.7737-23.322,21.1764-20.61Z"/>
              
              <path fill="#ffffff" d="M212.8507,357.4237H135.2036c-3.8009,0-5.9728,2.17-5.9728,5.9661V379.661a5.1271,5.1271,0,0,0,5.43,5.4237h77.6471c3.8009,0,5.9728-2.1695,5.9728-5.966V362.8475c.543-3.2543-1.6289-5.4238-5.43-5.4238Z"/>
              <path fill="#ffffff" d="M345.3394,357.4237H268.2353c-3.8009,0-5.9729,2.17-5.9729,5.9661v15.1865c0,4.339,2.172,5.9661,5.9729,5.9661h77.1041c3.8008,0,5.9728-2.1695,5.9728-5.9661V362.8475C351.3122,359.5932,349.14,357.4237,345.3394,357.4237Z"/>
            </svg>
              <div class="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#8B1A1A]/20 to-[#F9E076]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mb-2">
              <div class="relative">
                <div class="px-4 py-2 bg-[#E03636] backdrop-blur-sm text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 shadow-xl border border-white/10">
                  Participaci&oacute;n y Transparencia
                  <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-b-[#E03636]"></div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- FRANJA ROJA DE ANCHO COMPLETO (dentro del mismo contenedor principal) -->
    <!-- Usamos posición absoluta para que salga del container pero esté dentro del mismo div padre -->
    <div class="absolute left-0 right-0 bottom-0 transform translate-y-[69%]    md:translate-y-[79%] lg:translate-y-[85%] xl:translate-y-[100%] 2xl:translate-y-[170%] z-20">
      <div class="relative bg-gradient-to-r from-red-700/70 via-red-800/70 to-red-900/70 py-6 md:py-8 shadow-2xl overflow-hidden group full-width-franja">
        
        <!-- Patrón de fondo sutil -->
        <div class="absolute inset-0 opacity-5">
          <div class="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-yellow-300 rounded-tl-xl"></div>
          <div class="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-yellow-300 rounded-br-xl"></div>
        </div>

        <!-- Líneas decorativas animadas -->
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse"></div>
        <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse"></div>

        <!-- Contenido principal centrado -->
        <div class="container mx-auto px-4 md:px-12 relative z-10 text-center">
          <!-- Texto principal con efecto de gradiente -->
          <p class="text-2xl md:text-3xl font-bold text-white">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-100 to-yellow-200">
              Primera Legislatura del Tricentenario.
            </span>
          </p>

          <!-- Línea decorativa central -->
          <div class="inline-block w-24 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-full my-4"></div>
        </div>

        <!-- Elementos decorativos en las esquinas -->
        <div class="absolute top-4 left-4 w-3 h-3 border-2 border-yellow-300/50 rounded-full animate-ping"></div>
        <div class="absolute top-4 right-4 w-3 h-3 border-2 border-yellow-300/50 rounded-full animate-ping" style="animation-delay: 0.5s;"></div>
        <div class="absolute bottom-4 left-4 w-3 h-3 border-2 border-yellow-300/50 rounded-full animate-ping" style="animation-delay: 1s;"></div>
        <div class="absolute bottom-4 right-4 w-3 h-3 border-2 border-yellow-300/50 rounded-full animate-ping" style="animation-delay: 1.5s;"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  scrolled: Boolean,
  heroLinks: {
    type: Array,
    default: () => [
      {
        to: '/la-institucion',
        title: 'Información Institucional del Senado',
        ariaLabel: 'Información Institucional del Senado Nacional'
      }
    ]
  }
})

const hasIconSlot = computed(() => {
  return true
})
</script>

<style scoped>
.ghost {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.ghost:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-0.25rem);
}

/* Animaciones personalizadas para la franja */
@keyframes gentleGlow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(224, 54, 54, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(224, 54, 54, 0.5);
  }
}

/* Aplicar animación a la franja */
.full-width-franja {
  animation: gentleGlow 3s ease-in-out infinite;
}

/* Estilos para que la franja ocupe ancho completo */
.absolute.left-0.right-0 {
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid.grid-cols-2 {
    gap: 1rem;
  }
  
  .px-8.py-4 {
    padding: 0.75rem;
  }
  
  svg {
    width: 80px;
    height: 80px;
  }
  
  /* Ajustar imagen en móviles */
  .absolute.top-4.right-6 {
    right: 1.5rem;
  }
  
  img.w-12 {
    width: 3rem;
    height: 3rem;
  }
  
  /* Ajustar franja en móviles */
  .absolute.left-0.right-0 {
    margin-left: -50vw;
    margin-right: -50vw;
  }
}

/* Asegurar que el contenido tenga espacio para la franja */
.relative.z-10.mx-auto {
  padding-bottom: 6rem; /* Espacio para que la franja no tape contenido */
}
</style>