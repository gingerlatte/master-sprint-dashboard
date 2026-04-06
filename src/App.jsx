import { useState, useEffect } from "react";

const C = {
  cream:"#FDF6F0",warm:"#FFF9F5",blush:"#F2C4CE",rose:"#D4849A",
  deep:"#B5637A",mauve:"#C4969F",dusty:"#E8D5D0",taupe:"#D6C4BE",
  text:"#3E2830",light:"#7A5560",muted:"#B8959E",
  gold:"#C9A96E",goldL:"#E8D5A8",sage:"#A8C5A0",sageD:"#7A9E72",
  sky:"#A8C0D4",skyD:"#6A94B0",
};

const Q2_END=new Date("2026-06-30");
const SCH_START=new Date("2026-09-01");
const now=new Date();
const daysToQ2End=Math.max(0,Math.round((Q2_END-now)/86400000));
const daysToSchool=Math.max(0,Math.round((SCH_START-now)/86400000));

const SUBJECTS=[
  {id:"ap1",label:"A&P 1",icon:"🫀",color:C.rose,topics:["Cell structure & function","Tissues: epithelial, connective, muscle, nervous","Integumentary system","Skeletal system & bone physiology","Joints & articulations","Muscular system & contraction","Nervous system overview","Action potentials & synaptic transmission"]},
  {id:"ap2",label:"A&P 2",icon:"🫁",color:C.mauve,topics:["Cardiovascular system & cardiac cycle","Blood composition & hemostasis","Respiratory system & gas exchange","Digestive system & nutrient absorption","Urinary system & filtration","Endocrine system & hormones","Reproductive system","Immune system & lymphatics"]},
  {id:"micro",label:"Microbiology",icon:"🦠",color:C.sage,topics:["Prokaryotic vs eukaryotic cells","Bacterial cell wall & gram staining","Microbial metabolism & growth","Viral replication cycles","Host-pathogen interactions","Innate vs adaptive immunity","Antimicrobial mechanisms","Epidemiology & disease transmission"]},
  {id:"chem",label:"Chemistry",icon:"⚗️",color:C.sky,topics:["Atomic structure & periodic trends","Chemical bonding & molecular geometry","Stoichiometry & molar calculations","Acids, bases & pH","Thermodynamics & reaction spontaneity","Kinetics & equilibrium","Electrochemistry","Organic functional groups relevant to biology"]},
  {id:"stats",label:"Statistics",icon:"📊",color:C.gold,topics:["Descriptive statistics & distributions","Probability & Bayes' theorem","Hypothesis testing & p-values","t-tests, ANOVA, chi-square","Confidence intervals","Correlation & regression","Research design & sampling","Interpreting clinical research data"]},
];

// ── STAGED LAUNCH DATA ────────────────────────────────────────────────────────
const STAGES=[
  {
    id:"s1", num:1, label:"Foundation", sublabel:"Legal & Structural Setup",
    icon:"🏛", color:C.sage, accent:C.sageD,
    note:"You can't operate without this layer. Get it locked first.",
    items:[
      {id:"s1a",text:"Business entity name change",done:false,subs:["File name amendment with state","Update operating agreement","Update all accounts & contracts to new name"]},
      {id:"s1b",text:"Operating Agreement updated",done:false,subs:["Reflect new entity name","Confirm ownership structure","Review with attorney if needed"]},
      {id:"s1c",text:"Independent Contractor Agreement drafted",done:false,subs:["60-day notice clause","Non-solicit (NOT non-compete)","Clear 60/40 compensation structure","Malpractice requirements for NP","Review & finalize"]},
      {id:"s1d",text:"Personal malpractice insurance updated",done:false,subs:["Review current policy coverage","Confirm it covers group practice supervision","Update if needed"]},
      {id:"s1e",text:"Practice-level malpractice policy secured",done:false,subs:["Get quotes for practice umbrella policy","NPs must carry own policy","NPs must add practice as additional insured"]},
      {id:"s1f",text:"HIPAA compliance confirmed",done:false,subs:["EHR system HIPAA-compliant","Privacy Policy in place","Informed Consent templates ready"]},
      {id:"s1g",text:"DEA requirements clarified for NPs",done:false,subs:["Confirm ADHD prescribing rules per state","Understand controlled substance protocols","Document for onboarding"]},
      {id:"s1h",text:"Multi-state licensure",done:false,subs:["Maine — applied ✅ awaiting approval","Vermont — application submitted","West Virginia — application submitted","Research additional high-value states"]},
      {id:"s1i",text:"Practice website live",done:true,subs:["Website published ✅","Update for integrated practice messaging","Add NP services section"]},
    ]
  },
  {
    id:"s2", num:2, label:"Hiring Pipeline", sublabel:"BEFORE Headway setup",
    icon:"👩‍⚕️", color:C.gold, accent:"#9A7840",
    note:"Headway group setup comes AFTER you have an NP. Build the pipeline first.",
    items:[
      {id:"s2a",text:"NP job description written",done:false,subs:["Emphasize: no marketing required (huge selling point)","Integrated care model — therapy + meds","Consistent client flow (your differentiator)","60/40 compensation structure clear"]},
      {id:"s2b",text:"Application filter system built",done:false,subs:["Pre-screen: comfort with therapy + meds integration","Pre-screen: ADHD prescribing experience","Pre-screen: autonomy level","Pre-screen: personality fit"]},
      {id:"s2c",text:"Job posted across channels",done:false,subs:["Facebook PMHNP groups (multi-state)","Indeed & NP-specific job boards","Track applicants by state (licensure matters)"]},
      {id:"s2d",text:"Speak with 3 established PMHNPs",done:false,subs:["Book call #1 — ask about compensation & ops","Book call #2 — ask about what they wish they'd known","Book call #3 — ask about red flags in practices"]},
      {id:"s2e",text:"Interview structure built",done:false,subs:["Clinical scenario questions","Autonomy assessment questions","Personality & flexibility fit","Do NOT wing this"]},
      {id:"s2f",text:"First NP selected & offer extended",done:false,subs:["Pipeline: 3 prospects identified","Interviews complete","Offer extended & accepted","This is your keystone hire"]},
    ]
  },
  {
    id:"s3", num:3, label:"Infrastructure", sublabel:"Unlocks after NP is secured",
    icon:"⚙️", color:C.sky, accent:C.skyD,
    note:"Don't set up Headway until you have your NP. These steps unlock in sequence.",
    items:[
      {id:"s3a",text:"Headway group practice account set up",done:false,subs:["Contact Headway ONLY after NP confirmed","Set up group practice account","Add NP to credentialing pipeline"]},
      {id:"s3b",text:"Billing & EHR system live",done:false,subs:["Confirm EHR for group practice (separate login)","Billing workflow mapped","Understand Net 30 payment delays for staffing decisions"]},
      {id:"s3c",text:"NP schedule template defined",done:false,subs:["8-week model structure mapped","Intake vs follow-up ratio","Calendar integration confirmed"]},
      {id:"s3d",text:"Revenue per patient tracked",done:false,subs:["CPT codes & rates per state documented","NP revenue share structure confirmed","Break-even timeline calculated"]},
    ]
  },
  {
    id:"s4", num:4, label:"Marketing Engine", sublabel:"Parallel but intentional",
    icon:"✦", color:C.mauve, accent:"#9A6E7A",
    note:"You've built the website. Now activate it. Referrals are your goldmine.",
    items:[
      {id:"s4a",text:"Core positioning refined",done:false,subs:["Integrated psychiatric + therapy care","Women's midlife / burnout / ADHD overlap","2-3 core messaging angles drafted"]},
      {id:"s4b",text:"Referral pitch created",done:false,subs:["One-pager for referring providers","Email template for outreach","Emphasize continuity of care gap you solve"]},
      {id:"s4c",text:"Referral network outreach started",done:false,subs:["PCP offices in Northern Virginia","OB/GYN & women's health clinics","Therapists who don't prescribe","Relationship-based, not cold outreach"]},
      {id:"s4d",text:"Client pipeline strategy mapped",done:false,subs:["Existing therapy clients → NP pipeline","Therapy → NP → Membership ecosystem","LMAW audience → practice funnel"]},
      {id:"s4e",text:"Marketing materials complete",done:false,subs:["Practice one-pager","Social content for launch announcement","Website updated for NP services"]},
    ]
  },
  {
    id:"s5", num:5, label:"Systems & Scale", sublabel:"After first patients — don't overbuild early",
    icon:"🚀", color:C.rose, accent:C.deep,
    note:"Don't build this too early. Get your first NP hired and patients flowing first.",
    items:[
      {id:"s5a",text:"NP onboarding protocol built",done:false,subs:["Your clinical philosophy documented","Integrated care expectations written","Documentation templates created","Training protocol for Week 1"]},
      {id:"s5b",text:"Financial flow system set up",done:false,subs:["Separate practice bank account","Bookkeeping system (QuickBooks etc.)","Quarterly tax estimates planned","Net 30 cash flow buffer planned"]},
      {id:"s5c",text:"Practice operational before Sept 2026",done:false,subs:["NP hired & seeing patients","Billing flowing","Systems running without you daily","🎯 Target: Sept 1, 2026"],target:"Sept 2026"},
    ]
  },
];

