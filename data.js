// Original teaching summaries and schematic illustrations, not diagnostic standards.
export const muscles={back:'背部',shoulders:'肩部',arms:'手臂',chest:'胸部',core:'核心',glutes:'臀部',quads:'大腿前侧',hamstrings:'大腿后侧',calves:'小腿'};
export const equipment={machine:'健身房器械',dumbbell:'哑铃',band:'弹力带',body:'自重'};
const make=(id,name,group,gear,difficulty,main,secondary,sets,min,max,pose,steps,caution,extra={})=>({id,name,group,gear,difficulty,main,secondary,sets,min,max,pose,steps,caution,unit:'次',loaded:gear==='machine'||gear==='dumbbell',...extra});
export const exercises=Object.fromEntries([
make('pulldown','高位下拉','pull','machine',2,['back'],['arms'],3,8,12,'pulldown',['坐稳并固定大腿，握距以舒适为准。','把肘部向身体两侧带，下拉至上胸附近。','控制还原，避免耸肩、甩动或颈后下拉。'],'不靠大幅后仰拉动重量。'),
make('bandpull','弹力带下拉','pull','band',1,['back'],['arms'],3,10,15,'pulldown',['确认高位固定点牢靠，弹力带无裂口。','肋骨保持稳定，肘部向下拉。','慢慢还原，不让弹力带突然回弹。'],'没有可靠固定点时改选其他动作。'),
make('prone','俯卧 W 提拉','pull','body',1,['back'],['shoulders'],2,10,15,'prone',['俯卧，额头垫毛巾，手臂摆成 W 形。','轻抬双臂，肩胛缓慢向后靠拢。','放回地面，保持颈部放松。'],'这是低负荷背部控制替代，不能等量代替下拉。'),
make('row','坐姿划船','row','machine',2,['back'],['arms'],3,8,12,'row',['脚踩稳，脊柱保持自然，双手握把。','肘部向后带，握把靠近下肋。','伸臂还原，不用躯干前后摆动借力。'],'避免耸肩或腰部反复屈伸。'),
make('dbrow','支撑单臂哑铃划船','row','dumbbell',2,['back'],['arms','core'],3,8,12,'hingerrow',['一手扶牢固支撑，髋部后移。','肘部向髋侧拉，躯干不旋转。','缓慢下放，两侧都完成后记一组。'],'支撑物必须稳定。重量记单只哑铃。',{side:true}),
make('bandrow','坐姿弹力带划船','row','band',1,['back'],['arms'],3,10,15,'row',['弹力带固定在可靠低位，坐稳。','肘部向后拉，保持肩颈放松。','控制伸臂回位。'],'检查固定点，避免弹力带对着面部。'),
make('press','哑铃肩推','press','dumbbell',2,['shoulders'],['arms'],3,8,12,'press',['坐稳，哑铃在肩附近，前臂接近竖直。','呼气向上推至舒适范围。','缓慢落回，不用腰部过度后仰。'],'出现夹挤或疼痛时停止。重量记单只哑铃。'),
make('machinepress','器械肩推','press','machine',1,['shoulders'],['arms'],3,8,12,'press',['调座椅，让握把在肩附近。','背靠稳，平稳向上推。','控制还原，不锁死肘部。'],'器械轨迹应舒适，不强求幅度。'),
make('wallpush','墙壁俯卧撑','press','body',1,['chest'],['shoulders','arms'],2,8,12,'wallpush',['双手扶墙略宽于肩，身体呈直线。','屈肘向墙靠近，肩部保持舒适。','推离墙面回到起点。'],'推类入门替代，训练重点更偏胸部。'),
make('raise','哑铃侧平举','raise','dumbbell',1,['shoulders'],[],3,12,15,'raise',['站稳，轻哑铃放在身体两侧。','肘微屈，手臂在身体略前方抬起。','接近肩高或更低的舒适高度后慢落。'],'不要耸肩或用躯干摆动。重量记单只哑铃。'),
make('bandraise','弹力带侧平举','raise','band',2,['shoulders'],[],2,12,15,'raise',['踩牢弹力带，留出合适长度。','双臂略向前侧抬起，肘微屈。','慢慢下放，保持张力可控。'],'不要把弹力带拉至极限。'),
make('curl','哑铃二头弯举','curl','dumbbell',1,['arms'],[],2,10,15,'curl',['站稳，掌心向前，上臂贴近身体。','屈肘举起，躯干不摆动。','慢慢伸肘回位。'],'重量记单只哑铃。'),
make('bandcurl','弹力带弯举','curl','band',1,['arms'],[],2,10,15,'curl',['踩稳弹力带，双手握紧。','上臂保持稳定，屈肘向上。','控制还原。'],'手腕保持自然，不反折。'),
make('triceps','绳索三头下压','triceps','machine',1,['arms'],[],2,10,15,'triceps',['站稳，上臂贴近躯干。','伸肘向下推，肩部不前后晃动。','慢慢屈肘回位。'],'避免把全身重量压在把手上。'),
make('bandtri','弹力带三头下压','triceps','band',1,['arms'],[],2,10,15,'triceps',['弹力带固定在牢靠高位。','上臂固定，伸肘向下压。','缓慢回到起始位。'],'先检查弹力带与固定点。'),
make('squat','高脚杯深蹲','squat','dumbbell',2,['quads','glutes'],['core'],3,8,12,'squat',['双手在胸前抱住一只哑铃，脚掌踩稳。','屈髋屈膝下蹲，膝盖随脚尖方向。','在可控无痛范围内起身。'],'不强求蹲深，重量记胸前这只哑铃。'),
make('chairsquat','坐椅深蹲','squat','body',1,['quads','glutes'],['core'],2,8,12,'squat',['椅子靠墙固定，双脚稳定。','髋部后移，缓慢坐向椅面。','轻触或坐稳后用双脚推地站起。'],'选择能稳定起身的椅子高度。'),
make('legpress','器械腿举','squat','machine',1,['quads','glutes'],[],3,8,12,'legpress',['调整座位，背部贴垫，双脚踩平台。','屈膝下降至骨盆仍稳定的范围。','推起，保留轻微膝屈。'],'不要因追求深度让骨盆卷起。'),
make('rdl','哑铃罗马尼亚硬拉','hinge','dumbbell',2,['hamstrings','glutes'],['back','core'],3,8,12,'hinge',['膝微屈，哑铃贴近腿前。','髋向后移，背部保持自然。','感到腿后侧张力后，用髋部带动站起。'],'不以触地为目标。重量记两只哑铃总和。'),
make('hinge','徒手髋铰链','hinge','body',1,['hamstrings','glutes'],['core'],2,10,15,'hinge',['双脚踩稳，膝微屈，双手扶髋。','把臀部向后推，躯干随髋前倾。','保持自然背部，站回直立。'],'练习动作控制，不代表等效负重硬拉。'),
make('thrust','哑铃臀推','bridge','dumbbell',2,['glutes'],['hamstrings'],3,8,12,'bridge',['上背靠稳固矮凳，哑铃垫在髋部。','脚掌踩稳，抬髋至躯干与大腿接近一线。','收臀后慢落，肋骨不要上翻。'],'器械与长凳需固定，重量记髋部总负重。'),
make('bridge','地面臀桥','bridge','body',1,['glutes'],['hamstrings'],3,10,15,'bridge',['仰卧屈膝，双脚平放。','推地抬髋，保持骨盆稳定。','控制落下，不靠过度挺腰。'],'以臀部发力和无痛为前提。'),
make('lunge','反向箭步蹲','lunge','dumbbell',2,['quads','glutes'],['core'],2,8,10,'lunge',['双脚站稳，哑铃自然垂在两侧。','一脚向后迈，双膝缓慢屈曲。','以前脚推地回位，两侧都完成后记组。'],'必要时改扶持版本。重量记双手总和。',{side:true}),
make('split','扶持分腿蹲','lunge','body',1,['quads','glutes'],['core'],2,8,10,'lunge',['一手轻扶牢靠支撑，双脚前后分开。','垂直下降，前脚保持稳定。','向上站起，再换另一侧。'],'保持舒适步距，两侧完成后记组。',{side:true}),
make('legcurl','器械腿弯举','legcurl','machine',1,['hamstrings'],[],2,10,15,'legcurl',['调节转轴对齐膝附近，固定身体。','屈膝带动垫子，髋部不离开靠垫。','控制伸膝还原。'],'不要快速甩动。'),
make('slidecurl','滑动腿弯举','legcurl','body',3,['hamstrings'],['glutes','core'],2,8,12,'slidecurl',['仰卧，脚跟放在能滑动的毛巾上。','轻抬髋，慢慢伸腿至能控制的距离。','屈膝把脚跟拉回。'],'难度较高；先练臀桥，缩短滑动距离。'),
make('deadbug','Dead Bug 死虫','core','body',1,['core'],[],3,6,10,'deadbug',['仰卧抬腿，髋膝弯曲，双手向上。','缓慢伸展对侧手脚，躯干保持稳定。','呼气收回，交替完成两侧。'],'腰部明显拱起时缩短伸展距离。',{side:true}),
make('pallof','弹力带 Pallof 推','brace','band',2,['core'],[],3,8,12,'pallof',['侧对牢靠固定点，双手握带在胸前。','缓慢向前推手，抵抗躯干转动。','收回胸前，两侧都做。'],'抗旋转动作，不追求大阻力。',{side:true}),
make('plank','平板支撑','brace','body',2,['core'],['shoulders'],3,20,40,'plank',['前臂撑地，肘在肩下附近。','抬髋使头、躯干与腿接近一线。','自然呼吸，在塌腰或耸肩前结束。'],'时间以姿势可控为限。',{unit:'秒'}),
make('reverse','反向卷腹','core','body',2,['core'],[],2,10,15,'reverse',['仰卧，双腿屈曲，双手放身侧。','呼气轻轻卷起骨盆，幅度很小。','缓慢放回，不靠甩腿。'],'不要把抬腿幅度当成训练质量。'),
make('walk','快走','cardio','body',1,['calves','quads'],['glutes'],1,25,35,'walk',['选择平整安全路线，站姿自然。','稳定步幅行走，保持能说短句的强度。','末尾放慢速度，按体感结束。'],'不用于补偿饮食，也不必追求大汗。',{unit:'分钟'}),
make('easywalk','轻松步行','recovery','body',1,['calves'],['quads'],1,20,40,'walk',['选安全平坦路面。','以轻松交谈的速度散步。','疲劳时可以缩短或跳过。'],'恢复日为可选活动。',{unit:'分钟'}),
].map(e=>[e.id,e]));
export const plans={upper:{title:'上肢塑形',short:'上肢',desc:'把注意力放在肩背与手臂的稳定发力。',ids:['pulldown','row','press','raise','curl','triceps']},lower:{title:'下肢塑形',short:'下肢',desc:'臀腿力量与髋部控制，慢慢建立身体的支撑。',ids:['squat','rdl','thrust','lunge','legcurl']},core:{title:'核心＋有氧',short:'核心',desc:'先练核心控制，再用轻快步行结束今天。',ids:['deadbug','pallof','reverse','walk']},recovery:{title:'恢复日',short:'恢复',desc:'留出恢复空间。正常饮食、睡眠，散步可以自由选择。',ids:['easywalk']}};
export const cycle=['upper','lower','core','recovery','upper','lower','recovery'];
export function alternatives(id){const e=exercises[id];return Object.values(exercises).filter(x=>x.id!==id&&(x.group===e.group||(e.group==='row'&&x.id==='prone')||(e.group==='legcurl'&&x.id==='bridge')||(e.group==='brace'&&x.id==='deadbug')));}
