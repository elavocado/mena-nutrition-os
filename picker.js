(() => {
  'use strict';
  const lang = document.documentElement.lang === 'ar' ? 'ar' : 'en';
  const ar = lang === 'ar';
  const tr = (en, arabic) => ar ? arabic : en;
  const key = 'mena-nutrition-os-v3';
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt = n => Number.isInteger(n) ? String(n) : (n === 0.5 ? '½' : String(n).replace('.5', '½'));

  const product = {
    chicken: {en:'chicken piece',ar:'قطعة فراخ'},
    salmon: {en:'salmon fillet',ar:'قطعة لاكس'},
    beef: {en:'400 g lean mince pack',ar:'عبوة لحمة مفرومة لايت 400 جم'},
    tuna: {en:'tuna can',ar:'علبة تونة'},
    eggs: {en:'egg',ar:'بيضة'},
    cheese: {en:'low-lactose / lactose-free cheese slice',ar:'شريحة جبنة لايت قليلة أو بدون لاكتوز'},
    rice: {en:'100 g dry-rice scoop',ar:'مكيال رز نيّ 100 جم'},
    pasta: {en:'100 g dry pasta (⅕ of a 500 g bag)',ar:'100 جم مكرونة نيّة (خُمس كيس 500 جم)'},
    potato: {en:'750 g ready-cut potato-wedges bag',ar:'كيس بطاطس Wedges جاهز 750 جم'},
    veg: {en:'300 g Buttergemüse / plain veg carton',ar:'علبة خضار 300 جم'},
    banana: {en:'banana',ar:'موزة'},
    yogurt: {en:'500 g lactose-free yogurt tub',ar:'علبة زبادي لاكتوز فري 500 جم'},
    oats: {en:'tablespoon oats',ar:'معلقة شوفان'}
  };
  const recipes = [];
  const add = (id, categories, emoji, device, minutes, units, nameEn, nameAr, subEn, subAr, enSteps, arSteps, opts = {}) => {
    recipes.push({id,categories,emoji,device,minutes,units,name:{en:nameEn,ar:nameAr},sub:{en:subEn,ar:subAr},steps:{en:enSteps,ar:arSteps},...opts});
  };

  // Breakfast: every component comes from Mena's own food shortlist, plus verified lactose-free yogurt and oats.
  add('b_yogurt',['breakfast','fast'],'🍌','cold',2,{yogurt:.5,banana:1,oats:4},
    'Lactose-free yogurt, banana & oats','زبادي لاكتوز فري بالموز والشوفان',
    '½ of a 500 g tub · 1 banana · 4 spoons oats','نص علبة 500 جم + موزة + 4 معالق شوفان',
    ['Take half a tub of Milbona Laktosefreier Naturjoghurt (500 g pack).','Add a banana and 4 tablespoons of oats. Mix and eat.','If you find Skyr specifically labelled lactose-free, you can use that instead. Regular Milbona Skyr is not verified lactose-free.'],
    ['خد نص علبة Milbona Naturjoghurt مكتوب عليها Laktosefrei حجم 500 جم.','ضيف موزة و4 معالق شوفان، وقلّب وكل.','لو لقيت Skyr مكتوب عليه Laktosefrei بوضوح تقدر تستخدمه. الـMilbona Skyr العادي مش متأكدين إنه لاكتوز فري.']);
  add('b_overnight',['breakfast','fast'],'🥣','cold',2,{yogurt:.5,banana:1,oats:4},
    'Overnight oats, zero morning cooking','شوفان بالزبادي من الليلة اللي قبلها',
    'Prep tonight · grab tomorrow','جهزه بالليل وخده الصبح',
    ['Mix half a tub lactose-free yogurt with 4 tablespoons oats in a covered container.','Refrigerate overnight. Add one banana when you eat.'],
    ['اخلط نص علبة زبادي لاكتوز فري مع 4 معالق شوفان في علبة بغطا.','سيبها في التلاجة بالليل، وضيف موزة وقت الأكل.']);
  add('b_eggs_cheese',['breakfast'],'🍳','air',12,{eggs:2,cheese:2},
    'Eggs & low-lactose cheese','بيض وجبنة شرايح لايت',
    'Air fryer · one small heat-safe dish','إير فراير · طبق حراري صغير',
    ['Crack 2 eggs into an air-fryer-safe dish. Add 2 slices of cheese that are lactose-free or personally tolerated.','Cook until the eggs are fully set. Use a ready batch of hard-boiled eggs when very busy.'],
    ['حط بيضتين في طبق مناسب للإير فراير وضيف شريحتين جبنة لايت لاكتوز فري أو أنت متأكد إنها بتريحك.','سوّي لحد ما البيض يستوي بالكامل. ممكن تستخدم بيض مسلوق جاهز لو مستعجل.']);
  add('b_egg_potato',['breakfast'],'🥔','air',18,{eggs:2,potato:.5},
    'Eggs & ready-cut potatoes','بيض وبطاطس متقطعة جاهزة',
    'Half a wedge bag + 2 eggs','نص كيس Wedges + بيضتين',
    ['Start half a frozen potato-wedges bag according to its instructions.','Add 2 eggs in a separate air-fryer-safe dish; cook eggs fully. Use two rounds if needed.'],
    ['ابدأ نص كيس Wedges مجمد في الإير فراير حسب تعليمات العبوة.','ضيف بيضتين في طبق حراري مناسب، وسوّيهم بالكامل. اشتغل على دورتين لو السلة زحمة.']);

  // Snacks are options, not extra restrictions.
  add('s_banana',['snack','fast'],'🍌','cold',1,{banana:1},
    'One banana','موزة واحدة',
    'The easiest grab-and-go option','أسرع حاجة تمسكها وتمشي',
    ['Take one banana. If that is not satisfying enough, add more food or choose another snack.'],
    ['خد موزة. لو مش مكفياك، زوّد أكل أو اختار سناك تاني.']);
  add('s_yogurt',['snack','fast'],'🥄','cold',1,{yogurt:.5,banana:1},
    'Lactose-free yogurt & banana','زبادي لاكتوز فري وموز',
    'Half a 500 g tub + banana','نص علبة زبادي + موزة',
    ['Use half a 500 g Milbona Laktosefreier Naturjoghurt tub and one banana.','Choose only products you tolerate.'],
    ['خد نص علبة 500 جم Milbona Laktosefreier Naturjoghurt وموزة.','لو منتج مش مريح بطنك بدّله.']);
  add('s_eggs',['snack','fast'],'🥚','cold',1,{eggs:2},
    'Two ready-boiled eggs','بيضتين مسلوقين جاهزين',
    'Prepare ahead; keep refrigerated','جهزهم من قبلها وحطهم في التلاجة',
    ['Cook a few eggs fully ahead of time and refrigerate them promptly.','Grab 2 eggs when you need a quick snack.'],
    ['جهز شوية بيض مسلوق بالكامل واحفظهم في التلاجة.','خد بيضتين وقت ما تحتاج سناك سريع.']);
  add('s_cheese',['snack','fast'],'🧀','cold',1,{cheese:2},
    'Two suitable cheese slices','شريحتين جبنة مناسبة للاكتوز',
    'Only if the label/tolerance works for you','بس لو النوع ده مريحك',
    ['Take 2 low-fat cheese slices. Choose lactose-free-labelled cheese or an aged Gouda you know you tolerate.','Avoid assuming processed cheese slices are lactose-free.'],
    ['خد شريحتين جبنة قليلة الدسم. يفضّل مكتوب Laktosefrei أو Gouda معتّقة أنت عارف إنها مريحة ليك.','مش كل الجبنة الشرايح المصنّعة خالية من اللاكتوز.']);

  // Main dishes: one shopping selection = a batch providing two main meals.
  add('m_salmon_rice',['lunch','dinner'],'🐟','rice',35,{salmon:2,rice:2,veg:1},
    'Salmon + rice + Buttergemüse','لاكس + رز + Buttergemüse',
    '2 individually wrapped fillets + 2 scoops + one 300 g carton','قطعتين متكيسين + مكيالين + علبة 300 جم',
    ['Unwrap both salmon fillets. Follow package thawing instructions. Rinse two 100 g dry-rice scoops and use the cooker water markings.','Add one 300 g vegetable carton to the rice. Steam the salmon only if the cooker is designed to cook raw fish safely; otherwise air-fry it.','Cook fish through, split the batch into two meals and chill the second promptly.'],
    ['شيل كيس التغليف من القطعتين واتبع تعليمات فك التجميد. اغسل مكيالين رز نيّ واضبط الميه حسب الجهاز.','ضيف علبة خضار 300 جم. اللاكس يتحط في سلة تبخير مخصصة للسمك لو جهازك يدعمها، وإلا الإير فراير.','سوّي السمك تمامًا واقسم الطبخة وجبتين وبرّد التانية بسرعة.'],{batch:true});
  add('m_chicken_rice',['lunch','dinner'],'🍗','rice',40,{chicken:2,rice:2,veg:1},
    'Chicken rice box','رز بالفراخ والخضار',
    '2 chicken portions + rice + ready vegetables','قطعتين فراخ + رز + خضار جاهز',
    ['Cook two dry-rice scoops and one 300 g vegetable carton in the cooker.','Cook the two chicken pieces in a safe steamer tray only if the manufacturer allows; otherwise use the air fryer. Check poultry is thoroughly cooked (74°C core).','Divide into two meals and refrigerate the second promptly.'],
    ['سوّي مكيالين رز نيّ مع علبة خضار 300 جم في الريس كوكر.','الفراخ في سلة تبخير آمنة للحوم لو الجهاز يسمح، وإلا الإير فراير. اتأكد إنها وصلت 74°C من جوه.','اقسم الطبخة وجبتين وبرّد التانية بسرعة.'],{batch:true});
  add('m_tuna_rice',['lunch','dinner'],'🥫','rice',30,{tuna:2,rice:2,veg:1},
    'Tuna rice, easy rescue batch','رز بالتونة وقت الزحمة',
    '2 cans + 2 rice scoops + 300 g vegetables','علبتين تونة + مكيالين رز + خضار',
    ['Cook two rice scoops and one 300 g vegetable carton in the cooker.','Once rice is finished, drain and add two cans of tuna. Divide into two meals, chill the second promptly.'],
    ['سوّي مكيالين رز نيّ مع علبة خضار 300 جم.','بعد ما الرز يخلص صفّي علبتين تونة وقلّبهم، واقسم الأكل وجبتين. برّد التانية بسرعة.'],{batch:true});
  add('m_beef_rice',['lunch','dinner'],'🥩','rice',40,{beef:1,rice:2,veg:1},
    'Lean beef & rice box','رز باللحمة المفرومة اللايت',
    'One 400 g pack + rice + vegetables','علبة لحمة 400 جم + رز + خضار',
    ['Cook two scoops of rice and a 300 g vegetable carton in the rice cooker.','Cook the 400 g lean beef mince thoroughly in an air-fryer-safe dish or pan, checking a 71°C core.','Mix and split into two meals. Never put raw mince directly onto rice unless the cooker explicitly supports safe meat cooking.'],
    ['سوّي مكيالين رز وعلبة خضار 300 جم في الريس كوكر.','سوّي علبة لحمة مفرومة 400 جم في طبق مناسب للإير فراير أو طاسة لحد 71°C.','اخلط واقسم وجبتين. متحطش اللحمة النيّة فوق الرز إلا لو الجهاز مصمم لكده.'],{batch:true});
  // Pasta variations: dry Combino 500 g bag divided into five 100 g portions; all preserve two-meal batch logic.
  add('m_salmon_pasta',['lunch','dinner'],'🍝','pasta',35,{salmon:2,pasta:2,veg:1},
    'Salmon & vegetable pasta','مكرونة باللاكس والخضار',
    '2 salmon fillets · ⅖ of a pasta bag · 300 g vegetables','قطعتين لاكس · خُمسين كيس مكرونة · خضار',
    ['Divide a 500 g Combino Penne/Fusilli bag into five roughly equal portions. Cook two portions in the rice cooker only if its manual permits boiling pasta; otherwise use a pot.','Air-fry 2 unwrapped salmon fillets until fully cooked. Heat one 300 g vegetable carton and stir it into the drained pasta with a little olive oil.','Split the finished food into two meals and chill the second promptly.'],
    ['قسّم كيس مكرونة Combino الـ500 جم لخمس حصص متقاربة. اسلق حصتين في الريس كوكر لو تعليماته تسمح بسلق المكرونة، وإلا استخدم حلة.','سوّي قطعتين لاكس بعد نزع التغليف في الإير فراير. سخّن علبة خضار 300 جم وقلّبها مع المكرونة بعد تصفيتها ونقطة زيت زيتون.','اقسم الوجبة على مرتين وبرّد التانية بسرعة.'],{batch:true});
  add('m_chicken_pasta',['lunch','dinner'],'🍗','pasta',40,{chicken:2,pasta:2,veg:1},
    'Chicken & veggie pasta','مكرونة بالفراخ والخضار',
    '2 chicken pieces · 200 g dry pasta · one veg carton','قطعتين فراخ · خُمسين كيس مكرونة · خضار',
    ['Cook two fifths of a 500 g Combino pasta bag, using the rice cooker only if it supports pasta cooking.','Air-fry 2 chicken portions to 74°C in the centre. Heat a 300 g vegetable carton and toss it with the drained pasta and a little olive oil.','Divide into two meals; refrigerate the second promptly.'],
    ['اسلق خُمسين كيس مكرونة Combino الـ500 جم في الريس كوكر لو بيدعم سلق المكرونة.','سوّي قطعتين فراخ في الإير فراير لحد 74°C من جوه. سخّن علبة خضار 300 جم وقلّبها مع المكرونة ونقطة زيت زيتون.','اقسم الأكل وجبتين وبرّد التانية بسرعة.'],{batch:true});
  add('m_beef_pasta',['lunch','dinner'],'🥩','pasta',35,{beef:1,pasta:2,veg:1},
    'Lean minced beef pasta','مكرونة باللحمة المفرومة اللايت',
    'One 400 g mince pack · ⅖ pasta bag · vegetables','عبوة لحمة 400 جم · خُمسين كيس مكرونة · خضار',
    ['Cook two fifths of a 500 g Combino pasta bag as directed; a rice cooker works only if its manual supports boiling pasta.','Cook the 400 g lean minced beef thoroughly to 71°C in an air-fryer-safe dish or pan. Heat one 300 g vegetable carton.','Toss everything with a little olive oil, divide into two meals and chill the second promptly.'],
    ['اسلق خُمسين كيس مكرونة Combino الـ500 جم. استخدم الريس كوكر بس لو تعليماته تسمح بالمكرونة.','سوّي عبوة اللحمة المفرومة اللايت 400 جم لحد 71°C من جوه في طبق مناسب للإير فراير أو طاسة، وسخّن علبة خضار 300 جم.','اخلط كله مع نقطة زيت زيتون واقسم وجبتين، وبرّد التانية بسرعة.'],{batch:true});
  add('m_salmon_wedges',['lunch','dinner'],'🐠','air',35,{salmon:2,potato:1,veg:1},
    'Salmon & ready-cut wedges','لاكس وبطاطس Wedges',
    'No cutting · one potato bag','مفيش تقطيع · كيس بطاطس جاهز',
    ['Start one frozen pre-cut potato-wedges bag as directed.','Unwrap two salmon fillets and add them with a 300 g vegetable carton at the right cooking stage. Use two rounds if crowded.','Cook salmon through, divide into two meals and chill leftovers promptly.'],
    ['ابدأ كيس Wedges جاهز حسب تعليمات العبوة.','شيل تغليف قطعتين اللاكس وضيفهم مع علبة خضار في الوقت المناسب، وعلى دورتين لو السلة زحمة.','سوّي السمك تمامًا واقسم الأكل وجبتين.'],{batch:true});
  add('m_chicken_wedges',['lunch','dinner'],'🍟','air',40,{chicken:2,potato:1,veg:1},
    'Chicken & ready-cut wedges','فراخ وبطاطس Wedges',
    'Two chicken pieces + one potato bag','قطعتين فراخ + كيس بطاطس',
    ['Use one frozen potato-wedges bag without cutting.','Add two chicken pieces and one 300 g vegetable carton in stages, with two air-fryer rounds if needed.','Cook chicken thoroughly to 74°C core and split the food into two meals.'],
    ['ابدأ كيس بطاطس Wedges جاهز من غير تقطيع.','ضيف قطعتين فراخ وعلبة خضار في المراحل المناسبة، ودورتين لو السلة صغيرة.','اتأكد إن الفراخ وصلت 74°C من جوه واقسم الطبخة وجبتين.'],{batch:true});
  add('m_beef_wedges',['lunch','dinner'],'🥩','air',40,{beef:1,potato:1,veg:1},
    'Lean beef kofta & wedges','كفتة لايت وبطاطس جاهزة',
    'One 400 g pack becomes two meals','علبة 400 جم تكفي غدا وعشا',
    ['Form 4 simple patties from a 400 g lean minced-beef pack.','Cook with a frozen potato-wedges bag and a 300 g vegetable carton, in rounds if crowded.','Cook mince thoroughly (71°C core), split into two meals and chill the second.'],
    ['شكّل علبة 400 جم لحمة مفرومة لايت لأربع أقراص بسيطة.','سوّيها مع كيس Wedges وعلبة خضار، على دورتين لو لازم.','اللحمة توصل 71°C من جوه، واقسم الأكل وجبتين.'],{batch:true});
  add('m_eggs_wedges',['lunch','dinner'],'🍳','air',35,{eggs:4,cheese:4,potato:1,veg:1},
    'Egg & cheese potato bake','بيض وجبنة لايت وبطاطس',
    '4 eggs, 4 suitable slices, one wedge bag','4 بيضات و4 شرايح وكيس بطاطس',
    ['Cook one frozen potato-wedges bag and the 300 g vegetable carton.','Beat 4 eggs with 4 lactose-free or tolerated low-fat cheese slices in a heat-safe air-fryer dish; cook until fully set.','Divide into two proper meals.'],
    ['ابدأ كيس بطاطس Wedges وعلبة خضار 300 جم.','اخلط 4 بيضات مع 4 شرايح جبنة لايت مناسبة للاكتوز في طبق حراري، وسوّي لحد ما البيض يستوي بالكامل.','اقسم الطبخة وجبتين.'],{batch:true});

  // Dinner rescue options are individual portions. The leftover card creates no additional grocery purchase.
  add('d_tuna_rice',['dinner'],'🥫','rice',25,{tuna:1,rice:1,veg:.5},
    'Single-serving tuna rice','رز وتونة لوجبة واحدة',
    'One can, one scoop and half a veg carton','علبة تونة، مكيال رز، ونص علبة خضار',
    ['Cook one 100 g rice scoop and half a 300 g vegetable carton.','Stir in one drained tuna can after cooking. Refrigerate the unused half vegetable carton correctly.'],
    ['سوّي مكيال رز نيّ ونص علبة خضار 300 جم.','بعد الطبخ ضيف علبة تونة مصفّاة، واحفظ نص علبة الخضار الباقي بطريقة آمنة.']);
  add('d_tuna_pasta',['dinner','fast'],'🥫','pasta',20,{tuna:1,pasta:1,veg:.5},
    '20-minute tuna pasta','مكرونة بالتونة في 20 دقيقة',
    '1 tuna can · ⅕ pasta bag · half a vegetable carton','علبة تونة · خُمس كيس مكرونة · نص علبة خضار',
    ['Take one fifth of a 500 g Combino Penne/Fusilli bag (about 100 g dry). Cook it in your rice cooker only if the manual supports boiling pasta; otherwise use a pot.','Heat half a 300 g vegetable carton. Drain the pasta and tuna can, then mix with a little olive oil.','Eat whenever you need a main meal; refrigerate any leftover cooked food promptly.'],
    ['خد خُمس كيس مكرونة Combino الـ500 جم (حوالي 100 جم نيّ). اسلقه في الريس كوكر لو تعليماته تسمح، وإلا في حلة.','سخّن نص علبة خضار 300 جم. صفّي المكرونة وعلبة التونة وقلّبهم مع نقطة زيت زيتون.','وجبة أساسية سريعة، ولو فاضل منها احفظه في التلاجة بسرعة.']);
  add('d_egg_veg',['dinner','fast'],'🍳','air',15,{eggs:2,veg:.5,cheese:2},
    'Quick eggs & vegetables','بيض وخضار وجبنة بسرعة',
    'Two eggs + half vegetable carton','بيضتين + نص علبة خضار',
    ['Put two eggs, half a 300 g vegetable carton and two tolerated cheese slices into an air-fryer-safe dish.','Cook eggs completely. If you need a more substantial meal, add rice or ready potatoes.'],
    ['حط بيضتين ونص علبة خضار وشريحتين جبنة مناسبة للاكتوز في طبق حراري للإير فراير.','سوّي البيض بالكامل، ولو محتاج وجبة أشبع ضيف رز أو بطاطس جاهزة.']);
  add('d_leftovers',['dinner','fast'],'🍱','cold',1,{},
    'Lunch leftovers = easy dinner','بواقي الغدا = عشا سهل',
    'Already included when you chose a two-portion batch','محسوبة بالفعل لما تختار طبخة وجبتين',
    ['Take the safely refrigerated second serving from your main batch.','Reheat thoroughly, only once. If you are still hungry, add enough food for comfortable fullness.'],
    ['خد الوجبة التانية من الطبخة بعد ما تكون اتحفظت في التلاجة بسرعة.','سخّنها كويس مرة واحدة. لو محتاج أكتر زوّد أكل يشبعك.'],{leftover:true});

  const starter = {
    b_yogurt:2,b_overnight:1,b_eggs_cheese:2,b_egg_potato:2,
    s_banana:7,s_yogurt:3,s_eggs:4,
    m_salmon_rice:1,m_salmon_pasta:1,m_chicken_rice:1,m_chicken_pasta:1,m_tuna_rice:1,m_beef_wedges:1,m_chicken_wedges:1
  };
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(key)) || {}; } catch (_) {}
  const state = {
    counts: saved.counts && typeof saved.counts === 'object' ? saved.counts : {...starter},
    checked: saved.checked && typeof saved.checked === 'object' ? saved.checked : {},
    filter:'breakfast',section:'browse'
  };
  function save() {
    try {localStorage.setItem(key,JSON.stringify({counts:state.counts,checked:state.checked}));}catch(_){}
  }
  function toast(message) {
    const e=$('#toast');e.textContent=message;e.classList.add('show');
    clearTimeout(toast.timer);toast.timer=setTimeout(()=>e.classList.remove('show'),2100);
  }
  function recipeName(r){return r.name[lang];}
  function chip(k,v){return fmt(v)+' '+product[k][lang];}
  function count(id){return Math.max(0,Math.min(99,Number(state.counts[id])||0));}
  function totals(){
    const result={};
    recipes.forEach(r=>{const n=count(r.id);if(!n)return;Object.entries(r.units).forEach(([k,v])=>{result[k]=(result[k]||0)+n*v;});});
    return result;
  }
  const hints={
    breakfast:{en:'Quick breakfasts from food you already enjoy. The yogurt option is lactose-free.',ar:'اختيارات فطار سهلة، والزبادي فيها لاكتوز فري.'},
    snack:{en:'Ready-to-grab snacks for when a busy day gets away from you.',ar:'سناكس جاهزة تمسكها في أي وقت زحمة.'},
    lunch:{en:'Choose rice, pasta or wedges. Each batch makes two main meals.',ar:'بدّل بين الرز والمكرونة والبطاطس. كل طبخة تطلع وجبتين.'},
    dinner:{en:'Choose a main batch, a quick option, or leftovers from lunch.',ar:'اختار طبخة رئيسية أو عشا سريع أو بواقي الغدا.'},
    fast:{en:'Minimal-prep rescue choices, without a food rule or penalty.',ar:'اختيارات إنقاذ بمجهود بسيط، من غير لوم أو تعويض.'}
  };
  function renderMeals(){
    $('#category-hint').textContent=hints[state.filter][lang];
    $$('.picker-tab').forEach(b=>b.classList.toggle('active',b.dataset.filter===state.filter));
    const visible=recipes.filter(r=>r.categories.includes(state.filter));
    $('#meal-grid').innerHTML=visible.map(r=>{
      const n=count(r.id),size=r.batch?tr('MAKES 2 MAIN MEALS','تكفي وجبتين'):tr('SINGLE PORTION','وجبة واحدة');
      const detail=tr('See how ↗','شوف الطريقة ↗');
      const units=Object.entries(r.units).slice(0,3).map(([k,v])=>'<span>'+esc(chip(k,v))+'</span>').join('');
      const controls=r.leftover?'<span class="no-purchase">'+tr('No extra shopping','من غير مشتريات إضافية')+'</span>':
        '<div class="pick-counter"><button data-minus="'+r.id+'" aria-label="'+tr('Remove','شيل')+' '+esc(recipeName(r))+'" '+(n?'':'disabled')+'>−</button><b>'+n+'</b><button class="plus" data-plus="'+r.id+'" aria-label="'+tr('Add','ضيف')+' '+esc(recipeName(r))+'">+</button></div>';
      return '<article class="pick-card '+(r.leftover?'leftovers':'')+'">'+
        '<div class="pick-art '+r.device+'"><span class="pick-tag">'+size+'</span>'+r.emoji+'</div>'+
        '<div class="pick-body"><h4>'+esc(recipeName(r))+'</h4><p class="pick-sub">'+esc(r.sub[lang])+'</p><div class="pick-chips">'+(units||'<span>'+tr('Uses your prepared leftovers','بواقي الطبخة الجاهزة')+'</span>')+'</div></div>'+
        '<div class="pick-footer"><button class="detail-btn" data-detail="'+r.id+'">'+detail+'</button>'+controls+'</div></article>';
    }).join('');
  }
  function renderStats(){
    const batches=recipes.filter(r=>r.batch).reduce((n,r)=>n+count(r.id),0);
    const total=Object.values(state.counts).reduce((a,b)=>a+(Number(b)||0),0);
    $('#recipe-total').textContent=recipes.length;
    $('#batch-total').textContent=batches;
    $('#main-total').textContent=batches*2;
    $('#selected-badge').textContent=total;
  }
  function shoppingData(){
    const t=totals();
    const n=k=>t[k]||0;
    const line=(key,name,qty)=>({key,name,qty});
    const groups=[
      {title:tr('🥩 Protein · chilled & frozen','🥩 البروتين · تلاجة وفريزر'),note:tr('Ready portions keep prep easy','عبوات جاهزة توفر عليك وقت'),rows:[
        n('chicken')&&line('chicken',tr('Chicken breast portions / Hähnchenbrust','قطع فراخ Hähnchenbrust'),tr(fmt(n('chicken'))+' individual pieces',fmt(n('chicken'))+' قطع جاهزة')),
        n('salmon')&&line('salmon',tr('Salmon fillets / Ocean Sea Lachs','قطع لاكس Ocean Sea'),tr(fmt(n('salmon'))+' individually packed fillets',fmt(n('salmon'))+' قطع متكيسة منفصلة')),
        n('beef')&&line('beef',tr('Lean mince / Rinderhackfleisch mager','لحمة مفرومة لايت'),tr(fmt(n('beef'))+' × 400 g packs',fmt(n('beef'))+' عبوات × 400 جم')),
        n('tuna')&&line('tuna',tr('Tuna in water / Thunfisch','تونة Thunfisch'),tr(fmt(n('tuna'))+' cans',fmt(n('tuna'))+' علب')),
        n('eggs')&&line('eggs',tr('Eggs / Eier','بيض Eier'),tr(fmt(n('eggs'))+' eggs',fmt(n('eggs'))+' بيضة'))
      ].filter(Boolean)},
      {title:tr('🍚 Rice, pasta & potatoes','🍚 رز ومكرونة وبطاطس'),note:tr('Rice: your scoop · pasta: fifths of a 500 g bag','الرز بالمكيال · المكرونة بخُمس الكيس'),rows:[
        n('rice')&&line('rice',tr('Golden Sun dry rice','رز Golden Sun'),tr(fmt(n('rice'))+' × 100 g scoops ≈ '+Math.ceil(n('rice')/10)+' × 1 kg bags',fmt(n('rice'))+' مكاييل 100 جم ≈ '+Math.ceil(n('rice')/10)+' كيس × 1 كجم')),
        n('pasta')&&line('pasta',tr('Combino Penne / Fusilli (dry pasta)','مكرونة Combino Penne / Fusilli'),tr(fmt(n('pasta'))+' × 100 g portions ≈ '+Math.ceil(n('pasta')/5)+' × 500 g bags',fmt(n('pasta'))+' حصص × 100 جم تقريبًا = '+Math.ceil(n('pasta')/5)+' كيس × 500 جم')),
        n('potato')&&line('potato',tr('Ready-cut frozen potato wedges','بطاطس Wedges جاهزة'),tr(Math.ceil(n('potato'))+' × 750 g bags',Math.ceil(n('potato'))+' أكياس × 750 جم')),
        n('oats')&&line('oats',tr('Oats / Haferflocken','شوفان Haferflocken'),tr(fmt(n('oats'))+' tbsp · get 1 small bag',fmt(n('oats'))+' معلقة · كيس صغير'))
      ].filter(Boolean)},
      {title:tr('🥦 Vegetables & bananas','🥦 خضار وموز'),note:tr('Butter + peas only if comfortable','الزبدة والبسلة حسب التحمل'),rows:[
        n('veg')&&line('veg',tr('Freshona Buttergemüse or plain frozen veg','Freshona Buttergemüse أو خضار سادة'),tr(Math.ceil(n('veg'))+' × 300 g cartons (if tolerated)',Math.ceil(n('veg'))+' علب × 300 جم (حسب تحملك)')),
        n('banana')&&line('banana',tr('Bananas / Bananen','موز Bananen'),tr(fmt(n('banana'))+' pieces',fmt(n('banana'))+' موزات'))
      ].filter(Boolean)},
      {title:tr('🥣 Lactose-aware choices','🥣 حاجات مناسبة للاكتوز'),note:tr('Read the actual package label','راجع المكتوب على العبوة'),rows:[
        n('yogurt')&&line('yogurt',tr('Milbona Laktosefreier Naturjoghurt','Milbona Naturjoghurt Laktosefrei'),tr(Math.ceil(n('yogurt'))+' × 500 g tubs (or verified lactose-free Skyr)',Math.ceil(n('yogurt'))+' علب × 500 جم (أو Skyr مكتوب Laktosefrei)')),
        n('cheese')&&line('cheese',tr('Suitable low-fat cheese slices / Gouda leicht','جبنة شرايح لايت مناسبة'),tr(fmt(n('cheese'))+' slices · lactose-free / tolerated',fmt(n('cheese'))+' شرايح · لاكتوز فري أو بتناسبك'))
      ].filter(Boolean)}
    ];
    return groups.filter(g=>g.rows.length);
  }
  function renderShopping(){
    const groups=shoppingData();
    let checked=0,total=0;
    $('#shopping-groups').innerHTML=groups.length?groups.map(g=>'<div class="card shopping-group"><h4>'+esc(g.title)+'</h4><small>'+esc(g.note)+'</small>'+
      g.rows.map(row=>{total++;const yes=!!state.checked[row.key];if(yes)checked++;return '<label class="shop-item '+(yes?'checked':'')+'"><span style="display:flex;align-items:center;gap:6px"><input type="checkbox" data-check="'+row.key+'" '+(yes?'checked':'')+'><span class="item-name">'+esc(row.name)+'</span></span><span class="shop-qty">'+esc(row.qty)+'</span></label>';}).join('')+'</div>').join(''):
      '<div class="shop-empty"><h4>'+tr('Your week is empty for now','قايمة الأسبوع فاضية حاليًا')+'</h4><p>'+tr('Add meals with +, or load an easy example week.','ضيف الوجبات بعلامة + أو حمّل أسبوع كمثال.')+'</p></div>';
    $('#shopping-count').textContent=checked+' / '+total;
    $('#shopping-status').textContent=tr('Your flexible weekly shopping list','مشتريات الأسبوع حسب اختيارك');
  }
  function openRecipe(id){
    const r=recipes.find(x=>x.id===id);if(!r)return;
    const units=Object.entries(r.units).map(([k,v])=>'<span class="ingredient-chip">'+esc(chip(k,v))+'</span>').join('');
    const steps=r.steps[lang].map(s=>'<li>'+esc(s)+'</li>').join('');
    $('#modal-content').innerHTML='<div class="modal-hero">'+r.emoji+'</div><div class="eyebrow">'+esc(r.device.toUpperCase())+'</div>'+
      '<h3 id="modal-heading">'+esc(recipeName(r))+'</h3><p class="modal-sub">'+(r.batch?tr('COOK ONCE · 2 SERVINGS','طبخة واحدة · وجبتين'):tr('ONE FLEXIBLE PORTION','وجبة واحدة مرنة'))+' · '+r.minutes+' '+tr('min approx.','دقيقة تقريبًا')+'</p>'+
      '<div class="modal-ing">'+(units||tr('Uses leftovers you already prepared','من بواقي الأكل اللي جهزته'))+'</div><b>'+tr('Simple method','الطريقة السهلة')+'</b><ol class="modal-list">'+steps+'</ol>'+
      '<div class="tip">💚 '+tr('Adjust portions to hunger. Packaging sizes and cooking times vary.','عدّل الكمية حسب جوعك، وأحجام العبوات ووقت التسوية بتختلف.')+'</div>';
    $('#modal-backdrop').classList.add('show');$('#close-modal').focus();
  }
  function closeModal(){$('#modal-backdrop').classList.remove('show');}
  function navigate(id){
    state.section=id;
    $$('.section').forEach(x=>x.classList.toggle('active',x.id===id));
    $$('[data-section]').forEach(x=>x.classList.toggle('active',x.dataset.section===id));
    if(id==='shopping')renderShopping();
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function changeCount(id,delta){
    const r=recipes.find(x=>x.id===id);if(!r||r.leftover)return;
    const before=totals();
    state.counts[id]=Math.max(0,Math.min(99,count(id)+delta));
    const after=totals();
    Object.keys(after).forEach(k=>{if((after[k]||0)>(before[k]||0))state.checked[k]=false;});
    save();renderMeals();renderStats();renderShopping();
    toast(delta>0?tr('Added to your week ✓','اتضاف للأسبوع ✓'):tr('Selection updated','الاختيارات اتعدلت'));
  }
  function copyShopping(){
    const groups=shoppingData();
    const body=groups.map(g=>g.title+'\n'+g.rows.map(r=>'☐ '+r.name+': '+r.qty).join('\n')).join('\n\n');
    if(!body){toast(tr('Pick a meal first','اختار وجبة الأول'));return;}
    const copied=()=>toast(tr('Weekly list copied ✓','قايمة الأسبوع اتنسخت ✓'));
    if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(body).then(copied).catch(()=>fallbackCopy(body,copied));
    else fallbackCopy(body,copied);
  }
  function fallbackCopy(text,success){
    const t=document.createElement('textarea');t.value=text;t.style.position='fixed';t.style.left='-9999px';document.body.appendChild(t);t.select();
    try{document.execCommand('copy');success();}catch(_){toast(tr('Please copy manually','انسخ القائمة يدويًا'));}t.remove();
  }
  document.addEventListener('click',e=>{
    const section=e.target.closest('[data-section],[data-go]');
    if(section){navigate(section.dataset.section||section.dataset.go);return;}
    const filter=e.target.closest('[data-filter]');
    if(filter){state.filter=filter.dataset.filter;renderMeals();return;}
    const plus=e.target.closest('[data-plus]');if(plus){changeCount(plus.dataset.plus,1);return;}
    const minus=e.target.closest('[data-minus]');if(minus){changeCount(minus.dataset.minus,-1);return;}
    const detail=e.target.closest('[data-detail]');if(detail){openRecipe(detail.dataset.detail);}
  });
  document.addEventListener('change',e=>{if(e.target.dataset.check){state.checked[e.target.dataset.check]=e.target.checked;save();renderShopping();}});
  $('#starter-week').addEventListener('click',()=>{state.counts={...starter};state.checked={};save();renderMeals();renderStats();renderShopping();toast(tr('Easy week loaded ✓','الأسبوع السهل اتحمّل ✓'));});
  $('#clear-week').addEventListener('click',()=>{if(confirm(tr('Clear this week’s meal selections and shopping checks?','تمسح اختيارات الأسبوع وعلامات الشراء؟'))){state.counts={};state.checked={};save();renderMeals();renderStats();renderShopping();toast(tr('Week cleared','الأسبوع اتفضّى'));}});
  $('#copy-shopping').addEventListener('click',copyShopping);
  $('#close-modal').addEventListener('click',closeModal);
  $('#modal-backdrop').addEventListener('click',e=>{if(e.target.id==='modal-backdrop')closeModal();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
  renderMeals();renderStats();renderShopping();
})();
