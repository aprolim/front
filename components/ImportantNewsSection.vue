<template>
  <div class="tabs-container">
    <!-- Encabezado de pestañas -->
    <div class="tabs-header">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        :class="['tab-button', { 'active': activeTab === tab.id }]"
        @click="activeTab = tab.id"
        :style="activeTab === tab.id ? activeTabStyle : {}"
      >
        <!-- <span class="tab-icon" v-html="tab.icon"></span> -->
        <span class="tab-label">{{ tab.label }}</span>
      </button>
    </div>

    <!-- Contenido de pestañas -->
    <div class="tabs-content">
      <!-- Pestaña Legislación -->
      <div v-if="activeTab === 'legislacion'" class="tab-pane fade-in">
        <div class="section-header">
          <h2 class="section-title">Área de Legislación</h2>
          <p class="section-description">Acceda a toda la información relacionada con los proyectos de ley y legislación</p>
        </div>
        <div class="links-grid">
          <NuxtLink 
            v-for="link in legislacionLinks" 
            :key="link.id"
            :to="link.path" 
            class="link-card"
          >
            <div class="link-icon" v-html="link.icon"></div>
            <div class="link-content">
              <h3 class="link-title">{{ link.label }}</h3>
              <p class="link-description">{{ link.description }}</p>
            </div>
            <div class="link-arrow">›</div>
          </NuxtLink>
        </div>
      </div>

      <!-- Pestaña Fiscalización -->
      <div v-if="activeTab === 'fiscalizacion'" class="tab-pane fade-in">
        <div class="section-header">
          <h2 class="section-title">Área de Fiscalización</h2>
          <p class="section-description">Sistema de control y seguimiento de actividades institucionales</p>
        </div>
        <div class="links-grid">
          <NuxtLink 
            v-for="link in fiscalizacionLinks" 
            :key="link.id"
            :to="link.path" 
            class="link-card"
          >
            <div class="link-icon" v-html="link.icon"></div>
            <div class="link-content">
              <h3 class="link-title">{{ link.label }}</h3>
              <p class="link-description">{{ link.description }}</p>
            </div>
            <div class="link-arrow">›</div>
          </NuxtLink>
        </div>
      </div>

      <!-- Pestaña Gestión -->
      <div v-if="activeTab === 'gestion'" class="tab-pane fade-in">
        <div class="section-header">
          <h2 class="section-title">Área de Gestión</h2>
          <p class="section-description">Documentación y resoluciones de gestión institucional</p>
        </div>
        <div class="links-grid">
          <NuxtLink 
            v-for="link in gestionLinks" 
            :key="link.id"
            :to="link.path" 
            class="link-card"
          >
            <div class="link-icon" v-html="link.icon"></div>
            <div class="link-content">
              <h3 class="link-title">{{ link.label }}</h3>
              <p class="link-description">{{ link.description }}</p>
            </div>
            <div class="link-arrow">›</div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const activeTab = ref('legislacion');

const tabs = [
  { id: 'legislacion', label: 'Legislación', icon: '📋' },
  { id: 'fiscalizacion', label: 'Fiscalización', icon: '🔍' },
  { id: 'gestion', label: 'Gestión', icon: '⚙️' }
];

// Estilo para pestaña activa con los colores especificados
const activeTabStyle = computed(() => ({
  background: '#706F6F',
  color: 'white'
}));

// Función para generar rutas (ajustar según tu estructura)
const generatePath = (area, link) => {
  const areaSlug = area.toLowerCase().replace(/\s+/g, '-');
  const linkSlug = link.toLowerCase().replace(/\s+/g, '-');
  return `/${areaSlug}/${linkSlug}`;
};