const MISSION_CATS=[
  {id:"practice",label:"Private Practice",icon:"⚕",color:C.rose,items:[
    {id:"mc1",text:"NP job posting live",done:false,subs:["Draft posting copy","Post on Indeed & PMHNP job boards","Share in PMHNP Facebook groups"]},
    {id:"mc2",text:"IC Agreement & legal docs done",done:false,subs:["Operating agreement updated","IC Agreement drafted & reviewed","Entity name change filed"]},
    {id:"mc3",text:"First NP hired",done:false,subs:["Pipeline: 3 prospects identified","Interviews complete","Offer extended & accepted"]},
    {id:"mc4",text:"Speak with 3 established PMHNPs",done:false,subs:["Book call #1","Book call #2","Book call #3"]},
    {id:"mc5",text:"Referral network activated",done:false,subs:["PCPs contacted","OB/GYN outreach","Therapists who don't prescribe"]},
  ]},
  {id:"health",label:"Health & Wellness",icon:"◯",color:C.sage,items:[
    {id:"mh1",text:"Movement 3x per week",done:false,subs:["Schedule workout blocks","Choose modality (walks, gym, yoga)","Track consistency"]},
    {id:"mh2",text:"Morning routine locked in",done:false,subs:["Set consistent wake time","5-min intention practice","No phone first 30 min"]},
    {id:"mh3",text:"Rest protected weekly",done:false,subs:["Block one screen-free evening","One joy activity per week"]},
  ]},
  {id:"financial",label:"Financial",icon:"◈",color:C.gold,items:[
    {id:"mfi1",text:"Q2 revenue goal documented",done:false,subs:["Current therapy income baseline","Projected NP revenue addition","Target monthly by June 30"]},
    {id:"mfi2",text:"Practice revenue model mapped",done:false,subs:["CPT codes & rates per state","NP 60/40 revenue share","Break-even timeline"]},
    {id:"mfi3",text:"Malpractice insurance updated",done:false,subs:["Personal policy updated","Practice-level policy secured","NP coverage requirements documented"]},
    {id:"mfi4",text:"Business banking & accounting",done:false,subs:["Separate practice bank account","Bookkeeping system confirmed","Quarterly tax estimate"]},
  ]},
  {id:"lmaw",label:"Loving Me After We",icon:"✦",color:C.mauve,items:[
    {id:"ml1",text:"April content published",done:false,subs:["2 carousels posted","Email to Inner Circle","ManyChat sequence active"]},
    {id:"ml2",text:"Inner Circle retention",done:false,subs:["Check churn rate","Plan May value drop","Engagement post this week"]},
    {id:"ml3",text:"Lead magnet updated",done:false,subs:["Review opt-in performance","Update copy if needed","Test delivery sequence"]},
  ]},
];

const SPRINT_ROWS=["Business","Finances","Personal"];
const SPRINT_COLS=[
  {id:"q1",label:"January – March",quarter:"Q1",done:true},
  {id:"q2",label:"April – June",quarter:"Q2",done:false},
  {id:"q3",label:"July – September",quarter:"Q3",done:false},
  {id:"q4",label:"October – December",quarter:"Q4",done:false},
];
const SPRINT_DEFAULT=Object.fromEntries(
  SPRINT_ROWS.map(row=>[row,Object.fromEntries(
    SPRINT_COLS.map(col=>[col.id,{bullets:["",""],notes:""}])
  )])
);

const PMHNP_KW=["pmhnp","psych np","psychiatric np","nurse practitioner","independent practice","full practice authority","scope of practice","prescribe","prescribing","pharmacology","psychopharmacology","private practice","collaborative agreement","supervision","DEA","controlled substance","legislation","state law","burnout","billing","credentialing","telehealth"];
function isPmhnpRelevant(t){const l=t.toLowerCase();return PMHNP_KW.some(k=>l.includes(k));}

const LMAW_KW=["attachment","anxious","avoidant","love","relationship","breakup","healing","narcissist","codepend","trauma","self-worth","boundaries","childhood","inner child","abandonment","emotional","grieving","divorce","separation","self-love","recovery","toxic","pattern","wound","reparent","nervous system","regulate","trigger","hypervigilant","people pleasing","fawn"];
function isLmawRelevant(t){const l=t.toLowerCase();return LMAW_KW.some(k=>l.includes(k));}

const FEED_GROUPS=[
  {
    id:"pmhnp", label:"PMHNP World", icon:"⚕",
    color:"#D4849A",
    subs:["nursepractitioner","psychnurses","nursing"],
    filter:isPmhnpRelevant,
    description:"Private practice realities, legislation, scope of practice, what PMHNPs love & hate.",
    systemPrompt:`Intelligence analyst for Ginger — LMFT launching a PMHNP-led private practice in Northern Virginia, starting NP school Sept 2026. Summarize in 2 sentences then give 2-3 "What this means for Ginger" bullets — sharp, specific, no fluff.`
  },
  {
    id:"lmaw", label:"LMAW & Growth", icon:"✦",
    color:"#C4969F",
    subs:["crappychildhoodfairy","personaldev","selfimprovement","relationshipadvice","healing","attachment","emotionalabuse","codependency","narcissisticabuse"],
    filter:isLmawRelevant,
    description:"Content intelligence for Loving Me After We — what your audience is feeling, asking, and struggling with right now.",
    systemPrompt:`Content strategist for Ginger, a psychotherapist and creator of "Loving Me After We" — a relationship healing brand focused on attachment, love addiction, breakup recovery, and self-worth after toxic relationships. Her audience is women healing from relationships. Summarize this post in 2 sentences, then give 2-3 "Content angles for Ginger" bullets — specific ideas for carousels, captions, or Inner Circle content she could create from this.`
  },
  {
    id:"patient", label:"Patient Journey", icon:"🔍",
    color:"#A8C0D4",
    subs:["mentalhealth","therapy","anxiety","depression","ADHD","ADHDwomen","TwoXADHD","AskDocs","HealthAnxiety","TwoXChromosomes","AskWomenOver30","NoStupidQuestions"],
    filter:(t)=>{const l=t.toLowerCase();return["prescriber","psychiatrist","psychiatry","medication","adderall","stimulant","adhd","find a","can't find","waitlist","appointment","insurance","telehealth","controlled substance","prescription","provider","referral","zocdoc","psychology today","how do i","where do i","looking for","need help finding","intake","new patient","accepting","availability","covered","afford","diagnosis"].some(k=>l.includes(k));},
    description:"How patients search for prescribers — pain points, emotional language, opportunity gaps. Your positioning intelligence.",
    systemPrompt:`You are a market research analyst for Ginger, a psychotherapist launching an integrated psychiatric private practice in Northern Virginia specializing in ADHD (especially women), anxiety, depression, and relationship trauma. Her practice pairs therapy with a PMHNP prescriber — solving the fragmented therapy-vs-psychiatry problem. Analyze this Reddit post and structure your response exactly as:

ENTRY POINT: How is this person trying to find care? (Google / insurance directory / referral / Reddit / trial & error)

PAIN POINTS: What's breaking down? (waitlists / medication restrictions / insurance / cost / coordination / telehealth limits / DEA confusion)

EMOTIONAL TONE: What are they feeling? (frustration / confusion / shame / urgency / exhaustion / relief)

OPPORTUNITY GAP: Where does Ginger's integrated model directly solve what this person describes?

COPYWRITING GOLD: 1-2 paraphrased phrases from this post that could appear in her marketing — the exact language her ideal patient uses.

Be sharp and specific. No generic observations.`
  },
];

function timeAgo(utc){const d=Math.floor((Date.now()/1000-utc)/60);if(d<60)return`${d}m ago`;if(d<1440)return`${Math.floor(d/60)}h ago`;return`${Math.floor(d/1440)}d ago`;}

const SK={stages:"g_stages_v1",priorities:"g_pri",intention:"g_int",studylog:"g_log",mission:"g_mission_v1",sprint:"g_sprint_v1",plist:"g_plist"};
function load(k,fb){try{const v=localStorage.getItem(k);return v?JSON.parse(v):fb;}catch{return fb;}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch{}}

