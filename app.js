const $ = (id) => document.getElementById(id);
const STORAGE = { trips: 'snish_travel_trips_v1', checks: 'snish_travel_checks_v1', custom: 'snish_travel_custom_checks_v1' };
let lang = localStorage.getItem('snish_travel_lang') || 'uk';
let toastTimer;
const translations = {
  uk: {
    navPlanner:'Планувальник',navDiscover:'Відкриття',navBudget:'Бюджет',navChecklist:'Список речей',eyebrow:'ТВОЯ НАСТУПНА ПОДОРОЖ ПОЧИНАЄТЬСЯ ТУТ',
    heroTitle:'Менше турбот.<br><span>Більше пригод.</span>',heroText:'Усе для подорожі в одному місці: ідеї напрямків, транспорт, планування та бюджет.',startPlanning:'Спланувати подорож',explore:'Дослідити напрямки',stat1:'Плануй легко',stat2:'Контролюй бюджет',stat3:'Подорожуй сміливо',nextAdventure:'НАСТУПНА ПРИГОДА',tagWorld:'Світ чекає',tagMemories:'Створюй спогади',
    quickPlan:'План подорожі',quickPlanSub:'Збережи свої плани',quickTransport:'Квитки й транспорт',quickTransportSub:'Знайди зручний маршрут',quickBudget:'Калькулятор бюджету',quickBudgetSub:'Порахуй витрати',
    plannerTitle:'Твоя подорож — твій план',plannerText:'Додай основні деталі, щоб нічого не загубити.',destination:'Куди вирушаємо?',depart:'Дата виїзду',return:'Дата повернення',travelers:'Мандрівники',tripType:'Тип подорожі',notes:'Нотатки',saveTrip:'Зберегти подорож',localNote:'Плани зберігаються в цьому браузері на твоєму пристрої.',savedTrips:'Збережені подорожі',savedTripsSub:'Твої майбутні пригоди',emptyTrips:'Тут поки порожньо',emptyTripsSub:'Створи перший план подорожі.',
    transportTitle:'Знайди свій шлях',transportText:'Переходь до сервісів пошуку квитків і порівнюй варіанти.',flightsTitle:'Авіаквитки',flightsText:'Шукай рейси, гнучкі дати та варіанти з пересадками.',groundTitle:'Потяги, автобуси й пороми',groundText:'Порівнюй наземний і водний транспорт у різних країнах.',busTitle:'Автобусні маршрути',busText:'Перевіряй міжміські автобусні рейси.',mapsTitle:'Маршрути на карті',mapsText:'Побудуй маршрут і подивись, як дістатися.',bookingDisclaimer:'Travel Assistant не продає квитки й не здійснює бронювання. Ціни, розклад і правила перевіряй на сайті перевізника перед оплатою.',
    discoverTitle:'Куди вирушимо далі?',discoverText:'Трохи натхнення для наступної пригоди.',madridDesc:'Мистецтво, площі та атмосферні вулички.',pragueDesc:'Казкова архітектура та затишні квартали.',athensDesc:'Стародавня історія та сонячні краєвиди.',exploreMore:'Дослідити',
    budgetTitle:'Бюджет під контролем',budgetText:'Оціни витрати та подивись, скільки залишиться.',currency:'Валюта',transportCost:'Транспорт',stayCost:'Житло',foodCost:'Їжа',activitiesCost:'Розваги',otherCost:'Інше',resetBudget:'Скинути розрахунок',estimatedTotal:'ОРІЄНТОВНІ ВИТРАТИ',budgetNote:'Це приблизний розрахунок. Введи актуальні ціни самостійно.',
    checkTitle:'Нічого не забудь',checkText:'Позначай речі, які вже підготував.',packingProgress:'Готовність до подорожі',addItem:'Додати',smartTitle:'Подорожуй розумно',smartText:"Перед поїздкою перевір офіційні правила в'їзду, погоду та рекомендації для мандрівників.",footerText:'Створено для тих, хто любить відкривати світ.',
    items:['Паспорт / документи','Квитки та бронювання','Телефон і зарядний пристрій','Гроші та банківська картка','Одяг за погодою','Засоби гігієни','Ліки першої потреби','Навушники']
  },
  en: {
    navPlanner:'Trip planner',navDiscover:'Discover',navBudget:'Budget',navChecklist:'Packing list',eyebrow:'YOUR NEXT JOURNEY STARTS HERE',
    heroTitle:'Less worrying.<br><span>More exploring.</span>',heroText:'Everything for your trip in one place: destination ideas, transport, planning and budget.',startPlanning:'Plan a trip',explore:'Explore destinations',stat1:'Plan with ease',stat2:'Track your budget',stat3:'Travel with confidence',nextAdventure:'NEXT ADVENTURE',tagWorld:'The world awaits',tagMemories:'Make memories',
    quickPlan:'Trip planner',quickPlanSub:'Keep your plans together',quickTransport:'Tickets & transport',quickTransportSub:'Find a convenient route',quickBudget:'Budget calculator',quickBudgetSub:'Estimate your costs',
    plannerTitle:'Your trip, your plan',plannerText:'Add the key details so nothing gets lost.',destination:'Where are we going?',depart:'Departure date',return:'Return date',travelers:'Travellers',tripType:'Trip type',notes:'Notes',saveTrip:'Save trip',localNote:'Plans are saved in this browser on your device.',savedTrips:'Saved trips',savedTripsSub:'Your upcoming adventures',emptyTrips:'Nothing here yet',emptyTripsSub:'Create your first trip plan.',
    transportTitle:'Find your way',transportText:'Open travel search services and compare options.',flightsTitle:'Flights',flightsText:'Search flights, flexible dates and connections.',groundTitle:'Trains, buses & ferries',groundText:'Compare ground and water transport across countries.',busTitle:'Bus routes',busText:'Check intercity bus services.',mapsTitle:'Routes on a map',mapsText:'Build a route and see how to get there.',bookingDisclaimer:'Travel Assistant does not sell tickets or make bookings. Check prices, schedules and rules with the provider before paying.',
    discoverTitle:'Where to next?',discoverText:'A little inspiration for your next adventure.',madridDesc:'Art, lively squares and atmospheric streets.',pragueDesc:'Fairytale architecture and cosy neighbourhoods.',athensDesc:'Ancient history and sunny views.',exploreMore:'Explore',
    budgetTitle:'Keep your budget in check',budgetText:'Estimate expenses and see the total.',currency:'Currency',transportCost:'Transport',stayCost:'Accommodation',foodCost:'Food',activitiesCost:'Activities',otherCost:'Other',resetBudget:'Reset calculation',estimatedTotal:'ESTIMATED TOTAL',budgetNote:'This is an estimate. Enter current prices yourself.',
    checkTitle:'Don’t forget a thing',checkText:'Tick off the items you have prepared.',packingProgress:'Trip readiness',addItem:'Add',smartTitle:'Travel smart',smartText:'Before departure, check official entry rules, weather and traveller advice.',footerText:'Made for people who love discovering the world.',
    items:['Passport / documents','Tickets & bookings','Phone & charger','Cash and bank card','Weather-appropriate clothes','Toiletries','Essential medication','Headphones']
  }
};
function t(key){return translations[lang][key] ?? key}
function applyLanguage(){
  document.documentElement.lang=lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{const key=el.dataset.i18n;if(translations[lang][key])el.innerHTML=translations[lang][key]});
  $('langToggle').textContent=lang==='uk'?'EN':'UA';
  renderChecklist();
}
function notify(message){const el=$('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2400)}
function read(key,fallback=[]){try{return JSON.parse(localStorage.getItem(key))||fallback}catch{return fallback}}
function save(key,value){localStorage.setItem(key,JSON.stringify(value))}
function formatDate(value){if(!value)return '';const d=new Date(value+'T00:00:00');return d.toLocaleDateString(lang==='uk'?'uk-UA':'en-GB',{day:'numeric',month:'short',year:'numeric'})}
function renderTrips(){
  const trips=read(STORAGE.trips);$('tripCount').textContent=trips.length;
  if(!trips.length){$('tripList').innerHTML=`<div class="empty-state"><span>🧳</span><b>${t('emptyTrips')}</b><small>${t('emptyTripsSub')}</small></div>`;return}
  $('tripList').innerHTML=trips.map((trip,i)=>`<div class="trip-item"><div class="trip-emoji">✈️</div><div class="trip-meta"><b>${escapeHTML(trip.destination)}</b><small>${trip.start?formatDate(trip.start):''}${trip.end?' — '+formatDate(trip.end):''} · ${trip.people} ${lang==='uk'?'мандр.':'trav.'}</small></div><button class="delete-trip" data-delete="${i}" aria-label="Delete trip">×</button></div>`).join('');
}
function escapeHTML(str){return String(str).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
$('tripForm').addEventListener('submit',e=>{e.preventDefault();const destination=$('tripDestination').value.trim();if(!destination)return;const trips=read(STORAGE.trips);trips.unshift({destination,start:$('tripStart').value,end:$('tripEnd').value,people:Math.max(1,Number($('tripPeople').value)||1),type:$('tripType').value,notes:$('tripNotes').value.trim()});save(STORAGE.trips,trips);e.target.reset();$('tripPeople').value=1;renderTrips();notify(lang==='uk'?'Подорож збережено!':'Trip saved!')});
$('tripList').addEventListener('click',e=>{const btn=e.target.closest('[data-delete]');if(!btn)return;const trips=read(STORAGE.trips);trips.splice(Number(btn.dataset.delete),1);save(STORAGE.trips,trips);renderTrips()});
const costIds=['Transport','Stay','Food','Fun','Other'];
function calculateBudget(){const vals=costIds.map(k=>Math.max(0,Number($('cost'+k).value)||0));const total=vals.reduce((a,b)=>a+b,0);const currency=$('currency').value;$('budgetTotal').textContent=currency+total.toLocaleString(lang==='uk'?'uk-UA':'en-US',{maximumFractionDigits:2});costIds.forEach((k,i)=>{$('bar'+k).style.width=(total?vals[i]/total*100:0)+'%'})}
document.querySelectorAll('.cost-input,#currency').forEach(el=>el.addEventListener('input',calculateBudget));
$('resetBudget').addEventListener('click',()=>{['Transport','Stay','Food','Fun','Other'].forEach((k,i)=>$('cost'+k).value=[0,0,0,0,0][i]);calculateBudget()});
function renderChecklist(){const defaults=t('items');const custom=read(STORAGE.custom);const all=[...defaults.map((label,i)=>({id:'d'+i,label})),...custom];const checked=read(STORAGE.checks);$('checklistItems').innerHTML=all.map(item=>`<label class="check-item ${checked.includes(item.id)?'done':''}"><input type="checkbox" data-check="${item.id}" ${checked.includes(item.id)?'checked':''}><span>${escapeHTML(item.label)}</span></label>`).join('');updateProgress(all.length,checked.length)}
function updateProgress(total,done){$('progressText').textContent=`${done} / ${total}`;$('progressBar').style.width=(total?done/total*100:0)+'%'}
$('checklistItems').addEventListener('change',e=>{if(!e.target.matches('[data-check]'))return;let checked=read(STORAGE.checks);const id=e.target.dataset.check;if(e.target.checked&&!checked.includes(id))checked.push(id);else checked=checked.filter(x=>x!==id);save(STORAGE.checks,checked);renderChecklist()});
$('customCheckForm').addEventListener('submit',e=>{e.preventDefault();const input=$('customCheckInput');const label=input.value.trim();if(!label)return;const custom=read(STORAGE.custom);custom.push({id:'c'+Date.now(),label});save(STORAGE.custom,custom);input.value='';renderChecklist()});
$('langToggle').addEventListener('click',()=>{lang=lang==='uk'?'en':'uk';localStorage.setItem('snish_travel_lang',lang);applyLanguage();renderTrips()});
$('menuToggle').addEventListener('click',()=>$('desktopNav').classList.toggle('open'));
document.querySelectorAll('.desktop-nav a').forEach(a=>a.addEventListener('click',()=>$('desktopNav').classList.remove('open')));
$('year').textContent=new Date().getFullYear();
applyLanguage();renderTrips();calculateBudget();