// Enlaces para Legislación
const legislacionLinks = [
  {
    id: 'leyes-tratamiento',
    label: 'Proyectos de Ley en Tratamiento',
    description: 'Proyectos actualmente en procf:\web2.aieso legislativo',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 31.2879 31.2879"><title>Recurso 1</title><g id="e1d8294c-62c4-4fcd-aaa0-6e3342ac2c84" data-name="Capa 2"><g id="e6bf4da3-0cda-4c51-985a-c9690b2f7bfe" data-name="Capa 1"><path d="M22.2963,10.466a.4572.4572,0,0,0-.1474-.3148q-2.3246-1.8765-4.6647-3.7339a.4979.4979,0,0,0-.2859-.1044Q14.0141,6.3042,10.83,6.31a.8063.8063,0,0,0-.7935.5627,1.4058,1.4058,0,0,0-.0485.4214q-.0035,7.2065-.0018,14.413c0,.0682-.0005.1366.0025.2048a.8205.8205,0,0,0,.8551.839c.49.0057.9807.0026,1.4711.0006.2238-.0009.3712-.1277.3659-.3067-.0052-.1748-.1448-.2864-.3639-.2868-.4407-.0008-.8814,0-1.3221,0-.3635,0-.412-.0479-.412-.4032q0-2.6341.0005-5.2683,0-4.6,0-9.199c0-.3242.0574-.3823.3759-.3823q2.9049-.0006,5.81,0c.0545,0,.1088.0046.1876.0081V7.14q0,1.5735,0,3.147c0,.3356.083.42.4139.42q2.0484,0,4.0968,0h.2274c.0039.078.009.1325.009.187q.0008,5.4559,0,10.9121c0,.29-.0586.3488-.3474.35-.4469.0018-.8938-.0015-1.3406.0052a.2936.2936,0,1,0-.0081.5872c.5088.0053,1.0185.0157,1.5263-.0072a.7938.7938,0,0,0,.7668-.8235Q22.3035,16.192,22.2963,10.466Zm-4.7331-.3678V7.2413l3.5731,2.8569Z" style="fill:#e03735"/><path d="M18.9733,17.668a.4665.4665,0,0,0-.1419-.2493q-.8479-.6963-1.7119-1.3727a.4937.4937,0,0,0-.2893-.09c-.7075.0066-1.4149.0195-2.1218.0449a.5805.5805,0,0,0-.3322.1278q-.7991.6827-1.576,1.3911a.6465.6465,0,0,0-.1831.3426c-.11.6226-.193,1.25-.3013,1.8728a.8811.8811,0,0,0,.1358.6817c.3227.4924.6214,1.0006.9193,1.5085a.6854.6854,0,0,1,.0877.33q.0085,2.0854.0023,4.171a.3117.3117,0,0,0,.19.3288.3025.3025,0,0,0,.3513-.097q.291-.2882.5831-.5752l1.38-1.3608a1.8962,1.8962,0,0,0,.1461.1888q.8718.8658,1.7474,1.7276c.17.1678.3323.1986.4508.0582a.5292.5292,0,0,0,.1076-.317c.0066-1.4834.003-2.9669.0068-4.45a.58.58,0,0,1,.0663-.2616c.2778-.5191.5695-1.0309.841-1.5532a.6156.6156,0,0,0,.0547-.3681C19.2591,19.0514,19.1185,18.3591,18.9733,17.668Zm-1.1592,8.0408-.07.0583c-.4623-.4833-.9217-.9695-1.3878-1.449-.3865-.3974-.4319-.4019-.8163-.014-.475.4793-.9361.9725-1.4032,1.46l-.0627-.0462V22.4069a10.8929,10.8929,0,0,1,1.1075.3809,1.5469,1.5469,0,0,0,1.4473-.0276c.3721-.1889.778-.3111,1.1853-.4693Zm.9277-5.7552q-.4271.7936-.8681,1.5795a.4007.4007,0,0,1-.1874.16q-.8262.3339-1.66.6495a.3992.3992,0,0,1-.2462.0065c-.559-.1817-1.1164-.3688-1.67-.566a.49.49,0,0,1-.2317-.1878c-.3011-.4765-.5863-.9631-.8867-1.44a.5229.5229,0,0,1-.0737-.3862c.088-.5568.168-1.1149.2609-1.6709a.43.43,0,0,1,.1249-.2335c.4371-.3936.8789-.7826,1.3278-1.1626a.5275.5275,0,0,1,.2951-.1129c.29-.0149.5824-.0053.8738-.0053v-.03c.248,0,.4973.0158.7435-.0051a.606.606,0,0,1,.4667.1627q.6159.5084,1.2442,1.0018a.4627.4627,0,0,1,.1829.3027c.1073.5778.233,1.1523.3442,1.7295A.3437.3437,0,0,1,18.7418,19.9536Z" style="fill:#e03735"/><path d="M12.3532,14.8707q1.8708.0008,3.7415.0005.4746,0,.9493,0,1.4147,0,2.8293,0c.21,0,.3388-.1054.35-.2782.0127-.1971-.1322-.3165-.3889-.3165q-3.7414-.0007-7.4829,0c-.2369,0-.3717.1055-.3766.2909C11.97,14.7632,12.1017,14.8706,12.3532,14.8707Z" style="fill:#e03735"/><path d="M12.243,12.7137a1.48,1.48,0,0,0,.1673.0026q1.8426,0,3.6851,0,.8653,0,1.7308,0c.6948,0,1.39.0017,2.0844-.0017a.2856.2856,0,0,0,.3116-.2954.2968.2968,0,0,0-.2955-.2973c-.0307-.0027-.0619-.0009-.0929-.0009q-3.7224,0-7.4445.0008a.6988.6988,0,0,0-.1846.0122.2941.2941,0,0,0,.0383.5793Z" style="fill:#e03735"/><path d="M15.84,17.2183a2.1744,2.1744,0,1,0,2.1684,2.1832A2.1779,2.1779,0,0,0,15.84,17.2183ZM15.8321,20.97a1.5777,1.5777,0,1,1,1.58-1.5534A1.5867,1.5867,0,0,1,15.8321,20.97Z" style="fill:#e03735"/><circle cx="15.644" cy="15.644" r="14.144" style="fill:none;stroke:#e03735;stroke-miterlimit:10;stroke-width:3px"/></g></g></svg>',
    path: generatePath('Legislación', 'Proyectos de Ley en Tratamiento')
  },
  {
    id: 'leyes-aprobados',
    label: 'Proyectos de Ley Aprobados',
    description: 'Proyectos que han sido aprobados por la cámara',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 31.2879 31.2879"><title>Recurso 2</title><g id="a611b04c-5610-4aad-81ac-465098786325" data-name="Capa 2"><g id="be095a94-c544-4627-9cd0-537542899b2f" data-name="Capa 1"><path d="M21.4542,6.8845l-11.7171.01a.7061.7061,0,0,0-.6361.6866l0,16.1247a.72.72,0,0,0,.7686.6971l11.5849,0a.7378.7378,0,0,0,.733-.6969V7.5814A.7379.7379,0,0,0,21.4542,6.8845ZM21.149,23.3652h-11.01V7.9224h11.01Z" style="fill:#e03735"/><path d="M13.6939,17.3387a2.7354,2.7354,0,0,0,1.1184,4.5084,2.7915,2.7915,0,0,0,3.3691-3.5862A2.7347,2.7347,0,0,0,13.6939,17.3387Zm3.6236.9616c-.5217.7913-1.1813,1.5373-1.7093,2.33a.4548.4548,0,0,1-.631.0055L13.7913,18.87a.2532.2532,0,0,1,.3256-.2522l1.0993.9414.0726.0029,1.7866-1.7543a.313.313,0,0,1,.3468-.01C17.589,17.9558,17.4087,18.162,17.3175,18.3Z" style="fill:#e03735"/><rect x="12.2123" y="9.3166" width="6.8635" height="0.8222" style="fill:#e03735"/><polygon points="18.682 12.051 18.682 11.301 18.629 11.247 12.212 11.247 12.212 12.105 18.629 12.105 18.682 12.051" style="fill:#e03735"/><rect x="12.2123" y="13.213" width="6.0413" height="0.8222" style="fill:#e03735"/><polygon points="17.825 15.143 12.212 15.179 12.212 16.001 17.825 16.001 17.825 15.143" style="fill:#e03735"/><circle cx="15.644" cy="15.644" r="14.144" style="fill:none;stroke:#e03735;stroke-miterlimit:10;stroke-width:3px"/></g></g></svg>',
    path: generatePath('Legislación', 'Proyectos de Ley Aprobados')
  },
  {
    id: 'leyes-sancionados',
    label: 'Proyectos de Ley Sancionados',
    description: 'Proyectos que han recibido sanción oficial',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 31.2879 31.2879"><title>Recurso 3</title><g id="bc2b39d4-712f-4cd4-a756-6645d236fc69" data-name="Capa 2"><g id="a86d0594-03d2-4b15-b19a-6fbd509bb0d8" data-name="Capa 1"><path d="M21.0369,18.2324a5.1158,5.1158,0,0,1-2.7749,1.2568,7.554,7.554,0,0,0,.2811,1.6053,6.2147,6.2147,0,0,0,.6433,1.4937H10.5479c0-.1967.0054-.3846-.001-.5721-.0252-.74-.1294-1.4717-.2261-2.2043-.0935-.71-.1953-1.4185-.2821-2.1291q-.1926-1.5771-.2412-3.1658c-.0037-.1241,0-.2485,0-.3816h1.18V11.2446H9.479V8.5581H20.8369v9.3257l.2038-.1751a4.9078,4.9078,0,0,0,1.6041,1.07V12.573q0-2.0728,0-4.1459c0-.3678-.019-.7364-.0007-1.1032a.4489.4489,0,0,0-.4524-.4709c-1.5494.009-3.0989.0044-4.6484.0044l-6.6129,0A.4132.4132,0,0,0,10.486,7.3c-.0015.2513,0,.5026,0,.7538v.1022h-.1021q-.4282,0-.8565,0a.409.409,0,0,0-.4487.4444q0,1.1222.0014,2.2443v.4018H7.5751v2.8872c.0214.0018.0378.0045.0542.0045.3538,0,.7079.0016,1.062-.0016.0619-.0005.0776.0164.0749.0775-.018.3932-.0232.7874-.05,1.18-.04.5977-.0817,1.196-.1463,1.7915-.0811.7455-.1894,1.4881-.28,2.2327-.0936.77-.19,1.54-.2657,2.3121a4.95,4.95,0,0,0,.0573,1.4583,1.368,1.368,0,0,0,.3994.7873,1.1769,1.1769,0,0,0,.91.2688,1.0481,1.0481,0,0,0,.8336-.4382,1.638,1.638,0,0,0,.2667-.7237c.0113-.0754.0346-.0977.1106-.0974q1.0824.0045,2.165.0019,2.2523-.0031,4.504-.0076c.3134,0,.6266.006.94.007.3827.0013.7652.0024,1.1479-.0019a.183.183,0,0,1,.1643.0789,3.93,3.93,0,0,0,1.4532,1.1549.139.139,0,0,0,.1013.0093,3.8581,3.8581,0,0,0,1.106-.7585,3.4123,3.4123,0,0,0,.5919-.724c.164-.2823.3335-.5638.4685-.86a6.8126,6.8126,0,0,0,.5266-1.9587c.0188-.1433.0286-.2878.0431-.4378A5.115,5.115,0,0,1,21.0369,18.2324Zm2.3259,2.0251q-1.0833,1.0838-2.1674,2.1668a.1986.1986,0,0,1-.32-.0007q-.627-.626-1.253-1.2531a.1985.1985,0,1,1,.2726-.2817q.518.5173,1.0353,1.0352c.0321.0323.0622.0666.105.1125.236-.2384.4619-.4678.6894-.6958q.68-.6813,1.3617-1.3612a.1975.1975,0,1,1,.2764.278Z" style="fill:#e03735"/><path d="M12.3649,10.7322c-.2937.0055-.5878.0047-.8817.0006-.08-.0012-.109.0177-.1081.1033.0042.4221.0018.8444.0018,1.2666h.0074c0,.4988.0008.9976,0,1.4964-.0008.3193-.0028.6386-.0082.9578-.0013.0753.0234.0984.0985.0974.2853-.0037.5707-.0015.8559-.0013.1323,0,.1322,0,.132-.1282-.0014-.6758-.004-1.3517-.004-2.0276q0-.83.0055-1.6609C12.464,10.7624,12.4494,10.7306,12.3649,10.7322Z" style="fill:#e03735"/><path d="M7.088,10.7328c-.3.003-.5992.0037-.8988,0-.0746-.001-.0969.0185-.0966.0952.0032.6221.0018,1.2443.0018,1.8664h0q0,.9331,0,1.8664c0,.0513-.0049.0946.0715.0938.3139-.0031.6277-.0019.9416,0,.0519,0,.07-.02.0695-.0709-.0013-.5049,0-1.01-.0012-1.5148,0-.2876-.0051-.5753-.0048-.863q0-.6933.0064-1.3867C7.1782,10.748,7.1535,10.7322,7.088,10.7328Z" style="fill:#e03735"/><path d="M11.0117,15.7261a.2028.2028,0,0,0,.2059.2063c.02.0018.04.0018.06.0018q1.58,0,3.1589,0,2.2989,0,4.598-.0006a.5912.5912,0,0,0,.11-.0086.1847.1847,0,0,0,.1514-.1454.1713.1713,0,0,0-.0664-.1978.3433.3433,0,0,0-.1752-.0486q-1.9478-.0041-3.8959-.002H13.472q-1.1175,0-2.2347.0005A.2031.2031,0,0,0,11.0117,15.7261Z" style="fill:#e03735"/><path d="M19.2843,18.0985a.198.198,0,0,0-.2026-.2793q-.924-.0009-1.8478.0006-2.4051,0-4.81,0c-.2079,0-.4158.0059-.6237.006-.1937,0-.3878-.01-.5814-.0028a.28.28,0,0,0-.1619.0741.169.169,0,0,0-.0245.2068.202.202,0,0,0,.2033.1135q.9063-.0015,1.813,0H17.834c.4166,0,.8332-.0009,1.25,0A.201.201,0,0,0,19.2843,18.0985Z" style="fill:#e03735"/><path d="M15.0126,20.1012q-1.8713,0-3.7426,0c-.0285,0-.0627-.0083-.0844.0042a.3826.3826,0,0,0-.15.1111.1922.1922,0,0,0,.1915.2829c.42.0008.8393-.0012,1.2588-.0012q2.5437,0,5.0873.0015h.42l-.0656-.3948c-.0272-.0012-.05-.0032-.0721-.0032Q16.4344,20.1016,15.0126,20.1012Z" style="fill:#e03735"/><path d="M13.804,11.3637h4.8805c.14,0,.2795.0027.4192-.0011a.1989.1989,0,0,0,.1988-.1954.1959.1959,0,0,0-.1811-.2022A.84.84,0,0,0,19.01,10.96q-1.1558.001-2.3115.0025-1.6824,0-3.3648-.0025h-.4729v.4033h.9429Z" style="fill:#e03735"/><path d="M19.278,13.352a.1991.1991,0,0,0-.1916-.1043q-1.0105.0016-2.021.0005l-4,0h-.2028v.3965h.4927l5.619.0018a.4341.4341,0,0,0,.1361-.0033.393.393,0,0,0,.1551-.0909A.1654.1654,0,0,0,19.278,13.352Z" style="fill:#e03735"/><circle cx="15.644" cy="15.644" r="14.144" style="fill:none;stroke:#e03735;stroke-miterlimit:10;stroke-width:3px"/></g></g></svg>',
    path: generatePath('Legislación', 'Proyectos de Ley Sancionados')
  },
  {
    id: 'leyes-modificaciones',
    label: 'Proyectos de Ley con Modificaciones',
    description: 'Proyectos que han sido modificados durante el proceso',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 28.2879 28.2879"><title>Recurso 4</title><g id="a0b18691-39f9-44cf-a7c9-8db7d6a13904" data-name="Capa 2"><g id="f6d66acb-d5f5-4263-9318-9e649c5340ac" data-name="Capa 1"><circle cx="14.144" cy="14.144" r="14.144" style="fill:#e03735"/><path d="M22.2785,7.3379q-1.4942-1.4715-2.9856-2.9461a2.0289,2.0289,0,0,0-1.4823-.6149q-4.7658.0011-9.5318.0017A1.9045,1.9045,0,0,0,6.2974,5.7521q-.006,7.6057.0065,15.2113a2.1305,2.1305,0,0,0,.1949.8764,1.8492,1.8492,0,0,0,1.81,1.0891c2.3865.0019,4.773-.0012,7.1595.0058a.75.75,0,0,1,.3867.12c1.085.713,2.1629,1.4369,3.245,2.1545.1459.0967.3038.1757.4559.263h.2966c.0915-.0617.22-.1034.2667-.1893a1.3081,1.3081,0,0,0,.1906-.5389c.0234-.5972.0088-1.196.0088-1.8143.2094,0,.3981.0023.5871,0A1.9485,1.9485,0,0,0,22.902,20.913q.0027-6.0273.0018-12.0547A2.0421,2.0421,0,0,0,22.2785,7.3379ZM19.0532,6.009l1.5176,1.57H19.0532Zm2.5786,3.0932V20.8785a.69.69,0,0,1-.7806.78c-.3671.0011-.7341-.0019-1.1012.0008a.6418.6418,0,0,0-.7018.6953c-.0031.4159-.0006.8319-.0006,1.2874-.0877-.0556-.1508-.0938-.2119-.1347-.8161-.5437-1.6342-1.0844-2.4463-1.634a1.212,1.212,0,0,0-.7116-.2181q-3.6636.0088-7.3273.0034c-.5535,0-.7838-.23-.7838-.7837q0-7.5192,0-15.0381c0-.5569.2285-.788.7795-.788q4.5956,0,9.1907,0h.24c0,.3919,0,.7578,0,1.1237,0,.6637-.0023,1.3273.0007,1.991a.64.64,0,0,0,.6985.698c.9671.0027,1.9342.0009,2.9013.0009h.2546Z" style="fill:#fff"/><path d="M19.1727,13.7331c.2539-.1648.5256-.3021.7822-.4632a.6034.6034,0,0,0,.2364-.8441q-.6292-1.1265-1.29-2.2352a.6067.6067,0,0,0-.8493-.2182,2.4966,2.4966,0,0,0-.4382.2547.6691.6691,0,0,1-.9648.0171c-.0858-.0731-.151-.1184-.147-.2435.01-.3032.0059-.607.0025-.9105a.6392.6392,0,0,0-.6878-.6876c-.4022-.0037-.8046-.0008-1.2068-.0006-.4236,0-.8471-.0054-1.2705.002a.63.63,0,0,0-.6453.643,4.7955,4.7955,0,0,0,.002.6137c.0337.3348-.0116.6105-.39.7141a.251.251,0,0,0-.0889.0562.1973.1973,0,0,1-.2647.0071c-.2645-.1618-.5323-.319-.806-.4645a.5959.5959,0,0,0-.8363.2Q9.6368,11.2981,9,12.4448a.5954.5954,0,0,0,.2254.813,1.9858,1.9858,0,0,0,.4209.242.69.69,0,0,1,.5082.88.35.35,0,0,1-.1188.2109c-.2551.1634-.5256.3024-.7831.4622a.6009.6009,0,0,0-.249.84q.6327,1.1364,1.3,2.2536a.6015.6015,0,0,0,.8336.2139,2.5018,2.5018,0,0,0,.4384-.2542.69.69,0,0,1,.9841-.0176.2838.2838,0,0,1,.136.25c-.0061.3176-.0081.6354,0,.9529a.6225.6225,0,0,0,.633.6324q1.27.011,2.5408,0a.6257.6257,0,0,0,.6346-.6316,2.6127,2.6127,0,0,0-.0029-.5285.6778.6778,0,0,1,.4907-.8679.3521.3521,0,0,1,.2407-.0025c.275.1429.5368.3108.81.4576a.6031.6031,0,0,0,.8525-.2037q.667-1.1166,1.3-2.2533a.6018.6018,0,0,0-.23-.8293,2.1788,2.1788,0,0,0-.4211-.2418.6752.6752,0,0,1-.4991-.8637A.3868.3868,0,0,1,19.1727,13.7331Zm-1.454.99a.6944.6944,0,0,0,.3694.7212c.22.1252.438.2546.6793.3953-.21.365-.4155.7221-.6323,1.0988-.229-.1313-.45-.2518-.6644-.3826a.7271.7271,0,0,0-.8813.0529,5.4609,5.4609,0,0,1-.8732.507.7288.7288,0,0,0-.4828.74c.0065.2593.0013.519.0013.7894H13.9638c0-.2472,0-.4979,0-.7488a.7251.7251,0,0,0-.522-.7977,5.4648,5.4648,0,0,1-.8012-.464.7146.7146,0,0,0-.95-.0554c-.2014.1153-.4022.231-.6249.359-.2121-.3664-.4188-.7229-.6359-1.0979.244-.1422.462-.2713.682-.3967a.6974.6974,0,0,0,.368-.7221,8.5536,8.5536,0,0,1,0-1.115.6972.6972,0,0,0-.37-.7212c-.22-.1251-.4377-.2545-.6793-.3952.21-.365.4157-.7221.6325-1.0989.2288.1314.45.2519.6645.3828a.7268.7268,0,0,0,.881-.053,5.4721,5.4721,0,0,1,.8734-.5071.7286.7286,0,0,0,.4826-.74c-.0065-.2593-.0011-.5189-.0011-.7893h1.2709c0,.2472,0,.498,0,.7488a.7254.7254,0,0,0,.5222.7977,5.457,5.457,0,0,1,.801.4639.7145.7145,0,0,0,.95.0554c.2014-.1152.4022-.231.6251-.3589.2121.3663.4186.7228.6359,1.0979-.2168.1258-.419.2506-.6282.3627a.7367.7367,0,0,0-.4189.7984A6.5669,6.5669,0,0,1,17.7187,14.7227Z" style="fill:#fff"/><path d="M14.5966,12.2592a1.9052,1.9052,0,1,0,1.9074,1.8972A1.9227,1.9227,0,0,0,14.5966,12.2592Zm-.0048,2.5391a.634.634,0,1,1,.6413-.6266A.64.64,0,0,1,14.5918,14.7983Z" style="fill:#fff"/></g></g></svg>',
    path: generatePath('Legislación', 'Proyectos de Ley con Modificaciones')
  },
  {
    id: 'leyes-promulgadas',
    label: 'Leyes Promulgadas',
    description: 'Leyes que han sido promulgadas oficialmente',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 31.2879 31.2879"><title>Recurso 5</title><g id="beae7a4a-4663-45e3-b953-3d54ad056c98" data-name="Capa 2"><g id="e951fe5e-4505-4904-8915-c92a0ee48042" data-name="Capa 1"><path d="M22.7361,8.1185c0-.2941-.1224-.415-.42-.415l-13.3983,0c-.3,0-.4191.1182-.4191.4146q0,2.3174-.0026,4.6346a.4069.4069,0,0,1-.057.1992,4.6864,4.6864,0,0,0-.65,3.2292A4.7493,4.7493,0,0,0,14.901,19.53c.033-.02.0671-.0373.1046-.058.22.2619.4345.5162.6454.7736a.1272.1272,0,0,1,.0107.0965.8956.8956,0,0,0,.25.8972q.402.4039.8059.8057c.9024.9019,1.802,1.8067,2.708,2.7049A1.6626,1.6626,0,1,0,21.77,22.3915q-1.7508-1.7539-3.5054-3.5042a.8889.8889,0,0,0-.8856-.2537.1539.1539,0,0,1-.1168-.0165c-.2554-.2078-.5067-.4207-.7645-.6365a3.4475,3.4475,0,0,0,.1761-.3219.1921.1921,0,0,1,.2123-.128q2.726.0053,5.4518.0024a.3466.3466,0,0,0,.3984-.3821Q22.7362,12.6348,22.7361,8.1185Zm-4.1337,12.074a.5209.5209,0,0,1,.0537.0434q1.32,1.3182,2.6384,2.638a.9863.9863,0,0,1-.5159,1.6738.9186.9186,0,0,1-.8517-.2557Q18.5688,22.944,17.22,21.5866l-.0058-.0105Zm-1.1373-.8508a.2006.2006,0,0,1,.2985.0027c.1173.11.229.2261.3382.3347L16.71,21.07c-.1138-.1121-.24-.2278-.3556-.3537a.19.19,0,0,1,.01-.2731Q16.9114,19.8891,17.4651,19.3417Zm-.7189-.27-.66.6357-.5207-.62.5494-.5434Zm-4.19.4546a4.0733,4.0733,0,1,1,3.988-4.1353A4.0832,4.0832,0,0,1,12.5561,19.5259Zm9.4928-2.675H17.0347c.067-.3764.1339-.7523.2044-1.1486h.1155c1.0609,0,2.1218.002,3.1826-.0036a.5406.5406,0,0,0,.2783-.0823.2933.2933,0,0,0,.1064-.3456.3246.3246,0,0,0-.2864-.24c-.0427-.0039-.0859-.0024-.1289-.0024-1.0608,0-2.1218-.0013-3.1826.0019-.0948,0-.121-.0261-.138-.1213-.0554-.31-.1282-.6162-.195-.9237-.0073-.0339-.0194-.0667-.0333-.1139h3.5476c.0394,0,.0791.0015.1182-.0014a.3364.3364,0,0,0,.0011-.671c-.0356-.0027-.0716-.0017-.1075-.0017q-1.8708,0-3.7418.0021a.18.18,0,0,1-.1831-.108,4.5882,4.5882,0,0,0-.7374-.9742c-.0171-.0176-.0329-.0365-.0683-.076h.1422q2.3008,0,4.6019-.0019a.5585.5585,0,0,0,.2371-.048.322.322,0,0,0,.161-.3658.3329.3329,0,0,0-.2968-.2564c-.0713-.0059-.1433-.0037-.215-.0037q-2.6987,0-5.3975-.0026a.5048.5048,0,0,1-.2324-.0593,4.7476,4.7476,0,0,0-5.314.4735c-.0943.0762-.1841.1581-.2942.2531V8.3866h12.87Z" style="fill:#e03735"/><path d="M10.5049,10.1819a.5953.5953,0,0,0,.2.0282q2.4568.0023,4.9136.0011t4.9137,0a.77.77,0,0,0,.1178-.0053.333.333,0,0,0,.2845-.3591c-.0138-.1975-.1608-.3127-.4007-.3127q-4.9189,0-9.838,0a.7093.7093,0,0,0-.1176.0076.3306.3306,0,0,0-.28.298A.3264.3264,0,0,0,10.5049,10.1819Z" style="fill:#e03735"/><path d="M12.4807,11.8673a3.5829,3.5829,0,1,0,3.5792,3.62A3.5835,3.5835,0,0,0,12.4807,11.8673Zm-.0052,6.4849a2.8981,2.8981,0,1,1,2.9085-2.9009A2.8974,2.8974,0,0,1,12.4755,18.3522Z" style="fill:#e03735"/><circle cx="15.644" cy="15.644" r="14.144" style="fill:none;stroke:#e03735;stroke-miterlimit:10;stroke-width:3px"/></g></g></svg>',
    path: generatePath('Legislación', 'Leyes Promulgadas')
  },
  {
    id: 'leyes-rechazados',
    label: 'Proyectos de Ley Rechazados',
    description: 'Proyectos que no han superado el proceso legislativo',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 31.2879 31.2879"><title>Recurso 6</title><g id="a0033232-4802-4256-becb-62574bef2b7f" data-name="Capa 2"><g id="b89c528a-660d-485d-a816-d2e1dd583144" data-name="Capa 1"><path d="M21.8326,6.314l-12.48.0112a.752.752,0,0,0-.6775.7313l0,17.1749a.7669.7669,0,0,0,.8186.7425l12.3394,0a.7859.7859,0,0,0,.7807-.7423V7.0563A.7859.7859,0,0,0,21.8326,6.314Zm-.325,17.5541H9.78V7.42H21.5076Z" style="fill:#e03735"/><rect x="11.9888" y="8.9045" width="7.3105" height="0.8757" style="fill:#e03735"/><polygon points="18.88 11.817 18.88 11.018 18.823 10.961 11.989 10.961 11.989 11.874 18.823 11.874 18.88 11.817" style="fill:#e03735"/><rect x="11.9888" y="13.0547" width="6.4347" height="0.8757" style="fill:#e03735"/><polygon points="17.967 15.111 11.989 15.149 11.989 16.025 17.967 16.025 17.967 15.111" style="fill:#e03735"/><path d="M13.5669,17.4491a2.9047,2.9047,0,1,0,4.6414.6754A2.9118,2.9118,0,0,0,13.5669,17.4491Zm4.0187,3.4-.5364.5365-1.3827-1.3827-1.3826,1.3827-.5365-.5365L15.13,19.467l-1.3827-1.3827.5365-.5365,1.3826,1.3827,1.3827-1.3827.5364.5365L16.203,19.467Z" style="fill:#e03735"/><circle cx="15.644" cy="15.644" r="14.144" style="fill:none;stroke:#e03735;stroke-miterlimit:10;stroke-width:3px"/></g></g></svg>',
    path: generatePath('Legislación', 'Proyectos de Ley Rechazados')
  }
];