export default function App(){
  const [tab,setTab]=useState("mission");
  const [stages,setStages]=useState(()=>load(SK.stages,STAGES));
  const [missionTodos,setMissionTodos]=useState(()=>load(SK.mission,MISSION_CATS));
  const [sprintData,setSprintData]=useState(()=>load(SK.sprint,SPRINT_DEFAULT));
  const [expandedSub,setExpandedSub]=useState(null);
  const [expandedStage,setExpandedStage]=useState("s1");
  const [expandedItem,setExpandedItem]=useState(null);
  const [priorities,setPri]=useState(()=>load(SK.priorities,["","",""]));
  const [intention,setInt]=useState(()=>load(SK.intention,""));
  const [priDrag,setPriDrag]=useState(null);
  const [priDragOver,setPriDragOver]=useState(null);
  const [greeting,setGreeting]=useState("");
  const [subject,setSubject]=useState(null);
  const [topic,setTopic]=useState(null);
  const [nugget,setNugget]=useState(null);
  const [nuggetLoading,setNuggetLoading]=useState(false);
  const [revealed,setRevealed]=useState({});
  const [studyLog,setStudyLog]=useState(()=>load(SK.studylog,[]));
  const [posts,setPosts]=useState({pmhnp:[],lmaw:[],patient:[]});
  const [intelLoading,setIntelLoading]=useState({pmhnp:false,lmaw:false,patient:false});
  const [activeGroup,setActiveGroup]=useState("pmhnp");
  const [intelSub,setIntelSub]=useState("all");
  const [intelFilter,setIntelFilter]=useState("relevant");
  const [expanded,setExpanded]=useState(null);
  const [summaries,setSummaries]=useState({});
  const [summarizing,setSummarizing]=useState({});
  const [priorityList,setPriorityList]=useState(()=>load(SK.plist,[]));
  const [dragItem,setDragItem]=useState(null);
  const [dragOver,setDragOver]=useState(null);

  useEffect(()=>{const h=now.getHours();setGreeting(h<12?"Good morning":h<17?"Good afternoon":"Good evening");},[]);
  useEffect(()=>{save(SK.stages,stages);},[stages]);
  useEffect(()=>{save(SK.mission,missionTodos);},[missionTodos]);
  useEffect(()=>{save(SK.sprint,sprintData);},[sprintData]);
  useEffect(()=>{save(SK.priorities,priorities);},[priorities]);
  useEffect(()=>{save(SK.intention,intention);},[intention]);
  useEffect(()=>{save(SK.studylog,studyLog);},[studyLog]);
  useEffect(()=>{save(SK.plist,priorityList);},[priorityList]);
  useEffect(()=>{if(tab==="intel"&&posts.pmhnp.length===0)fetchGroup("pmhnp");},[tab]);

  // stage helpers
  function toggleStageItem(stageId,itemId){
    setStages(p=>p.map(s=>s.id!==stageId?s:{...s,items:s.items.map(i=>i.id!==itemId?i:{...i,done:!i.done})}));
  }
  function toggleStageSub(stageId,itemId,si){
    setStages(p=>p.map(s=>s.id!==stageId?s:{...s,items:s.items.map(i=>{
      if(i.id!==itemId)return i;
      const subs=i.subs.map((sub,idx)=>idx!==si?sub:typeof sub==="object"?{...sub,done:!sub.done}:{text:sub,done:true});
      return{...i,subs};
    })}));
  }
  function editStageSub(stageId,itemId,si,v){
    setStages(p=>p.map(s=>s.id!==stageId?s:{...s,items:s.items.map(i=>{
      if(i.id!==itemId)return i;
      const subs=i.subs.map((sub,idx)=>idx!==si?sub:{text:v,done:typeof sub==="object"?sub.done:false});
      return{...i,subs};
    })}));
  }

  function stageProgress(stage){
    const d=stage.items.filter(i=>i.done).length;
    return{done:d,total:stage.items.length,pct:Math.round((d/stage.items.length)*100)};
  }
  function overallPct(){
    let d=0,t=0;
    stages.forEach(s=>{d+=s.items.filter(i=>i.done).length;t+=s.items.length;});
    return Math.round((d/t)*100);
  }

  function addToPriority(item,stageColor){if(!priorityList.find(p=>p.id===item.id))setPriorityList(p=>[...p,{...item,color:stageColor}]);}
  function removeFromPriority(id){setPriorityList(p=>p.filter(i=>i.id!==id));}
  function handleDragStart(e,idx){setDragItem(idx);e.dataTransfer.effectAllowed="move";}
  function handleDragOver(e,idx){e.preventDefault();setDragOver(idx);}
  function handleDrop(e,idx){e.preventDefault();if(dragItem===null||dragItem===idx)return;const next=[...priorityList];const[moved]=next.splice(dragItem,1);next.splice(idx,0,moved);setPriorityList(next);setDragItem(null);setDragOver(null);}

  function toggleMissionItem(catId,itemId){setMissionTodos(p=>p.map(c=>c.id!==catId?c:{...c,items:c.items.map(i=>i.id!==itemId?i:{...i,done:!i.done})}));}
  function editMissionItemText(catId,itemId,v){setMissionTodos(p=>p.map(c=>c.id!==catId?c:{...c,items:c.items.map(i=>i.id!==itemId?i:{...i,text:v})}));}
  function toggleMissionSub(catId,itemId,si){setMissionTodos(p=>p.map(c=>c.id!==catId?c:{...c,items:c.items.map(i=>{if(i.id!==itemId)return i;const subs=i.subs.map((s,idx)=>idx!==si?s:typeof s==="object"?{...s,done:!s.done}:{text:s,done:true});return{...i,subs};})}));}
  function editMissionSubText(catId,itemId,si,v){setMissionTodos(p=>p.map(c=>c.id!==catId?c:{...c,items:c.items.map(i=>{if(i.id!==itemId)return i;const subs=i.subs.map((s,idx)=>idx!==si?s:{text:v,done:typeof s==="object"?s.done:false});return{...i,subs};})}));}
  function addMissionSub(catId,itemId){setMissionTodos(p=>p.map(c=>c.id!==catId?c:{...c,items:c.items.map(i=>i.id!==itemId?i:{...i,subs:[...i.subs,{text:"",done:false}]})}));}
  function removeMissionSub(catId,itemId,si){setMissionTodos(p=>p.map(c=>c.id!==catId?c:{...c,items:c.items.map(i=>i.id!==itemId?i:{...i,subs:i.subs.filter((_,idx)=>idx!==si)})}));}

  function updateSprint(row,colId,field,value){
    setSprintData(prev=>{const next=JSON.parse(JSON.stringify(prev));if(!next[row])next[row]={};if(!next[row][colId])next[row][colId]={bullets:["",""],notes:""};if(field==="notes"){next[row][colId].notes=value;}else{const[,idx]=field.split("_");next[row][colId].bullets[parseInt(idx)]=value;}return next;});
  }
  function addSprintBullet(row,colId){setSprintData(prev=>{const next=JSON.parse(JSON.stringify(prev));next[row][colId].bullets.push("");return next;});}

  async function fetchNugget(subj,top){
    setNuggetLoading(true);setNugget(null);setRevealed({});
    try{
      const res=await fetch("/api/anthropic",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:`You are a pre-nursing school tutor for Ginger, a psychotherapist preparing to test out of prerequisite courses for an NP program starting September 2026. She is highly intelligent with a graduate-level psychology background but limited hard-science exposure. Return ONLY valid JSON, no markdown, no backticks.`,messages:[{role:"user",content:`Subject: ${subj.label}\nTopic: ${top}\n\nReturn JSON: {"topic":"${top}","nugget":"3-4 paragraph explanation","questions":[{"q":"conceptual question","a":"answer"},{"q":"clinical application question","a":"answer"},{"q":"multiple choice with 4 options, indicate correct","a":"answer with rationale"}]}`}]})});
      const data=await res.json();
      const raw=data.content?.find(b=>b.type==="text")?.text||"{}";
      setNugget(JSON.parse(raw.replace(/```json|```/g,"").trim()));
      setStudyLog(prev=>[{subject:subj.label,topic:top,date:new Date().toLocaleDateString()},...prev].slice(0,20));
    }catch(e){setNugget({error:true});}
    setNuggetLoading(false);
  }

  async function fetchGroup(groupId){
    const group=FEED_GROUPS.find(g=>g.id===groupId);
    if(!group)return;
    setIntelLoading(p=>({...p,[groupId]:true}));
    const all=[];
    for(const sub of group.subs){
      try{
        const res=await fetch(`https://www.reddit.com/r/${sub}/new.json?limit=25&raw_json=1`,{headers:{"User-Agent":"NP-Dashboard/1.0"}});
        const data=await res.json();
        data.data.children.forEach(c=>{const p=c.data;all.push({id:p.id,title:p.title,subreddit:`r/${sub}`,score:p.score,comments:p.num_comments,created:p.created_utc,url:`https://reddit.com${p.permalink}`,selftext:p.selftext?.slice(0,500)||"",group:groupId});});
      }catch(e){}
    }
    all.sort((a,b)=>b.created-a.created);
    setPosts(p=>({...p,[groupId]:all}));
    setIntelLoading(p=>({...p,[groupId]:false}));
  }

  async function summarizePost(post){
    if(summaries[post.id]||summarizing[post.id])return;
    const group=FEED_GROUPS.find(g=>g.id===post.group)||FEED_GROUPS[0];
    setSummarizing(s=>({...s,[post.id]:true}));
    try{
      const res=await fetch("/api/anthropic",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:group.systemPrompt,messages:[{role:"user",content:`${post.subreddit}\n${post.title}\n${post.selftext||""}`}]})});
      const data=await res.json();
      setSummaries(s=>({...s,[post.id]:data.content?.find(b=>b.type==="text")?.text||"Unable to summarize."}));
    }catch{setSummaries(s=>({...s,[post.id]:"Summary unavailable."}));}
    setSummarizing(s=>({...s,[post.id]:false}));
  }

  const currentGroup=FEED_GROUPS.find(g=>g.id===activeGroup)||FEED_GROUPS[0];
  const groupPosts=posts[activeGroup]||[];
  const displayPosts=(intelSub==="all"?groupPosts:groupPosts.filter(p=>p.subreddit===intelSub)).filter(p=>intelFilter==="all"||currentGroup.filter(p.title));
  const card={background:"rgba(255,255,255,0.68)",borderRadius:"20px",border:`1px solid ${C.dusty}`,backdropFilter:"blur(10px)",boxShadow:`0 4px 24px ${C.blush}22`,padding:"26px 28px"};
  const pill=(active,color=C.rose)=>({padding:"5px 14px",borderRadius:"100px",fontSize:"11px",cursor:"pointer",border:`1px solid ${active?color:C.dusty}`,background:active?`${color}30`:"transparent",color:active?color:C.muted,transition:"all 0.2s",fontFamily:"Georgia,serif"});

  const TABS=[
    {id:"mission",label:"✦ Mission Control"},
    {id:"sprint",label:"◎ 2026 Sprint"},
    {id:"school",label:"⚕ School Prep"},
    {id:"launch",label:"◈ Practice Launch"},
    {id:"intel",label:"✧ Intel Feeds"},
  ];

  const opct=overallPct();

  return(
    <div style={{minHeight:"100vh",fontFamily:"Georgia,'Times New Roman',serif",color:C.text,background:`linear-gradient(155deg,${C.warm} 0%,${C.cream} 45%,#FAF0ED 100%)`}}>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",overflow:"hidden",zIndex:0}}>
        {[["-4%","62%",C.blush,"20deg"],["-6%","3%",C.rose,"40deg"],["58%","72%",C.mauve,"-15deg"],["68%","1%",C.goldL,"30deg"],["32%","50%",C.sage,"0deg"]].map(([t,l,clr,rot],i)=>(
          <div key={i} style={{position:"absolute",top:t,left:l,width:`${220+i*50}px`,height:`${160+i*35}px`,borderRadius:"60% 40% 50% 50% / 60% 50% 50% 40%",background:`radial-gradient(ellipse,${clr}22,transparent 70%)`,transform:`rotate(${rot})`,filter:"blur(3px)"}}/>
        ))}
      </div>

      <div style={{position:"relative",zIndex:1,maxWidth:"1200px",margin:"0 auto",padding:"36px 22px 64px"}}>

        {/* HEADER */}
        <div style={{textAlign:"center",marginBottom:"28px"}}>
          <div style={{display:"inline-block",background:`linear-gradient(135deg,${C.blush}55,${C.rose}30)`,border:`1px solid ${C.blush}`,borderRadius:"100px",padding:"5px 20px",marginBottom:"12px",fontSize:"10px",letterSpacing:"3px",textTransform:"uppercase",color:C.deep}}>NP Journey Dashboard · 2026</div>
          <h1 style={{fontSize:"clamp(24px,4vw,38px)",fontWeight:"400",margin:"0 0 5px",color:C.text}}>{greeting}, Ginger ✦</h1>
          <p style={{color:C.light,fontSize:"13px",margin:0,fontStyle:"italic"}}>{daysToSchool} days to school · {daysToQ2End} days left in Q2 · Practice launch in progress</p>
        </div>

        {/* TABS */}
        <div style={{display:"flex",gap:"4px",marginBottom:"26px",flexWrap:"wrap",background:"rgba(255,255,255,0.55)",borderRadius:"16px",padding:"5px",border:`1px solid ${C.dusty}`,backdropFilter:"blur(8px)"}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:"1 1 auto",padding:"10px 14px",border:"none",borderRadius:"12px",fontSize:"12.5px",cursor:"pointer",fontFamily:"Georgia,serif",background:tab===t.id?`linear-gradient(135deg,${C.blush}90,${C.rose}50)`:"transparent",color:tab===t.id?C.deep:C.light,fontWeight:tab===t.id?"600":"400",transition:"all 0.2s"}}>{t.label}</button>
          ))}
        </div>

        {/* ═══ MISSION CONTROL ═══ */}
        {tab==="mission"&&(
          <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
            <div style={{background:`linear-gradient(135deg,${C.deep},${C.mauve} 55%,#9A7E8A)`,borderRadius:"22px",padding:"26px 32px",boxShadow:`0 10px 40px ${C.rose}30`,display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"16px"}}>
              {[{label:"Days to School",value:daysToSchool,sub:"Sept 1, 2026"},{label:"Days Left in Q2",value:daysToQ2End,sub:"June 30, 2026"},{label:"Launch Progress",value:`${opct}%`,sub:`Practice build overall`}].map(({label,value,sub})=>(
                <div key={label} style={{textAlign:"center"}}>
                  <div style={{fontSize:"10px",color:"rgba(255,255,255,0.6)",letterSpacing:"2px",textTransform:"uppercase",marginBottom:"6px"}}>{label}</div>
                  <div style={{fontSize:"36px",fontWeight:"300",color:"white",lineHeight:1}}>{value}</div>
                  <div style={{fontSize:"11px",color:"rgba(255,255,255,0.55)",marginTop:"4px"}}>{sub}</div>
                </div>
              ))}
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1.3fr 1fr",gap:"18px"}}>
              <div style={card}>
                <div style={{fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",color:C.rose,marginBottom:"5px"}}>This Week</div>
                <h3 style={{margin:"0 0 4px",fontSize:"17px",fontWeight:"400",color:C.text}}>Priorities</h3>
                <p style={{margin:"0 0 14px",fontSize:"11px",color:C.muted,fontStyle:"italic"}}>Type to edit · Drag ⠿ to reorder · + to add</p>
                <div style={{display:"flex",flexDirection:"column",gap:"7px"}}>
                  {priorities.map((p,i)=>(
                    <div key={i} draggable
                      onDragStart={e=>{e.dataTransfer.effectAllowed="move";setPriDrag(i);}}
                      onDragOver={e=>{e.preventDefault();setPriDragOver(i);}}
                      onDrop={e=>{e.preventDefault();if(priDrag===null||priDrag===i)return;const next=[...priorities];const[moved]=next.splice(priDrag,1);next.splice(i,0,moved);setPri(next);setPriDrag(null);setPriDragOver(null);}}
                      onDragEnd={()=>{setPriDrag(null);setPriDragOver(null);}}
                      style={{display:"flex",alignItems:"center",gap:"8px",padding:"8px 10px",borderRadius:"10px",background:priDragOver===i?`${C.blush}30`:"rgba(255,255,255,0.6)",border:`1px solid ${priDragOver===i?C.rose:C.dusty}`,transition:"all 0.15s"}}>
                      <span style={{color:C.muted,fontSize:"14px",cursor:"grab",flexShrink:0}}>⠿</span>
                      <div style={{width:"20px",height:"20px",borderRadius:"50%",flexShrink:0,background:i<3?[C.deep,C.mauve,C.gold][i]:C.taupe,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px",color:"white",fontWeight:"600"}}>{i+1}</div>
                      <input value={p} placeholder={`Priority ${i+1}…`} onChange={e=>{const n=[...priorities];n[i]=e.target.value;setPri(n);}} style={{flex:1,border:"none",background:"transparent",fontSize:"13px",color:p?C.text:C.muted,fontFamily:"Georgia,serif",outline:"none",padding:"2px 0"}}/>
                      <button onClick={()=>setPri(priorities.filter((_,idx)=>idx!==i))} style={{background:"transparent",border:"none",color:C.muted,fontSize:"15px",cursor:"pointer",padding:"0 2px",opacity:priorities.length===1?0.2:1}}>×</button>
                    </div>
                  ))}
                </div>
                <button onClick={()=>setPri(p=>[...p,""])} style={{marginTop:"10px",width:"100%",padding:"7px",borderRadius:"10px",border:`1px dashed ${C.rose}`,background:"transparent",color:C.rose,fontSize:"12px",cursor:"pointer",fontFamily:"Georgia,serif"}}>+ Add priority</button>
              </div>
              <div style={{...card,background:`linear-gradient(135deg,#FDF8EE,${C.warm})`,border:`1px solid ${C.goldL}`}}>
                <div style={{fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",color:C.gold,marginBottom:"5px"}}>◈ Intention</div>
                <h3 style={{margin:"0 0 14px",fontSize:"17px",fontWeight:"400",color:C.text}}>This Week I Am…</h3>
                <textarea value={intention} placeholder="A word, a phrase, a feeling…" onChange={e=>setInt(e.target.value)} style={{width:"100%",minHeight:"120px",padding:"12px",borderRadius:"12px",border:`1px solid ${C.goldL}`,background:"rgba(255,255,255,0.55)",fontSize:"14px",color:C.text,fontFamily:"Georgia,serif",resize:"none",outline:"none",lineHeight:1.7,boxSizing:"border-box"}}/>
              </div>
            </div>

            <div>
              <div style={{fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",color:C.muted,marginBottom:"14px"}}>Life Areas · Click ▾ to expand & edit sub-steps</div>
              <div style={{display:"flex",gap:"14px",overflowX:"auto",paddingBottom:"8px",alignItems:"flex-start"}}>
                {missionTodos.map(cat=>{
                  const catDone=cat.items.filter(i=>i.done).length;
                  const color=cat.color;
                  return(
                    <div key={cat.id} style={{minWidth:"230px",flex:"0 0 230px",borderRadius:"18px",background:`linear-gradient(160deg,white,${color}10)`,border:`1px solid ${color}35`,boxShadow:`0 4px 16px ${color}18`,padding:"18px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px"}}>
                        <div><div style={{fontSize:"16px",marginBottom:"2px"}}>{cat.icon}</div><div style={{fontSize:"12px",fontWeight:"600",color}}>{cat.label}</div></div>
                        <div style={{width:"34px",height:"34px",borderRadius:"50%",background:`conic-gradient(${color} ${(catDone/Math.max(cat.items.length,1))*360}deg,${color}20 0deg)`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 0 2px white"}}>
                          <div style={{width:"24px",height:"24px",borderRadius:"50%",background:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"9px",fontWeight:"700",color}}>{catDone}/{cat.items.length}</div>
                        </div>
                      </div>
                      <div style={{display:"flex",flexDirection:"column",gap:"7px"}}>
                        {cat.items.map(item=>{
                          const key=`${cat.id}-${item.id}`;
                          const isOpen=expandedSub===key;
                          const subsArr=item.subs||[];
                          return(
                            <div key={item.id}>
                              <div style={{borderRadius:"10px",background:item.done?`${color}15`:"rgba(255,255,255,0.7)",border:`1px solid ${item.done?color+"35":C.dusty}`,overflow:"hidden"}}>
                                <div style={{display:"flex",alignItems:"flex-start",gap:"7px",padding:"8px 10px"}}>
                                  <div onClick={()=>toggleMissionItem(cat.id,item.id)} style={{width:"16px",height:"16px",borderRadius:"50%",flexShrink:0,marginTop:"2px",border:`2px solid ${item.done?color:C.taupe}`,background:item.done?color:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                    {item.done&&<span style={{color:"white",fontSize:"9px"}}>✓</span>}
                                  </div>
                                  <input value={item.text} onChange={e=>editMissionItemText(cat.id,item.id,e.target.value)} style={{flex:1,border:"none",background:"transparent",fontSize:"11.5px",color:item.done?C.muted:C.text,fontFamily:"Georgia,serif",outline:"none",padding:0,textDecoration:item.done?"line-through":"none"}}/>
                                  {subsArr.length>0&&<button onClick={()=>setExpandedSub(isOpen?null:key)} style={{background:"transparent",border:"none",cursor:"pointer",color,fontSize:"14px",lineHeight:1,padding:"0 2px",flexShrink:0}}>{isOpen?"▴":"▾"}</button>}
                                </div>
                                {isOpen&&(
                                  <div style={{borderTop:`1px solid ${color}20`,padding:"8px 10px 10px",background:`${color}06`}}>
                                    {subsArr.map((sub,si)=>{
                                      const isDone=typeof sub==="object"?sub.done:false;
                                      const label=typeof sub==="object"?sub.text:sub;
                                      return(
                                        <div key={si} style={{display:"flex",alignItems:"center",gap:"6px",padding:"3px 0"}}>
                                          <div onClick={()=>toggleMissionSub(cat.id,item.id,si)} style={{width:"10px",height:"10px",borderRadius:"50%",flexShrink:0,border:`1.5px solid ${isDone?color:C.taupe}`,background:isDone?color:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                            {isDone&&<span style={{color:"white",fontSize:"6px"}}>✓</span>}
                                          </div>
                                          <input value={label} placeholder="Add step…" onChange={e=>editMissionSubText(cat.id,item.id,si,e.target.value)} style={{flex:1,border:"none",background:"transparent",fontSize:"11px",color:isDone?C.muted:C.light,fontFamily:"Georgia,serif",outline:"none",padding:"2px 0",textDecoration:isDone?"line-through":"none"}}/>
                                          <button onClick={()=>removeMissionSub(cat.id,item.id,si)} style={{background:"transparent",border:"none",color:C.muted,fontSize:"13px",cursor:"pointer",padding:"0 2px",opacity:0.5}}>×</button>
                                        </div>
                                      );
                                    })}
                                    <button onClick={()=>addMissionSub(cat.id,item.id)} style={{marginTop:"4px",width:"100%",padding:"3px",borderRadius:"6px",border:`1px dashed ${color}50`,background:"transparent",color,fontSize:"10px",cursor:"pointer",fontFamily:"Georgia,serif"}}>+ step</button>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ═══ 2026 SPRINT ═══ */}
        {tab==="sprint"&&(
          <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
            <div style={{background:`linear-gradient(135deg,${C.deep},${C.mauve})`,borderRadius:"20px",padding:"24px 32px",boxShadow:`0 8px 32px ${C.rose}30`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px"}}>
              <div>
                <div style={{fontSize:"10px",color:"rgba(255,255,255,0.65)",letterSpacing:"3px",textTransform:"uppercase",marginBottom:"6px"}}>Annual Sprint Plan</div>
                <div style={{fontSize:"32px",fontWeight:"300",color:"white",fontStyle:"italic"}}>2026 Sprint</div>
              </div>
              <div style={{display:"flex",gap:"8px"}}>
                {SPRINT_COLS.map(col=>(
                  <div key={col.id} style={{textAlign:"center",padding:"8px 14px",borderRadius:"10px",background:col.done?"rgba(255,255,255,0.1)":"rgba(255,255,255,0.2)",border:`1px solid ${col.done?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.4)"}`}}>
                    <div style={{fontSize:"11px",color:col.done?"rgba(255,255,255,0.45)":"white",fontWeight:"600",textDecoration:col.done?"line-through":"none"}}>{col.quarter}</div>
                    <div style={{fontSize:"9px",color:col.done?"rgba(255,255,255,0.35)":"rgba(255,255,255,0.7)",marginTop:"2px"}}>{col.done?"✓ Done":"Active"}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{fontSize:"12px",color:C.muted,fontStyle:"italic",textAlign:"center",padding:"8px",background:`${C.goldL}30`,borderRadius:"10px",border:`1px solid ${C.goldL}`}}>Q1 is complete — click any cell to type your Q2–Q4 goals · + to add bullets</div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",minWidth:"800px"}}>
                <thead>
                  <tr>
                    <th style={{width:"90px",padding:"10px 8px",background:"transparent"}}></th>
                    {SPRINT_COLS.map(col=>(
                      <th key={col.id} style={{padding:"12px 16px",textAlign:"center",fontSize:"12px",letterSpacing:"1px",fontWeight:"600",color:col.done?C.muted:C.deep,textDecoration:col.done?"line-through":"none",background:col.done?`${C.dusty}40`:`${C.blush}30`,borderRadius:"8px 8px 0 0",border:`1px solid ${col.done?C.dusty:C.blush}`}}>
                        {col.label}
                        {col.done&&<div style={{fontSize:"9px",color:C.muted,fontWeight:"400",textDecoration:"none",marginTop:"2px"}}>✓ Complete</div>}
                      </th>
                    ))}
                    <th style={{padding:"12px 16px",textAlign:"center",fontSize:"12px",letterSpacing:"1px",fontWeight:"600",color:C.mauve,background:`${C.mauve}20`,borderRadius:"8px 8px 0 0",border:`1px solid ${C.mauve}40`}}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {SPRINT_ROWS.map((row)=>(
                    <tr key={row}>
                      <td style={{padding:"12px 8px",verticalAlign:"middle"}}>
                        <div style={{writingMode:"vertical-rl",textOrientation:"mixed",transform:"rotate(180deg)",fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",fontWeight:"700",color:C.rose,whiteSpace:"nowrap"}}>{row}</div>
                      </td>
                      {SPRINT_COLS.map(col=>{
                        const cell=(sprintData[row]||{})[col.id]||{bullets:["",""],notes:""};
                        return(
                          <td key={col.id} style={{padding:"12px",verticalAlign:"top",background:col.done?`${C.dusty}25`:"rgba(255,255,255,0.55)",border:`1px solid ${col.done?C.dusty:C.blush}40`}}>
                            {col.done?(
                              <div style={{opacity:0.4,fontStyle:"italic",fontSize:"12px",color:C.muted,textAlign:"center",paddingTop:"20px"}}>✓ Q1 Complete</div>
                            ):(
                              <div>
                                {cell.bullets.map((b,bi)=>(
                                  <div key={bi} style={{display:"flex",alignItems:"flex-start",gap:"6px",marginBottom:"6px"}}>
                                    <span style={{color:C.rose,fontSize:"14px",lineHeight:"20px",flexShrink:0}}>·</span>
                                    <textarea value={b} placeholder="Add goal…" onChange={e=>updateSprint(row,col.id,`bullet_${bi}`,e.target.value)} rows={2} style={{flex:1,border:"none",background:"transparent",fontSize:"12px",color:C.text,fontFamily:"Georgia,serif",outline:"none",resize:"none",lineHeight:1.5,padding:0,width:"100%"}}/>
                                  </div>
                                ))}
                                <button onClick={()=>addSprintBullet(row,col.id)} style={{marginTop:"4px",fontSize:"10px",color:C.rose,background:"transparent",border:`1px dashed ${C.rose}60`,borderRadius:"6px",padding:"2px 8px",cursor:"pointer",fontFamily:"Georgia,serif"}}>+ add</button>
                              </div>
                            )}
                          </td>
                        );
                      })}
                      <td style={{padding:"12px",verticalAlign:"top",background:`${C.mauve}08`,border:`1px solid ${C.mauve}30`}}>
                        <textarea value={(sprintData[row]||{})[SPRINT_COLS[0].id]?.notes||""} placeholder="Notes…" onChange={e=>updateSprint(row,"q1","notes",e.target.value)} rows={4} style={{width:"100%",border:"none",background:"transparent",fontSize:"12px",color:C.text,fontFamily:"Georgia,serif",outline:"none",resize:"none",lineHeight:1.6,padding:0,boxSizing:"border-box"}}/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══ SCHOOL PREP ═══ */}
        {tab==="school"&&(
          <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
            <div style={card}>
              <div style={{fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",color:C.rose,marginBottom:"5px"}}>⚕ Test-Out Prep</div>
              <h2 style={{margin:"0 0 6px",fontSize:"20px",fontWeight:"400",color:C.text}}>Choose a Subject</h2>
              <p style={{margin:"0 0 18px",fontSize:"13px",color:C.muted,fontStyle:"italic"}}>Select a subject and topic — get a substantive knowledge block + 3 practice questions.</p>
              <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
                {SUBJECTS.map(s=>(
                  <button key={s.id} onClick={()=>{setSubject(s);setTopic(null);setNugget(null);}} style={{padding:"10px 18px",borderRadius:"12px",border:`1px solid ${subject?.id===s.id?s.color:C.dusty}`,background:subject?.id===s.id?`${s.color}20`:"rgba(255,255,255,0.5)",color:subject?.id===s.id?s.color:C.light,cursor:"pointer",fontSize:"13px",fontFamily:"Georgia,serif",transition:"all 0.2s"}}>
                    {s.icon} {s.label}
                  </button>
                ))}
              </div>
            </div>
            {subject&&(
              <div style={{...card,borderColor:subject.color+"50"}}>
                <div style={{fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",color:subject.color,marginBottom:"12px"}}>{subject.icon} {subject.label} — Select a Topic</div>
                <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
                  {subject.topics.map(t=>(
                    <button key={t} onClick={()=>{setTopic(t);fetchNugget(subject,t);}} style={{padding:"8px 15px",borderRadius:"10px",cursor:"pointer",border:`1px solid ${topic===t?subject.color:C.dusty}`,background:topic===t?`${subject.color}18`:"rgba(255,255,255,0.5)",color:topic===t?subject.color:C.text,fontSize:"12.5px",fontFamily:"Georgia,serif",transition:"all 0.2s"}}>{t}</button>
                  ))}
                </div>
              </div>
            )}
            {nuggetLoading&&<div style={{...card,textAlign:"center",padding:"60px"}}><div style={{fontSize:"28px",marginBottom:"12px"}}>✦</div><div style={{color:C.muted,fontStyle:"italic"}}>Building your knowledge block…</div></div>}
            {nugget&&!nuggetLoading&&!nugget.error&&(
              <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
                <div style={{...card,borderColor:subject?.color+"40"}}>
                  <div style={{fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",color:subject?.color,marginBottom:"8px"}}>Knowledge Block · {nugget.topic}</div>
                  <div style={{fontSize:"14px",lineHeight:1.8,color:C.text,whiteSpace:"pre-wrap"}}>{nugget.nugget}</div>
                </div>
                {nugget.questions?.map((q,i)=>(
                  <div key={i} style={{...card,borderColor:subject?.color+"30"}}>
                    <div style={{display:"inline-block",marginBottom:"10px",background:`${subject?.color}20`,border:`1px solid ${subject?.color}40`,borderRadius:"100px",padding:"3px 12px",fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",color:subject?.color}}>Question {i+1}</div>
                    <div style={{fontSize:"14px",lineHeight:1.65,color:C.text,marginBottom:"14px",fontWeight:"500"}}>{q.q}</div>
                    {!revealed[i]?(<button onClick={()=>setRevealed(r=>({...r,[i]:true}))} style={{padding:"8px 20px",borderRadius:"10px",cursor:"pointer",border:`1px solid ${subject?.color}`,background:"transparent",color:subject?.color,fontSize:"12px",fontFamily:"Georgia,serif"}}>Reveal Answer →</button>):(
                      <div style={{background:`${subject?.color}12`,borderRadius:"12px",padding:"14px 16px",border:`1px solid ${subject?.color}30`,fontSize:"13.5px",lineHeight:1.7,color:C.text,whiteSpace:"pre-wrap"}}>
                        <span style={{color:subject?.color,fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",display:"block",marginBottom:"6px"}}>Answer</span>{q.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {nugget?.error&&<div style={{...card,textAlign:"center",color:C.muted,fontStyle:"italic"}}>Something went wrong. Try selecting the topic again.</div>}
            {studyLog.length>0&&(
              <div style={card}>
                <div style={{fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",color:C.muted,marginBottom:"12px"}}>Recent Study Log</div>
                <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
                  {studyLog.slice(0,10).map((entry,i)=>(
                    <div key={i} style={{padding:"5px 12px",borderRadius:"100px",fontSize:"11px",background:`${C.blush}30`,border:`1px solid ${C.dusty}`,color:C.light}}>{entry.subject} · {entry.topic} · {entry.date}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══ PRACTICE LAUNCH — STAGED VIEW ═══ */}
        {tab==="launch"&&(
          <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>

            {/* overall banner */}
            <div style={{background:`linear-gradient(135deg,${C.deep},${C.mauve})`,borderRadius:"20px",padding:"22px 28px",boxShadow:`0 8px 32px ${C.rose}30`,display:"flex",alignItems:"center",gap:"24px",flexWrap:"wrap"}}>
              <div>
                <div style={{fontSize:"10px",color:"rgba(255,255,255,0.65)",letterSpacing:"2px",textTransform:"uppercase",marginBottom:"4px"}}>Overall Launch Progress</div>
                <div style={{fontSize:"40px",fontWeight:"300",color:"white",lineHeight:1}}>{opct}<span style={{fontSize:"20px"}}>%</span></div>
              </div>
              <div style={{flex:1,minWidth:"200px"}}>
                <div style={{height:"7px",background:"rgba(255,255,255,0.2)",borderRadius:"100px",marginBottom:"8px"}}>
                  <div style={{height:"100%",width:`${opct}%`,background:"white",borderRadius:"100px",transition:"width 0.6s ease",boxShadow:"0 0 10px rgba(255,255,255,0.5)"}}/>
                </div>
                <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
                  {stages.map(s=>{
                    const p=stageProgress(s);
                    return(
                      <div key={s.id} style={{fontSize:"10px",color:"rgba(255,255,255,0.7)"}}>
                        S{s.num}: {p.done}/{p.total}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{fontSize:"11px",color:"rgba(255,255,255,0.6)",fontStyle:"italic",maxWidth:"180px",textAlign:"right",lineHeight:1.5}}>Target: operational before Sept 2026</div>
            </div>

            {/* stage unlock hint */}
            <div style={{background:`${C.goldL}35`,border:`1px solid ${C.goldL}`,borderRadius:"12px",padding:"10px 18px",fontSize:"12px",color:C.light,fontStyle:"italic",textAlign:"center"}}>
              Each stage unlocks the next · Click a stage header to expand · Tap ＋ to add to Priority Queue
            </div>

            {/* stages */}
            <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
              {stages.map((stage,si)=>{
                const prog=stageProgress(stage);
                const isOpen=expandedStage===stage.id;
                const color=stage.color;
                const allDone=prog.done===prog.total;
                return(
                  <div key={stage.id} style={{borderRadius:"18px",overflow:"hidden",border:`1px solid ${color}${allDone?"80":"35"}`,boxShadow:`0 4px 20px ${color}15`,transition:"all 0.2s"}}>

                    {/* stage header */}
                    <div onClick={()=>setExpandedStage(isOpen?null:stage.id)} style={{
                      background:allDone?`linear-gradient(135deg,${color}25,${color}15)`:`linear-gradient(135deg,white,${color}08)`,
                      padding:"18px 22px",cursor:"pointer",
                      display:"flex",alignItems:"center",gap:"16px",
                    }}>
                      <div style={{
                        width:"40px",height:"40px",borderRadius:"50%",flexShrink:0,
                        background:`conic-gradient(${color} ${prog.pct*3.6}deg,${color}20 0deg)`,
                        display:"flex",alignItems:"center",justifyContent:"center",
                        boxShadow:`0 0 0 3px white,0 0 0 4px ${color}30`,
                      }}>
                        <div style={{width:"28px",height:"28px",borderRadius:"50%",background:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px",fontWeight:"700",color}}>{prog.pct}%</div>
                      </div>
                      <div style={{flex:1}}>
                        <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"3px"}}>
                          <span style={{fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",color,fontWeight:"700"}}>Stage {stage.num}</span>
                          <span style={{fontSize:"10px",padding:"1px 8px",borderRadius:"100px",background:`${color}20`,color,border:`1px solid ${color}30`}}>{prog.done}/{prog.total}</span>
                          {allDone&&<span style={{fontSize:"10px",color:C.sageD,background:`${C.sage}25`,border:`1px solid ${C.sage}`,borderRadius:"100px",padding:"1px 8px"}}>✓ Complete</span>}
                        </div>
                        <div style={{fontSize:"16px",fontWeight:"500",color:C.text,marginBottom:"2px"}}>{stage.icon} {stage.label}</div>
                        <div style={{fontSize:"11px",color:C.muted,fontStyle:"italic"}}>{stage.sublabel}</div>
                      </div>
                      <div style={{fontSize:"18px",color,transition:"transform 0.2s",transform:isOpen?"rotate(180deg)":"rotate(0deg)"}}>▾</div>
                    </div>

                    {/* stage body */}
                    {isOpen&&(
                      <div style={{background:"rgba(255,255,255,0.6)",padding:"0 22px 20px"}}>
                        {/* note */}
                        <div style={{padding:"12px 14px",margin:"16px 0 14px",background:`${color}12`,borderRadius:"10px",border:`1px solid ${color}25`,fontSize:"12px",color:stage.accent||color,fontStyle:"italic",lineHeight:1.6}}>
                          💡 {stage.note}
                        </div>
                        {/* items */}
                        <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
                          {stage.items.map(item=>{
                            const itemKey=`${stage.id}-${item.id}`;
                            const itemOpen=expandedItem===itemKey;
                            const subsArr=item.subs||[];
                            const subsDone=subsArr.filter(s=>typeof s==="object"&&s.done).length;
                            return(
                              <div key={item.id} style={{borderRadius:"12px",overflow:"hidden",border:`1px solid ${item.done?color+"40":C.dusty}`,background:item.done?`${color}10`:"rgba(255,255,255,0.7)"}}>
                                <div style={{display:"flex",alignItems:"flex-start",gap:"10px",padding:"11px 14px"}}>
                                  <div onClick={()=>toggleStageItem(stage.id,item.id)} style={{width:"18px",height:"18px",borderRadius:"50%",flexShrink:0,marginTop:"2px",border:`2px solid ${item.done?color:C.taupe}`,background:item.done?color:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                    {item.done&&<span style={{color:"white",fontSize:"10px"}}>✓</span>}
                                  </div>
                                  <div style={{flex:1}}>
                                    <div style={{fontSize:"13px",color:item.done?C.muted:C.text,textDecoration:item.done?"line-through":"none",lineHeight:1.4,marginBottom:"2px"}}>{item.text}</div>
                                    {subsArr.length>0&&(
                                      <div style={{fontSize:"10px",color:C.muted}}>
                                        {subsDone}/{subsArr.length} sub-steps complete
                                      </div>
                                    )}
                                    {item.target&&<div style={{fontSize:"10px",color:C.gold,marginTop:"2px"}}>🎯 {item.target}</div>}
                                  </div>
                                  <div style={{display:"flex",gap:"6px",alignItems:"center",flexShrink:0}}>
                                    {!item.done&&(
                                      <button onClick={()=>addToPriority(item,color)} style={{width:"20px",height:"20px",borderRadius:"50%",border:`1px solid ${color}`,background:"transparent",color,fontSize:"14px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",opacity:priorityList.find(p=>p.id===item.id)?0.3:1}}>＋</button>
                                    )}
                                    {subsArr.length>0&&(
                                      <button onClick={()=>setExpandedItem(itemOpen?null:itemKey)} style={{background:"transparent",border:"none",cursor:"pointer",color,fontSize:"14px",padding:"0 2px"}}>{itemOpen?"▴":"▾"}</button>
                                    )}
                                  </div>
                                </div>
                                {/* sub-steps */}
                                {itemOpen&&(
                                  <div style={{borderTop:`1px solid ${color}20`,padding:"8px 14px 12px 42px",background:`${color}06`}}>
                                    {subsArr.map((sub,si2)=>{
                                      const isDone=typeof sub==="object"?sub.done:false;
                                      const label=typeof sub==="object"?sub.text:sub;
                                      return(
                                        <div key={si2} style={{display:"flex",alignItems:"center",gap:"8px",padding:"4px 0"}}>
                                          <div onClick={()=>toggleStageSub(stage.id,item.id,si2)} style={{width:"12px",height:"12px",borderRadius:"50%",flexShrink:0,border:`1.5px solid ${isDone?color:C.taupe}`,background:isDone?color:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                            {isDone&&<span style={{color:"white",fontSize:"7px"}}>✓</span>}
                                          </div>
                                          <input value={label} onChange={e=>editStageSub(stage.id,item.id,si2,e.target.value)} style={{flex:1,border:"none",background:"transparent",fontSize:"12px",color:isDone?C.muted:C.light,fontFamily:"Georgia,serif",outline:"none",padding:"2px 0",textDecoration:isDone?"line-through":"none"}}/>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* priority queue */}
            <div style={{...card,border:`1px solid ${C.goldL}`,marginTop:"8px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px"}}>
                <div><div style={{fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",color:C.gold,marginBottom:"3px"}}>◈ Priority Queue</div><h3 style={{margin:0,fontSize:"17px",fontWeight:"400",color:C.text}}>What I'm tackling next</h3></div>
                {priorityList.length>0&&<button onClick={()=>setPriorityList([])} style={{background:"transparent",border:`1px solid ${C.dusty}`,borderRadius:"100px",padding:"4px 12px",fontSize:"10px",color:C.muted,cursor:"pointer"}}>Clear all</button>}
              </div>
              {priorityList.length===0?(
                <div style={{textAlign:"center",padding:"28px",color:C.muted,fontStyle:"italic",fontSize:"13px",border:`1px dashed ${C.taupe}`,borderRadius:"12px"}}>Tap ＋ on any task above to build your priority queue here.<br/><span style={{fontSize:"11px"}}>Drag to reorder once added.</span></div>
              ):(
                <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
                  {priorityList.map((item,idx)=>{
                    const color=item.color||C.rose;
                    return(
                      <div key={item.id} draggable onDragStart={e=>handleDragStart(e,idx)} onDragOver={e=>handleDragOver(e,idx)} onDrop={e=>handleDrop(e,idx)} onDragEnd={()=>{setDragItem(null);setDragOver(null);}}
                        style={{display:"flex",alignItems:"center",gap:"10px",padding:"11px 14px",borderRadius:"12px",cursor:"grab",background:dragOver===idx?`${color}18`:`${color}10`,border:`1px solid ${dragOver===idx?color:color+"40"}`,transition:"all 0.15s"}}>
                        <span style={{color:C.muted,fontSize:"14px"}}>⠿</span>
                        <div style={{width:"22px",height:"22px",borderRadius:"50%",flexShrink:0,background:color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px",color:"white",fontWeight:"700"}}>{idx+1}</div>
                        <div style={{flex:1}}>
                          <div style={{fontSize:"13px",color:C.text,lineHeight:1.35}}>{item.text}</div>
                        </div>
                        <button onClick={()=>removeFromPriority(item.id)} style={{background:"transparent",border:"none",color:C.muted,fontSize:"16px",cursor:"pointer",lineHeight:1,padding:"2px 6px"}}>×</button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══ PMHNP WORLD ═══ */}
        {tab==="intel"&&(
          <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>

            {/* feed group switcher */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"12px"}}>
              {FEED_GROUPS.map(g=>(
                <div key={g.id} onClick={()=>{setActiveGroup(g.id);setIntelSub("all");setExpanded(null);if((posts[g.id]||[]).length===0)fetchGroup(g.id);}}
                  style={{
                    borderRadius:"16px",padding:"18px 20px",cursor:"pointer",
                    background:activeGroup===g.id?`linear-gradient(135deg,${g.color}25,${g.color}10)`:"rgba(255,255,255,0.55)",
                    border:`1px solid ${activeGroup===g.id?g.color+"60":C.dusty}`,
                    boxShadow:activeGroup===g.id?`0 4px 20px ${g.color}20`:"none",
                    transition:"all 0.2s",
                  }}>
                  <div style={{fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",color:g.color,marginBottom:"4px"}}>{g.icon} {g.label}</div>
                  <div style={{fontSize:"12px",color:C.muted,fontStyle:"italic",lineHeight:1.4}}>{g.description}</div>
                  {(posts[g.id]||[]).length>0&&<div style={{fontSize:"10px",color:g.color,marginTop:"8px"}}>{(posts[g.id]||[]).length} posts loaded</div>}
                  {(posts[g.id]||[]).length===0&&<div style={{fontSize:"10px",color:C.muted,marginTop:"8px",fontStyle:"italic"}}>Click to load</div>}
                </div>
              ))}
            </div>

            <div style={card}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px",flexWrap:"wrap",gap:"10px"}}>
                <div>
                  <div style={{fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",color:currentGroup.color,marginBottom:"4px"}}>{currentGroup.icon} {currentGroup.label}</div>
                  <h2 style={{margin:0,fontSize:"20px",fontWeight:"400",color:C.text}}>
                    {activeGroup==="pmhnp"?"PMHNP World":activeGroup==="lmaw"?"LMAW & Personal Growth":"Patient Journey Research"}
                  </h2>
                </div>
                <button onClick={()=>fetchGroup(activeGroup)} style={{background:"transparent",border:`1px solid ${currentGroup.color}50`,borderRadius:"100px",padding:"6px 16px",fontSize:"11px",color:currentGroup.color,cursor:"pointer",letterSpacing:"1px"}}>↻ Refresh</button>
              </div>

              {/* subreddit filter pills */}
              <div style={{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"10px"}}>
                <button onClick={()=>setIntelSub("all")} style={pill(intelSub==="all",currentGroup.color)}>All Sources</button>
                {currentGroup.subs.map(s=>(
                  <button key={s} onClick={()=>setIntelSub(`r/${s}`)} style={pill(intelSub===`r/${s}`,currentGroup.color)}>r/{s}</button>
                ))}
              </div>

              {/* relevance toggle */}
              <div style={{display:"flex",marginBottom:"16px",borderRadius:"10px",overflow:"hidden",border:`1px solid ${C.dusty}`}}>
                {["relevant","all"].map(f=>(
                  <button key={f} onClick={()=>setIntelFilter(f)} style={{flex:1,padding:"8px",border:"none",fontSize:"11px",letterSpacing:"1px",textTransform:"uppercase",cursor:"pointer",fontFamily:"Georgia,serif",background:intelFilter===f?`linear-gradient(135deg,${currentGroup.color}50,${currentGroup.color}30)`:"transparent",color:intelFilter===f?C.deep:C.muted,transition:"all 0.2s"}}>
                    {f==="relevant"?`★ ${activeGroup==="pmhnp"?"PMHNP":activeGroup==="lmaw"?"LMAW":"Patient"} Relevant`:"All Posts"}
                  </button>
                ))}
              </div>

              {/* feed */}
              {intelLoading[activeGroup]?(
                <div style={{textAlign:"center",padding:"60px",color:C.muted,fontStyle:"italic"}}>
                  <div style={{fontSize:"28px",marginBottom:"12px"}}>{currentGroup.icon}</div>
                  Scanning {currentGroup.label}…
                </div>
              ):(
                <div style={{display:"flex",flexDirection:"column",gap:"10px",maxHeight:"560px",overflowY:"auto",paddingRight:"4px"}}>
                  {displayPosts.length===0&&(
                    <div style={{textAlign:"center",padding:"40px",color:C.muted,fontStyle:"italic"}}>
                      No posts found. Try refreshing or switching to "All Posts."
                    </div>
                  )}
                  {displayPosts.map(post=>(
                    <div key={post.id} style={{borderRadius:"14px",overflow:"hidden",transition:"all 0.2s",border:`1px solid ${expanded===post.id?currentGroup.color:C.dusty}`,background:expanded===post.id?`${currentGroup.color}10`:"rgba(255,255,255,0.5)"}}>
                      <div onClick={()=>{setExpanded(expanded===post.id?null:post.id);if(expanded!==post.id)summarizePost(post);}} style={{padding:"14px 16px",cursor:"pointer"}}>
                        <div style={{display:"flex",justifyContent:"space-between",gap:"8px"}}>
                          <div style={{fontSize:"13px",color:C.text,lineHeight:1.45,flex:1}}>{post.title}</div>
                          <span style={{color:currentGroup.color,fontSize:"18px",flexShrink:0}}>{expanded===post.id?"−":"+"}</span>
                        </div>
                        <div style={{display:"flex",gap:"8px",marginTop:"7px",flexWrap:"wrap"}}>
                          <span style={{fontSize:"10px",padding:"2px 8px",borderRadius:"100px",background:`${currentGroup.color}18`,color:currentGroup.color}}>{post.subreddit}</span>
                          <span style={{fontSize:"10px",color:C.muted}}>▲ {post.score}</span>
                          <span style={{fontSize:"10px",color:C.muted}}>💬 {post.comments}</span>
                          <span style={{fontSize:"10px",color:C.muted}}>{timeAgo(post.created)}</span>
                        </div>
                      </div>
                      {expanded===post.id&&(
                        <div style={{padding:"0 16px 16px",borderTop:`1px solid ${C.dusty}40`}}>
                          {post.selftext&&<p style={{fontSize:"12px",color:C.light,lineHeight:1.65,margin:"12px 0",fontStyle:"italic"}}>{post.selftext}…</p>}
                          <div style={{background:`linear-gradient(135deg,${C.cream},${C.warm})`,borderRadius:"12px",padding:"14px",border:`1px solid ${currentGroup.color}30`,marginTop:"10px"}}>
                            <div style={{fontSize:"10px",letterSpacing:"2px",color:currentGroup.color,textTransform:"uppercase",marginBottom:"8px"}}>
                              {activeGroup==="pmhnp"?"✦ Analysis for Ginger":activeGroup==="lmaw"?"✦ Content Angles for LMAW":"🔍 Patient Journey Analysis"}
                            </div>
                            {summarizing[post.id]?<div style={{color:C.muted,fontSize:"12px",fontStyle:"italic"}}>Analyzing through your lens…</div>:<div style={{fontSize:"12.5px",color:C.text,lineHeight:1.75,whiteSpace:"pre-wrap"}}>{summaries[post.id]}</div>}
                          </div>
                          <a href={post.url} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",marginTop:"10px",fontSize:"11px",color:C.deep,textDecoration:"none"}}>Read full thread →</a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div style={{textAlign:"center",marginTop:"48px",color:C.muted,fontSize:"11px",fontStyle:"italic",letterSpacing:"1px"}}>✦ &nbsp; Ginger's NP Journey &nbsp;·&nbsp; 2026</div>
      </div>
    </div>
  );
}