// Enlaces para Fiscalización
const fiscalizacionLinks = [
  {
    id: 'informe-escrito',
    label: 'Petición de Informe Escrito',
    description: 'Solicitudes formales de información por escrito',
    icon: '✍️',
    path: generatePath('Fiscalización', 'Petición de Informe Escrito')
  },
  {
    id: 'informe-oral',
    label: 'Petición de Informe Oral',
    description: 'Solicitudes de información mediante presentaciones orales',
    icon: '🗣️',
    path: generatePath('Fiscalización', 'Petición de Informe Oral')
  }
];

// Enlaces para Gestión
const gestionLinks = [
  {
    id: 'resoluciones-camarales',
    label: 'Resoluciones Camarales',
    description: 'Documentos oficiales de resolución institucional',
    icon: '📋',
    path: generatePath('Gestión', 'Resoluciones Camarales')
  },
  {
    id: 'declaraciones-camarales',
    label: 'Declaraciones Camarales',
    description: 'Declaraciones oficiales de la cámara',
    icon: '📢',
    path: generatePath('Gestión', 'Declaraciones Camarales')
  },
  {
    id: 'minutas-comunicacion',
    label: 'Minutas de Comunicación',
    description: 'Registros de comunicación institucional',
    icon: '📧',
    path: generatePath('Gestión', 'Minutas de Comunicación')
  }
];
</script>

<style scoped>
.tabs-container {
  font-family: 'Montserrat', system-ui, -apple-system, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  /* background: red; */
  border-radius: 16px;
  /* box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); */
  overflow: hidden;
  /* border: 1px solid black; */
  
}

.tabs-header {
  display: flex;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  padding: 0;
  border-bottom: 2px solid black;
}

.tab-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 22px 24px;
  background: #000;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  letter-spacing: 0.5px;
}

.tab-button:hover {
  background: #575756;
}

.tab-button.active {
  color: white;
  font-weight: 700;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(224, 54, 54, 0.2);
}

.tab-button.active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: #E4D294;
  border-radius: 2px 2px 0 0;
}

.tab-icon {
  font-size: 22px;
  transition: transform 0.3s ease;
}

.tab-button.active .tab-icon {
  transform: scale(1.1);
}

.tabs-content {
  padding: 36px;
  background: transparent;
  min-height: 500px;
}

.tab-pane {
  animation: fadeIn 0.4s ease-out;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 24px;
  /* border-bottom: 2px solid #E4D294; */
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: #E03636;
  margin-bottom: 12px;
  letter-spacing: 0.5px;
}

.section-description {
  font-size: 16px;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

.link-card {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 24px;
  text-decoration: none;
  color: inherit;
  border: 2px solid transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.link-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #E03636;
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.link-card:hover {
  transform: translateY(-6px);
  border-color: #E4D294;
  box-shadow: 0 12px 24px rgba(224, 54, 54, 0.1);
}

.link-card:hover::before {
  transform: scaleY(1);
}

.link-icon {
  font-size: 32px;
  margin-right: 20px;
  color: #E03636;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.link-card:hover .link-icon {
  transform: scale(1.1) rotate(5deg);
}

.link-content {
  flex: 1;
}

.link-title {
  font-size: 17px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.4;
}

.link-description {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin: 0;
}

.link-arrow {
  font-size: 28px;
  color: #E03636;
  margin-left: 16px;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.link-card:hover .link-arrow {
  opacity: 1;
  transform: translateX(0);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.4s ease-out;
}

/* Responsive */
@media (max-width: 1024px) {
  .links-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .tabs-header {
    flex-direction: column;
  }
  
  .tab-button {
    padding: 20px;
    justify-content: flex-start;
    padding-left: 28px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  .tab-button.active {
    transform: translateX(4px);
  }
  
  .links-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .tabs-content {
    padding: 28px 20px;
  }
  
  .section-title {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .tab-button {
    font-size: 15px;
    padding: 18px 20px;
  }
  
  .link-card {
    padding: 20px;
    flex-direction: column;
    text-align: center;
  }
  
  .link-icon {
    margin-right: 0;
    margin-bottom: 16px;
  }
  
  .link-content {
    margin-bottom: 16px;
  }
  
  .link-arrow {
    margin-left: 0;
  }
  
  .section-header {
    margin-bottom: 30px;
  }
  
  .section-title {
    font-size: 22px;
  }
  
  .section-description {
    font-size: 14px;
  }
}
</style>